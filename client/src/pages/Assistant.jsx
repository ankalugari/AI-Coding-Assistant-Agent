import {
  Layout,
  Menu,
  Card,
  Avatar,
  Typography,
  Button,
  Drawer,
  Input,
  Select,
  Spin,
  message,
} from 'antd';

import {
  DashboardOutlined,
  CodeOutlined,
  RobotOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SendOutlined,
} from '@ant-design/icons';

import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { getProblem } from '../services/problemService';

import {
  sendMessage as sendAIMessage,
} from '../services/aiService';

const { Sider, Header, Content } = Layout;

const { Title, Text } = Typography;

const { TextArea } = Input;

function Assistant() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [intent, setIntent] = useState(
    'ASK_FOLLOW_UP'
  );

  const [problem, setProblem] = useState(null);

  const problemId = searchParams.get('problem');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'problems',
      icon: <CodeOutlined />,
      label: 'Problems',
    },
    {
      key: 'assistant',
      icon: <RobotOutlined />,
      label: 'AI Assistant',
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'dashboard') {
      navigate('/dashboard');
    }

    if (key === 'problems') {
      navigate('/problems');
    }

    if (key === 'assistant') {
      navigate('/assistant');
    }

    setMobileMenu(false);
  };

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  useEffect(() => {
    const loadProblem = async () => {
      if (!problemId) {
        setProblem(null);
        return;
      }

      try {
        const data = await getProblem(problemId);

        setProblem(data);
      } catch (error) {
        console.error(
          'PROBLEM ERROR:',
          error
        );
      }
    };

    loadProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      setInput(
        `Help me understand this problem: ${problem.title}`
      );
    }
  }, [problem]);

  const sendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();

    setInput('');

    setMessages((previous) => [
      ...previous,
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const response = await sendAIMessage({
        message: userMessage,
        intent: intent,
        problemId: problemId || null,
      });

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            response.response ||
            response.message ||
            'No response received.',
        },
      ]);
    } catch (error) {
      console.error(
        'AI ERROR:',
        error
      );

      message.error(
        error.response?.data?.message ||
        'Unable to get AI response'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  const sidebar = (
    <div className="flex h-screen flex-col bg-black text-white">

      <div className="px-5 py-6">

        <Title
          level={3}
          className="!mb-0 !text-white"
        >
          CodeMentor AI
        </Title>

        <Text className="text-gray-400">
          Coding Assistant
        </Text>

      </div>

      <div className="mx-4 mb-5 rounded-lg bg-gray-900 p-4">

        <div className="flex items-center gap-3">

          <Avatar
            size={42}
            icon={<UserOutlined />}
          />

          <div className="min-w-0">

            <div className="truncate font-semibold text-white">
              {user?.name || 'User'}
            </div>

            <div className="truncate text-sm text-gray-400">
              {user?.email || ''}
            </div>

          </div>

        </div>

      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={['assistant']}
        items={menuItems}
        onClick={handleMenuClick}
        className="!border-none !bg-black"
      />

      <div className="mt-auto p-4">

        <Button
          block
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="!border-gray-700 !bg-gray-900 !text-white"
        >
          Logout
        </Button>

      </div>

    </div>
  );

  return (
    <Layout className="min-h-screen">

      <Sider
        width={250}
        className="!fixed left-0 top-0 z-50 hidden h-screen lg:block"
      >
        {sidebar}
      </Sider>

      <Layout className="lg:ml-[250px]">

        <Header className="!sticky !top-0 !z-40 !flex !h-16 !items-center !justify-between !bg-black !px-4 sm:!px-6">

          <div className="flex items-center gap-3">

            <Button
              type="text"
              icon={
                <MenuOutlined className="!text-white" />
              }
              className="lg:!hidden"
              onClick={() =>
                setMobileMenu(true)
              }
            />

            <div>

              <div className="text-lg font-semibold text-white">
                AI Assistant
              </div>

              <div className="hidden text-xs text-gray-400 sm:block">
                Learn, debug and improve your code
              </div>

            </div>

          </div>

          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer"
          />

        </Header>

        <Content className="bg-gray-100 p-4 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-5xl">

            <Card className="mb-4">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <Title
                    level={3}
                    className="!mb-1"
                  >
                    CodeMentor AI
                  </Title>

                  <Text type="secondary">
                    Ask questions, get hints, review code,
                    or debug errors.
                  </Text>

                </div>

                <Select
                  value={intent}
                  onChange={setIntent}
                  className="w-full sm:w-56"
                  options={[
                    {
                      value: 'ASK_FOLLOW_UP',
                      label: 'Ask Question',
                    },
                    {
                      value: 'UNDERSTAND_PROBLEM',
                      label: 'Understand Problem',
                    },
                    {
                      value: 'GENERATE_HINT',
                      label: 'Generate Hint',
                    },
                    {
                      value: 'REVIEW_CODE',
                      label: 'Review Code',
                    },
                    {
                      value: 'DEBUG_CODE',
                      label: 'Debug Code',
                    },
                    {
                      value: 'EXPLAIN_SOLUTION',
                      label: 'Explain Solution',
                    },
                    {
                      value: 'EXPLAIN_CONCEPT',
                      label: 'Explain Concept',
                    },
                    {
                      value: 'ANALYZE_ERROR',
                      label: 'Analyze Error',
                    },
                  ]}
                />

              </div>

            </Card>

            {problem && (

              <Card className="mb-4">

                <Text type="secondary">
                  Current Problem
                </Text>

                <Title
                  level={4}
                  className="!mb-0"
                >
                  {problem.title}
                </Title>

                <Text type="secondary">
                  {problem.topic} • {problem.difficulty}
                </Text>

              </Card>

            )}

            <Card>

              <div className="mb-4 min-h-[400px] max-h-[500px] overflow-y-auto">

                {messages.length === 0 ? (

                  <div className="flex min-h-[400px] items-center justify-center text-center">

                    <div>

                      <RobotOutlined className="mb-4 text-5xl" />

                      <Title level={3}>
                        How can I help you?
                      </Title>

                      <Text type="secondary">
                        Ask me about programming,
                        coding problems, errors, or your code.
                      </Text>

                    </div>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {messages.map(
                      (item, index) => (

                        <div
                          key={index}
                          className={
                            item.role === 'user'
                              ? 'flex justify-end'
                              : 'flex justify-start'
                          }
                        >

                          <div
                            className={
                              item.role === 'user'
                                ? 'max-w-[85%] rounded-lg bg-black px-4 py-3 text-white'
                                : 'max-w-[85%] rounded-lg bg-gray-100 px-4 py-3 text-gray-900'
                            }
                          >

                            <div className="mb-1 text-xs font-semibold">

                              {item.role === 'user'
                                ? 'You'
                                : 'CodeMentor AI'}

                            </div>

                            <div className="whitespace-pre-wrap">
                              {item.content}
                            </div>

                          </div>

                        </div>

                      )
                    )}

                    {loading && (

                      <div className="flex justify-start">

                        <div className="rounded-lg bg-gray-100 px-4 py-3">

                          <Spin size="small" />

                        </div>

                      </div>

                    )}

                  </div>

                )}

              </div>

              <div className="flex flex-col gap-3">

                <TextArea
                  rows={4}
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Ask CodeMentor AI..."
                  disabled={loading}
                />

                <div className="flex justify-end">

                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    loading={loading}
                    onClick={sendMessage}
                  >
                    Send
                  </Button>

                </div>

              </div>

            </Card>

          </div>

        </Content>

      </Layout>

      <Drawer
        placement="left"
        open={mobileMenu}
        onClose={() =>
          setMobileMenu(false)
        }
        width={270}
        styles={{
          body: {
            padding: 0,
            background: 'black',
          },
        }}
      >
        {sidebar}
      </Drawer>

    </Layout>
  );
}

export default Assistant;
