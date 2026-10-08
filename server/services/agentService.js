const { askGroq } = require('./groqService');

const {
  saveMessage,
  getMessages,
} = require('./memoryService');

async function runAgent({
  userId,
  conversationId,
  message,
  intent,
  problemId,
}) {
  await saveMessage(
    conversationId,
    'user',
    message
  );

  const oldMessages = await getMessages(
    conversationId
  );

  let prompt = `
You are CodeMentor AI.

The user is learning programming.

Intent:
${intent || 'ASK_FOLLOW_UP'}

Problem ID:
${problemId || 'None'}

Previous conversation:
`;

  for (let i = 0; i < oldMessages.length; i++) {
    prompt += `
${oldMessages[i].role}: ${oldMessages[i].content}
`;
  }

  prompt += `
Current user question:
${message}

Give a simple beginner-friendly response.
Do not give the complete coding solution unless the user asks for it.
`;

  const response = await askGroq(prompt);

  await saveMessage(
    conversationId,
    'assistant',
    response
  );

  return response;
}

module.exports = {
  runAgent,
};
