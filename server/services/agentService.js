const { askGroq } = require('./groqService');

function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    text.includes('debug') ||
    text.includes('error') ||
    text.includes('bug')
  ) {
    return 'DEBUG_CODE';
  }

  if (
    text.includes('review') ||
    text.includes('improve my code')
  ) {
    return 'REVIEW_CODE';
  }

  if (
    text.includes('hint') ||
    text.includes('clue')
  ) {
    return 'GENERATE_HINT';
  }

  if (
    text.includes('explain solution')
  ) {
    return 'EXPLAIN_SOLUTION';
  }

  if (
    text.includes('what is') ||
    text.includes('explain')
  ) {
    return 'EXPLAIN_CONCEPT';
  }

  return 'ASK_FOLLOW_UP';
}

async function runAgent(message, code, language, hintLevel) {
  const intent = detectIntent(message);

  let prompt = '';

  if (intent === 'DEBUG_CODE') {
    prompt = `
You are CodeMentor AI.

Help the user debug their code.

Language:
${language || 'Not provided'}

Code:
${code || 'No code provided'}

Question:
${message}

Explain:
1. What is wrong
2. Why it is wrong
3. How to fix it
`;
  }

  else if (intent === 'REVIEW_CODE') {
    prompt = `
You are CodeMentor AI.

Review this code.

Language:
${language || 'Not provided'}

Code:
${code || 'No code provided'}

Question:
${message}

Explain:
1. What is good
2. What can be improved
3. Possible bugs
4. Suggestions
`;
  }

  else if (intent === 'GENERATE_HINT') {
    prompt = `
You are CodeMentor AI.

Give a coding hint.

Hint level:
${hintLevel || 1}

Problem:
${message}

Do not give the complete solution.
Give only a useful hint.
`;
  }

  else if (intent === 'EXPLAIN_SOLUTION') {
    prompt = `
You are CodeMentor AI.

Explain this solution in simple language.

Question:
${message}

Code:
${code || 'No code provided'}

Explain the logic step by step.
Also explain time and space complexity.
`;
  }

  else {
    prompt = `
You are CodeMentor AI.

Answer this programming question in simple beginner-friendly language.

Question:
${message}

Give examples when useful.
`;
  }

  const response = await askGroq(prompt);

  return {
    intent,
    response,
    hintLevel: hintLevel || 1
  };
}

module.exports = {
  runAgent,
  detectIntent
};