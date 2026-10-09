const Groq = require('groq-sdk');
const {startActiveObservation,} = require('@langfuse/tracing');
const groq = new Groq({apiKey: process.env.GROQ_API_KEY,});

async function askGroq(message) {
  return startActiveObservation(
    'groq-call',
    async (observation) => {
      observation.update({
        input: message,
      });

      const response =
        await groq.chat.completions.create({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content:
                'You are CodeMentor AI, a helpful coding assistant. Explain programming concepts in simple language. For Java review questions, remember that an integer constant expression such as int a = 10 / 0; is a compile-time error in Java, not a runtime ArithmeticException for that exact statement.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        });

      const result = response.choices[0].message.content;
      observation.update({output: result,});
      return result;
    }
  );
}

module.exports = {askGroq,};