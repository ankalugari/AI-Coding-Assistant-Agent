require('dotenv').config();

const { askGroq } = require('./services/groqService');

async function test() {
  try {
    const response = await askGroq(
      'Explain what an array is in JavaScript in simple words.'
    );

    console.log('\nAI RESPONSE:\n');
    console.log(response);
  } catch (error) {
    console.error('\nGroq Error:');
    console.error(error.message);
  }
}

test();