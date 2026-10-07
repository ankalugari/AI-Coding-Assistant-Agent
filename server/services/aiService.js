async function askAssistant({
  message,
  code,
  language,
  problem,
  hintLevel,
}) {
  /*
    Later this service will:

    1. Detect user intent
    2. Get short-term memory
    3. Get long-term memory
    4. Search RAG knowledge
    5. Select an Agent tool
    6. Call Groq LLM
    7. Save useful memory
    8. Return response
  */

  return {
    response:
      'AI Agent service is ready. Groq integration will be added next.',
    intent: 'ASK_FOLLOW_UP',
    hintLevel: hintLevel || 1,
  };
}

async function analyzeProblem(data) {
  return {
    response:
      'Problem analysis will be handled by the AI Agent.',
    intent: 'UNDERSTAND_PROBLEM',
  };
}

async function generateHint(data) {
  return {
    response:
      'Progressive hint generation will be handled by the AI Agent.',
    intent: 'GENERATE_HINT',
    hintLevel: data.hintLevel || 1,
  };
}

async function reviewCode(data) {
  return {
    response:
      'Code review will be handled by the AI Agent.',
    intent: 'REVIEW_CODE',
  };
}

async function debugCode(data) {
  return {
    response:
      'Debugging will be handled by the AI Agent.',
    intent: 'DEBUG_CODE',
  };
}

async function explainSolution(data) {
  return {
    response:
      'Solution explanation will be handled by the AI Agent.',
    intent: 'EXPLAIN_SOLUTION',
  };
}

module.exports = {
  askAssistant,
  analyzeProblem,
  generateHint,
  reviewCode,
  debugCode,
  explainSolution,
};