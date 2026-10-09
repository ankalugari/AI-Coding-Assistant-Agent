const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {runCode,} = require('../services/codeExecutionService');
const router = express.Router();

router.post(
  '/run',
  authMiddleware,
  async (req, res) => {
    try {
      const {code,language,stdin,} = req.body;
      console.log('CODE REQUEST:', {language,hasCode: !!code,});

      if (!code || !code.trim()) {
        return res.status(400).json({message: 'Code is required',});
      }

      if (!language) {
        return res.status(400).json({message: 'Language is required',});
      }

      const result = await runCode({code,language,stdin,});
      console.log('CODE RESULT:',result);
      res.json(result);
    } catch (error) {
      console.error('CODE EXECUTION ERROR:',error.response?.data || error.message);
      res.status(500).json({
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Code execution failed',
      });
    }
  }
);

module.exports = router;
