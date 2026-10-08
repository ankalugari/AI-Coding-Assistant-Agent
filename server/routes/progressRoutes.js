const express = require('express');

const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [progress] = await db.execute(
      `SELECT *
       FROM learning_progress
       WHERE user_id = ?
       ORDER BY updated_at DESC`,
      [userId]
    );

    res.json(progress);
  } catch (error) {
    console.error('PROGRESS ERROR:', error);

    res.status(500).json({
      message: 'Unable to get progress',
    });
  }
});

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [submissions] = await db.execute(
      `SELECT
         COUNT(*) AS attempted,
         SUM(CASE WHEN status = 'solved' THEN 1 ELSE 0 END) AS solved
       FROM code_submissions
       WHERE user_id = ?`,
      [userId]
    );

    const [reviews] = await db.execute(
      `SELECT COUNT(*) AS reviews
       FROM code_reviews
       WHERE user_id = ?`,
      [userId]
    );

    res.json({
      attempted: submissions[0].attempted || 0,
      solved: submissions[0].solved || 0,
      reviews: reviews[0].reviews || 0,
    });
  } catch (error) {
    console.error('STATS ERROR:', error);

    res.status(500).json({
      message: 'Unable to get learning stats',
    });
  }
});

router.get('/topics', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [topics] = await db.execute(
      `SELECT
         id,
         topic,
         problems_attempted,
         problems_solved,
         accuracy,
         level,
         updated_at
       FROM learning_progress
       WHERE user_id = ?
       ORDER BY accuracy DESC`,
      [userId]
    );

    res.json(topics);
  } catch (error) {
    console.error('TOPICS ERROR:', error);

    res.status(500).json({
      message: 'Unable to get topic progress',
    });
  }
});

module.exports = router;