const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {
  getConversation,
  getMessages,
} = require('../services/memoryService');

const {
  runAgent,
} = require('../services/agentService');

const router = express.Router();

router.post(
  '/chat',
  authMiddleware,
  async (req, res) => {
    try {
      const {
        message,
        intent,
        problemId,
      } = req.body;

      if (!message) {
        return res.status(400).json({
          message: 'Message is required',
        });
      }

      if (!problemId) {
        return res.status(400).json({
          message: 'Problem ID is required',
        });
      }

      const userId = req.user.id;

      const conversationId =
        await getConversation(
          userId,
          problemId
        );

      const response = await runAgent({
        userId,
        conversationId,
        message,
        intent,
        problemId,
      });

      res.json({
        response,
        conversationId,
      });
    } catch (error) {
      console.error(
        'AI CHAT ERROR:',
        error
      );

      res.status(500).json({
        message: 'AI response failed',
      });
    }
  }
);

router.get(
  '/history/:problemId',
  authMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const problemId =
        req.params.problemId;

      const conversationId =
        await getConversation(
          userId,
          problemId
        );

      const messages =
        await getMessages(
          conversationId
        );

      res.json(messages);
    } catch (error) {
      console.error(
        'CHAT HISTORY ERROR:',
        error
      );

      res.status(500).json({
        message:
          'Unable to load chat history',
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

      const conversationId =
        conversations[0].id;

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
      console.error(
        'DELETE CHAT ERROR:',
        error
      );

      res.status(500).json({
        message: 'Unable to delete chat',
      });
    }
  }
);


module.exports = router;
