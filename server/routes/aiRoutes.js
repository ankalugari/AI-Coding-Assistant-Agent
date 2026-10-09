const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');
const {getConversation,getMessages,} = require('../services/memoryService');

const {runAgent,} = require('../services/agentService');

router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const {message,problemId,code,language,intent,} = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: 'Message is required',
      });
    }

    let conversationId;

    if (problemId) {
      conversationId = await getConversation(userId,problemId);
    } else {
      const [rows] = await db.execute(
        `SELECT id
         FROM conversations
         WHERE user_id = ?
         AND problem_id IS NULL
         ORDER BY id DESC
         LIMIT 1`,
        [userId]
      );

      if (rows.length > 0) {
        conversationId = rows[0].id;
      } else {
        const [result] = await db.execute(
          `INSERT INTO conversations
           (user_id, problem_id, title)
           VALUES (?, NULL, ?)`,
          [userId, 'General AI Assistant']
        );
        conversationId = result.insertId;
      }
    }

    const response = await runAgent({
      userId,
      conversationId,
      message: message.trim(),
      intent,
      problemId: problemId || null,
      code,
      language,
    });
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      message: error.message || 'Failed to process your message',
    });
  }
});

router.get(
  '/history/:problemId',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const problemId = req.params.problemId;
      const conversationId = await getConversation(userId,problemId);
      const messages = await getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      console.error('CHAT HISTORY ERROR:', error);
      res.status(500).json({
        message: 'Unable to load chat history',
      });
    }
  }
);

router.delete(
  '/history/:problemId',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const problemId = req.params.problemId;
      const [conversations] = await db.execute(
        `SELECT id
         FROM conversations
         WHERE user_id = ?
         AND problem_id = ?
         ORDER BY id DESC
         LIMIT 1`,
        [userId, problemId]
      );

      if (conversations.length === 0) {
        return res.status(404).json({
          message: 'Chat not found',
        });
      }

      const conversationId = conversations[0].id;

      await db.execute(
        `DELETE FROM messages
         WHERE conversation_id = ?`,
        [conversationId]
      );

      await db.execute(
        `DELETE FROM conversations
         WHERE id = ?
         AND user_id = ?`,
        [conversationId, userId]
      );

      res.json({
        message: 'Chat deleted successfully',
      });
    } catch (error) {
      console.error('DELETE CHAT ERROR:', error);
      res.status(500).json({
        message: 'Unable to delete chat',
      });
    }
  }
);

module.exports = router;
