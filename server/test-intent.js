require('dotenv').config();

const { detectIntent } = require('./services/intentService');

async function test() {
  const questions = [
    'Give me a hint for this problem',
    'Review my Java code',
    'Why am I getting a NullPointerException?',
    'Explain what a Java loop is',
  ];

  for (const question of questions) {
    const intent = await detectIntent(question);
    console.log(question, '=>', intent);
  }
}

test().catch(console.error);
