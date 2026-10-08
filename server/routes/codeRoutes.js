const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {
  runCode,
} = require('../services/codeExecutionService');

const router = express.Router();

router.post(
  '/run',
  authMiddleware,
  async (req, res) => {
    try {
      const {
        code,
        language,
        stdin,
      } = req.body;

      if (!code || !code.trim()) {
        return res.status(400).json({
          message: 'Code is required',
        });
      }

      if (!language) {
        return res.status(400).json({
          message: 'Language is required',
        });
      }

      const result = await runCode({
        code,
        language,
        stdin,
      });

      res.json(result);
    } catch (error) {
      console.error(
        'CODE EXECUTION ERROR:',
        error.response?.data || error.message
      );

      res.status(500).json({
        message:
          error.response?.data?.message ||
          error.message ||
          'Code execution failed',
      });
    }
  }
);

module.exports = router;
