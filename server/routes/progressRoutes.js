const express = require('express');

const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  async (req, res) => {
    try {
      const [progress] = await db.execute(
        `SELECT *
         FROM learning_progress
         WHERE user_id = ?
         ORDER BY id DESC`,
        [req.user.id]
      );

      res.json(progress);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Unable to get progress',
      });
    }
  }
);

router.get(
  '/stats',
  authMiddleware,
  async (req, res) => {
    try {
      const [solved] = await db.execute(
        `SELECT COUNT(*) AS total
         FROM code_submissions
         WHERE user_id = ?
         AND status = 'solved'`,
        [req.user.id]
      );

      const [attempted] = await db.execute(
        `SELECT COUNT(*) AS total
         FROM code_submissions
         WHERE user_id = ?`,
        [req.user.id]
      );

      res.json({
        solved: solved[0].total,
        attempted: attempted[0].total,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Unable to get statistics',
      });
    }
  }
);

router.get(
  '/topics',
  authMiddleware,
  async (req, res) => {
    try {
      const [topics] = await db.execute(
        `SELECT *
         FROM learning_progress
         WHERE user_id = ?`,
        [req.user.id]
      );

      res.json(topics);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Unable to get topic progress',
      });
    }
  }
);

module.exports = router;