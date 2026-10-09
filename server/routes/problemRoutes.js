const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const [problems] = await db.execute(
      `SELECT id, title, description, difficulty, topic
       FROM coding_problems
       ORDER BY id DESC`
    );
    res.json(problems);
  } catch (error) {
    console.error('PROBLEMS ERROR:', error);
    res.status(500).json({message: 'Unable to load problems',});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [problems] = await db.execute(
      `SELECT *
       FROM coding_problems
       WHERE id = ?`,
      [req.params.id]
    );

    if (problems.length === 0) {
      return res.status(404).json({
        message: 'Problem not found',
      });
    }

    res.json(problems[0]);
  } catch (error) {
    console.error('PROBLEM ERROR:', error);
    res.status(500).json({
      message: 'Unable to load problem',
    });
  }
});

module.exports = router;
