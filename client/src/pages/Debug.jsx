import { useState } from 'react';
import {Typography,Card,Input,Button,Alert,Tag,} from 'antd';
import { BugOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

function Debug() {
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(false);

  const handleDebug = () => {
    if (!error.trim() && !code.trim()) return;
    setResult(true);
  };

  return (
    <div className="space-y-5">
      <div>
        <Title level={2} className="!mb-1">
          Debug Assistant
        </Title>

        <Text type="secondary">
          Find errors and understand why your code is failing.
        </Text>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <Text strong>Error Message</Text>

            <Input
              size="large"
              value={error}
              onChange={(e) => setError(e.target.value)}
              placeholder="Example: TypeError: Cannot read properties of undefined"
              className="mt-2"
            />
          </div>

          <div>
            <Text strong>Your Code</Text>

            <TextArea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={14}
              placeholder="Paste your code here..."
              className="mt-2 font-mono"
            />
          </div>

          <Button
            type="primary"
            size="large"
            icon={<BugOutlined />}
            block
            onClick={handleDebug}
            disabled={!error.trim() && !code.trim()}
          >
            Analyze Error
          </Button>
        </div>
      </Card>

      {result && (
        <Card title="AI Debugging Result">
          <div className="space-y-4">
            <Tag color="red">
              Error Detected
            </Tag>

            <Alert
              type="error"
              showIcon
              message="Possible Cause"
              description="The variable may be undefined before it is accessed."
            />

            <Alert
              type="info"
              showIcon
              message="Suggested Fix"
              description="Check whether the variable exists before accessing its properties."
            />

            <Alert
              type="success"
              showIcon
              message="Learning Tip"
              description="Understanding the error message helps you identify the exact location of the problem."
            />
          </div>
        </Card>
      )}
    </div>
  );
}

export default Debug;