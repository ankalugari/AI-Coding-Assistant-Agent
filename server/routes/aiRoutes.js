const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {
  askAssistant,
  analyzeProblem,
  generateHint,
  reviewCode,
  debugCode,
  explainSolution,
} = require('../services/aiService');

const router = express.Router();

router.post(
  '/assistant',
  authMiddleware,
  async (req, res) => {
    try {
      const result = await askAssistant({
        ...req.body,
        userId: req.user.id,
      });

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'AI Assistant failed',
      });
    }
  }
);

router.post(
  '/analyze-problem',
  authMiddleware,
  async (req, res) => {
    const result = await analyzeProblem({
      ...req.body,
      userId: req.user.id,
    });

    res.json(result);
  }
);

router.post(
  '/hint',
  authMiddleware,
  async (req, res) => {
    const result = await generateHint({
      ...req.body,
      userId: req.user.id,
    });

    res.json(result);
  }
);

router.post(
  '/review',
  authMiddleware,
  async (req, res) => {
    const result = await reviewCode({
      ...req.body,
      userId: req.user.id,
    });

    res.json(result);
  }
);

router.post(
  '/debug',
  authMiddleware,
  async (req, res) => {
    const result = await debugCode({
      ...req.body,
      userId: req.user.id,
    });

    res.json(result);
  }
);

router.post(
  '/explain',
  authMiddleware,
  async (req, res) => {
    const result = await explainSolution({
      ...req.body,
      userId: req.user.id,
    });

    res.json(result);
  }
);

module.exports = router;