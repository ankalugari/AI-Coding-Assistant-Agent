const axios = require('axios');

const JUDGE0_URL = 'https://ce.judge0.com';

const languageIds = {
  c: 50,
  cpp: 54,
  java: 62,
  javascript: 63,
  typescript: 74,
  python: 71,
};

async function runCode({
  code,
  language,
  stdin = '',
}) {
  const languageId = languageIds[language];

  if (!languageId) {
    throw new Error(
      `Unsupported language: ${language}`
    );
  }

  const response = await axios.post(
    `${JUDGE0_URL}/submissions`,
    {
      source_code: code,
      language_id: languageId,
      stdin: stdin,
    },
    {
      params: {
        base64_encoded: false,
        wait: false,
      },
    }
  );

  const token = response.data.token;

  if (!token) {
    throw new Error(
      'Judge0 did not return a token'
    );
  }

  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    const result = await axios.get(
      `${JUDGE0_URL}/submissions/${token}`,
      {
        params: {
          base64_encoded: false,
        },
      }
    );

    if (result.data.status?.id > 2) {
      return {
        stdout: result.data.stdout || '',
        stderr: result.data.stderr || '',
        compileOutput:
          result.data.compile_output || '',
        message:
          result.data.message || '',
        status:
          result.data.status?.description ||
          'Unknown',
        time: result.data.time || null,
        memory: result.data.memory || null,
      };
    }
  }

  throw new Error(
    'Code execution timed out'
  );
}

module.exports = {
  runCode,
};
