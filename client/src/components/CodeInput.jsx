import { Select, Input, Button } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

function CodeInput({ onSubmit }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const submitCode = () => {
    onSubmit({
      language,
      code,
    });
  };

  return (
    <div className="space-y-4">
      <Select
        value={language}
        onChange={setLanguage}
        className="w-full"
        options={[
          {
            value: 'javascript',
            label: 'JavaScript',
          },
          {
            value: 'typescript',
            label: 'TypeScript',
          },
          {
            value: 'java',
            label: 'Java',
          },
          {
            value: 'python',
            label: 'Python',
          },
        ]}
      />

      <TextArea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={14}
        placeholder="Write your code here..."
        className="w-full font-mono text-sm"
      />

      <Button
        type="primary"
        block
        onClick={submitCode}
        disabled={!code.trim()}
      >
        Analyze Code
      </Button>
    </div>
  );
}

export default CodeInput;