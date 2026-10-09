const { askGroq } = require('../services/groqService');

async function evaluateResponse(test, response) {
  const prompt = `You are evaluating an AI coding assistant response.
                  Test name: ${test.name}
                  User question:${test.message}
                  Expected behavior:${test.expected}
                  Required checks:${test.checks.map((check, index) => `${index + 1}. ${check}`).join('\n')}
                  AI response:${response}
                  Evaluate each check independently.
                  Important Java rule:
                  For Java code "int a = 10 / 0;", division by the integer constant zero is a compile-time error. Do not accept a claim that this exact statement throws ArithmeticException at runtime.
                  Return only valid JSON in this format:
                  {
                  "results": [{
                  "check": "exact check text",
                  "passed": true}]}
                  Include one result for every required check.
                  Use true only when the response clearly satisfies the check.
                  `;

  const result = await askGroq(prompt);

  const cleaned = result
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed.results)) {
    throw new Error('Evaluator returned an invalid result format.');
  }

  return parsed.results;
}

module.exports = { evaluateResponse };
