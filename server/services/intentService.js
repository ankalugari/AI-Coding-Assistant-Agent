const Groq = require('groq-sdk');
const groq = new Groq({apiKey: process.env.GROQ_API_KEY,});

async function detectIntent(message) {
  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content: `Classify the user's coding request into exactly one intent:
                  UNDERSTAND_PROBLEM
                  GENERATE_HINT
                  REVIEW_CODE
                  DEBUG_CODE
                  EXPLAIN_SOLUTION
                  EXPLAIN_CONCEPT
                  ANALYZE_ERROR
                  ASK_FOLLOW_UP
                  Return only the intent name.
        `,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0,
  });

  const intent = response.choices[0].message.content.trim();

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

  if (!validIntents.includes(intent)) {
    return 'ASK_FOLLOW_UP';
  }

  return intent;
}

module.exports = {detectIntent,};
