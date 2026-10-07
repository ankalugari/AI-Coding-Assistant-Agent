const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function askGroq(message) {
  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content:
          'You are CodeMentor AI, a helpful coding assistant. Explain programming concepts in simple language.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = {
  askGroq,
};