import { useState } from 'react';
import {
  Typography,
  Card,
  Button,
  Tag,
  Space,
  message,
} from 'antd';

import {
  BulbOutlined,
  CodeOutlined,
  BugOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import CodeInput from '../components/CodeInput';
import ChatMessage from '../components/ChatMessage';
import Loading from '../components/Loading';

const { Title, Text } = Typography;

function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I am CodeMentor AI. Give me a coding problem or code, and I can help you understand, debug, review, or solve it.',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = ({ language, code }) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: `Analyze my ${language} code:\n${code}`,
      },
    ]);

    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Your code has been received. The AI Agent will analyze the problem, code, errors, and suggest improvements.',
        },
      ]);

      setLoading(false);
    }, 1000);
  };

  const handleAction = (action) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: action,
      },
    ]);

    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I will ${action.toLowerCase()} using the AI Agent.`,
        },
      ]);

      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-5">
      <div>
        <Title level={2} className="!mb-1">
          AI Coding Assistant
        </Title>

        <Text type="secondary">
          Understand problems, get hints, review code and debug errors.
        </Text>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2">
          <Tag color="blue">
            <BulbOutlined /> Progressive Hints
          </Tag>

          <Tag color="green">
            <CodeOutlined /> Code Review
          </Tag>

          <Tag color="orange">
            <BugOutlined /> Debugging
          </Tag>

          <Tag color="purple">
            <CheckCircleOutlined /> Solution Explanation
          </Tag>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card
          title="Code Editor"
          className="h-full"
        >
          <CodeInput onSubmit={handleCodeSubmit} />
        </Card>

        <Card
          title="AI Agent"
          className="h-full"
        >
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              onClick={() =>
                handleAction('Give me a hint')
              }
            >
              Get Hint
            </Button>

            <Button
              onClick={() =>
                handleAction('Review my code')
              }
            >
              Review Code
            </Button>

            <Button
              onClick={() =>
                handleAction('Debug my code')
              }
            >
              Debug
            </Button>

            <Button
              onClick={() =>
                handleAction('Explain the solution')
              }
            >
              Explain
            </Button>
          </div>

          <div className="max-h-[500px] overflow-y-auto rounded-lg bg-gray-50 p-3 sm:p-4">
            {messages.map((item, index) => (
              <ChatMessage
                key={index}
                role={item.role}
                content={item.content}
              />
            ))}

            {loading && <Loading />}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Assistant;