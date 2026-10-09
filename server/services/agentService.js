const {startActiveObservation,} = require('@langfuse/tracing');
const { traceable } = require('langsmith/traceable');
const { askGroq } = require('./groqService');
const { detectIntent } = require('./intentService');
const { getHintInstruction } = require('./hintService');

const {saveMessage,getMessages,} = require('./memoryService');

async function runAgentInternal({userId,conversationId,message,intent,problemId,code,language,}) {
  return startActiveObservation(
    'codementor-agent',
    async (agent) => {
      const validIntents = [
        'UNDERSTAND_PROBLEM',
        'GENERATE_HINT',
        'REVIEW_CODE',
        'DEBUG_CODE',
        'EXPLAIN_SOLUTION',
        'EXPLAIN_CONCEPT',
        'ANALYZE_ERROR',
        'ASK_FOLLOW_UP',
      ];

      const detectedIntent =
        intent &&
        intent !== 'ASK_FOLLOW_UP' &&
        validIntents.includes(intent)
          ? intent
          : await detectIntent(message);

      const instructions = {
        UNDERSTAND_PROBLEM:
          'Explain the problem in simple language and identify its requirements.',

        GENERATE_HINT:
          'Give a hint at the requested level. Do not reveal the complete solution.',

        REVIEW_CODE:
          'Review the submitted code, identify mistakes, and suggest improvements. For Java, if the code is an integer division by zero constant expression such as int a = 10 / 0;, clearly explain that this is a compile-time error in Java, not a runtime ArithmeticException for that exact statement.',

        DEBUG_CODE:
          'Find the likely cause of the bug and explain how to fix it.',

        EXPLAIN_SOLUTION:
          'Explain the solution step by step and provide complete code when requested.',

        EXPLAIN_CONCEPT:
          'Explain the concept in simple language with an example.',

        ANALYZE_ERROR:
          'Explain the error, its likely cause, and possible fixes.',

        ASK_FOLLOW_UP:
          'Answer the follow-up using the previous conversation.',
      };

      let instruction = instructions[detectedIntent] ||instructions.ASK_FOLLOW_UP;

      agent.update({
        input: {
          message,
          intent: detectedIntent,
          problemId,
          language,
          code,
        },
      });

      await saveMessage(conversationId,'user',message);
      const oldMessages = await getMessages(conversationId);
      let hintLevel = 0;

      if (detectedIntent === 'GENERATE_HINT') {
        const hint = getHintInstruction(message,oldMessages);
        hintLevel = hint.hintLevel;
        instruction = hint.instruction;
      }

      let prompt = `You are CodeMentor AI, a beginner-friendly coding assistant.Detected intent: ${detectedIntent}
                    Instructions:${instruction}
                    Problem ID: ${problemId || 'None'}
                    Programming language: ${language || 'Not provided'}
                    User's code:${code || 'No code provided'}
                    Previous conversation:`;

      for (let i = 0;i < oldMessages.length - 1;i++) {
        prompt += `${oldMessages[i].role}: ${oldMessages[i].content}`;
      }

      prompt += `Current user question:${message}
                Give a clear, beginner-friendly response.
                For hints, reveal only the requested hint level.
                Do not provide the complete solution unless the user explicitly requests it.
                Java-specific rule: if the code is "int a = 10 / 0;" or any equivalent integer constant expression dividing by zero, explain that Java treats it as a compile-time error because the divisor is a constant zero. Do not say that this exact statement throws ArithmeticException at runtime.`;

      const response = await askGroq(prompt);
      const savedResponse = hintLevel > 0 ? `[HINT_LEVEL:${hintLevel}] ${response}` : response;
      await saveMessage(conversationId,'assistant',savedResponse);
      agent.update({output: response,});
      return response;
    }
  );
}

const runAgent = traceable(runAgentInternal,
  {
    name: 'codementor-agent',
    run_type: 'chain',
    project_name:
      process.env.LANGSMITH_PROJECT || 'codementor-ai',
  }
);

module.exports = {runAgent,};
