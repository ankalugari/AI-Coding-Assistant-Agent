require('dotenv').config({
  path: require('path').join(__dirname, '../.env'),
});

const mysql = require('mysql2/promise');
const { runAgent } = require('../services/agentService');
const testCases = require('./testCases');
const { evaluateResponse } = require('./evaluator');

async function runEvaluation() {
  let connection;
  let conversationId;

  let passedTests = 0;
  let totalChecks = 0;
  let passedChecks = 0;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [users] = await connection.execute('SELECT id FROM users LIMIT 1');

    if (users.length === 0) {
      throw new Error(
        'Create a user account before running evaluation.'
      );
    }

    const userId = users[0].id;

    const [conversationResult] = await connection.execute(
      `INSERT INTO conversations
       (user_id, problem_id, title)
       VALUES (?, NULL, ?)`,
      [userId, 'Evaluation Test Conversation']
    );

    conversationId = conversationResult.insertId;

    console.log('\nCodeMentor AI Evaluation\n');

    for (const test of testCases) {
      console.log(`\nTest: ${test.name}`);

      try {
        const response = await runAgent({
          userId,
          conversationId,
          message: test.message,
          intent: test.intent,
          problemId: null,
          code:
            test.name === 'Review code'
              ? 'int a = 10 / 0;'
              : '',
          language: 'java',
        });

        console.log('\nAI Response:');
        console.log(response);

        const results = await evaluateResponse(test,response);

        let testPassed = true;

        for (const result of results) {
          totalChecks++;

          if (result.passed) {
            passedChecks++;
            console.log(`PASS: ${result.check}`);
          } else {
            testPassed = false;
            console.log(`FAIL: ${result.check}`);
          }
        }

        if (testPassed) {
          passedTests++;
          console.log(`Result: PASS`);
        } else {
          console.log(`Result: FAIL`);
        }
      } catch (error) {
        console.error(
          `Test failed: ${error.message}`
        );
      }
    }

    const failedTests = testCases.length - passedTests;

    const score =
      totalChecks === 0
        ? 0
        : (passedChecks / totalChecks) * 100;

    console.log(`Total tests: ${testCases.length}`);
    console.log(`Passed tests: ${passedTests}`);
    console.log(`Failed tests: ${failedTests}`);
    console.log(`Total checks: ${totalChecks}`);
    console.log(`Passed checks: ${passedChecks}`);
    console.log(
      `Failed checks: ${totalChecks - passedChecks}`
    );
    console.log(`Evaluation score: ${score.toFixed(2)}%`);
  } catch (error) {
    console.error('Evaluation error:', error.message);
  } finally {
    if (connection && conversationId) {
      try {
        await connection.execute(
          'DELETE FROM messages WHERE conversation_id = ?',
          [conversationId]
        );

        await connection.execute(
          'DELETE FROM conversations WHERE id = ?',
          [conversationId]
        );

        console.log(
          'Temporary evaluation conversation cleaned up.'
        );
      } catch (error) {
        console.error(
          'Cleanup failed:',
          error.message
        );
      }
    }

    if (connection) {
      await connection.end();
    }
  }
}

runEvaluation();
