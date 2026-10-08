require('dotenv').config();

const { runAgent } = require('./services/agentService');

async function test() {
  try {
    const result = await runAgent(
      'What is an array in JavaScript?',
      '',
      'javascript',
      1
    );

    console.log('\nINTENT:');
    console.log(result.intent);

    console.log('\nAI RESPONSE:');
    console.log(result.response);
  } catch (error) {
    console.error('\nAgent Error:');
    console.error(error.message);
  }
}

test();