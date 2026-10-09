const db = require('../db');

async function getConversation(userId, problemId) {
  const [rows] = await db.execute(
    `SELECT id
     FROM conversations
     WHERE user_id = ?
     AND problem_id = ?
     ORDER BY id DESC
     LIMIT 1`,
    [userId, problemId]
  );

  if (rows.length > 0) {
    return rows[0].id;
  }

  const [result] = await db.execute(
    `INSERT INTO conversations
     (user_id, problem_id, title)
     VALUES (?, ?, ?)`,
    [
      userId,
      problemId,
      `Problem ${problemId}`,
    ]
  );

  return result.insertId;
}

async function getExistingConversation(
  userId,
  problemId
) {
  const [rows] = await db.execute(
    `SELECT id
     FROM conversations
     WHERE user_id = ?
     AND problem_id = ?
     ORDER BY id DESC
     LIMIT 1`,
    [userId, problemId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0].id;
}

async function saveMessage(
  conversationId,
  role,
  content
) {
  await db.execute(
    `INSERT INTO messages
     (conversation_id, role, content)
     VALUES (?, ?, ?)`,
    [
      conversationId,
      role,
      content,
    ]
  );
}

async function getMessages(conversationId) {
  const [messages] = await db.execute(
    `SELECT role, content
     FROM messages
     WHERE conversation_id = ?
     ORDER BY id ASC`,
    [conversationId]
  );

  return messages;
}

module.exports = {getConversation,getExistingConversation,saveMessage,getMessages,};
