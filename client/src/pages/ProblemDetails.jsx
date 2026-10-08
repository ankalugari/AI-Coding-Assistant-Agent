import { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import {
  Layout,
  Menu,
  Button,
  Avatar,
  Typography,
  Card,
  Tag,
  Input,
  Select,
  message,
  Drawer,
} from 'antd';

import {
  HomeOutlined,
  CodeOutlined,
  RobotOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SendOutlined,
} from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';

import { getProblem } from '../services/problemService';

import { sendMessage,getChatHistory } from '../services/aiService';

import { runCode as executeCode } from '../services/codeService';

const { Sider, Header, Content } = Layout;

const { Title, Text } = Typography;

const { TextArea } = Input;

function ProblemDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [problem, setProblem] = useState(null);

  const [input, setInput] = useState('');

  const [code, setCode] = useState('');

  const [language, setLanguage] = useState('java');

  const [output, setOutput] = useState('');

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadProblem();
    loadHistory();
  }, [id]);

  const loadProblem = async () => {
    try {
      const data = await getProblem(id);

      setProblem(data);
    } catch (error) {
      console.error(error);

      message.error('Unable to load problem');
    }
  };

  const loadHistory=async()=>{
    try{
      const data=await getChatHistory(id);
      setMessages(data);
    }
    catch(error){
      console.error('HISTORY ERROR:',error);
    }
  };

  const send = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    setInput('');

    setLoading(true);

    try {
      const response = await sendMessage({
        message: userMessage,
        intent: 'ASK_FOLLOW_UP',
        problemId: id,
        language: language,
        code: code,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            response.response ||
            'No response received.',
        },
      ]);
    } catch (error) {
      console.error(error);

      message.error('AI response failed');
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    if (!code.trim()) {
      message.warning('Please write some code first');
      return;
    }

    setOutput('Running code...');

    try {
      const result = await executeCode({
        code,
        language,
      });

      if (result.compileOutput) {
        setOutput(
          `Compilation Error:\n\n${result.compileOutput}`
        );

        return;
      }

      if (result.stderr) {
        setOutput(
          `Runtime Error:\n\n${result.stderr}`
        );

        return;
      }

      setOutput(
        result.stdout ||
        result.status ||
        'Code executed successfully.'
      );
    } catch (error) {
      console.error(
        'RUN CODE ERROR:',
        error
      );

      setOutput(
        error.response?.data?.message ||
        'Unable to execute code.'
      );
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
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

    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  const sidebar = (
    <div className="flex h-screen flex-col bg-black text-white">

      <div className="p-5">

        <Title
          level={4}
          className="!mb-0 !text-white"
        >
          CodeMentor AI
        </Title>

      </div>

      <div className="px-4 pb-4">

        <div className="rounded-lg bg-gray-900 p-3">

          <div className="flex items-center gap-3">

            <Avatar
              icon={<UserOutlined />}
            />

            <div>

              <div className="text-sm font-semibold text-white">
                {user?.name}
              </div>

              <div className="text-xs text-gray-400">
                {user?.email}
              </div>

            </div>

          </div>

        </div>

      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={['problems']}
        items={menuItems}
        onClick={handleMenuClick}
        className="!border-none !bg-black"
      />

      <div className="mt-auto p-4">

        <Button
          danger
          block
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

    </div>
  );

  if (!problem) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100">

      <Sider
        width={250}
        className="!fixed left-0 top-0 z-50 hidden h-screen lg:block"
      >
        {sidebar}
      </Sider>

      <Layout className="lg:ml-[250px]">

        <Header className="!sticky !top-0 !z-40 !flex !items-center !bg-black !px-4">

          <Button
            type="text"
            icon={
              <MenuOutlined className="!text-white" />
            }
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          />

          <div className="ml-2 text-lg font-semibold text-white">
            Problem Details
          </div>

        </Header>

        <Content className="p-4 md:p-6">

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


            <div className="flex flex-col gap-6">


              <Card>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

                  <Title
                    level={2}
                    className="!mb-0"
                  >
                    {problem.title}
                  </Title>

                  <Tag color="blue">
                    {problem.difficulty}
                  </Tag>

                </div>

                <div className="mb-5">

                  <Tag color="purple">
                    {problem.topic}
                  </Tag>

                </div>

                <Title level={4}>
                  Problem
                </Title>

                <Text className="whitespace-pre-wrap text-base">
                  {problem.description}
                </Text>

              </Card>


              <Card
                title="Code Console"
                extra={
                  <Select
                    value={language}
                    onChange={(value) => {
                      setLanguage(value);
                      setOutput('');
                    }}
                    style={{ width: 140 }}
                    options={[
                      {
                        value: 'java',
                        label: 'Java',
                      },
                      {
                        value: 'python',
                        label: 'Python',
                      },
                      {
                        value: 'javascript',
                        label: 'JavaScript',
                      },
                      {
                        value: 'typescript',
                        label: 'TypeScript',
                      },
                      {
                        value: 'cpp',
                        label: 'C++',
                      },
                      {
                        value: 'c',
                        label: 'C',
                      },
                    ]}
                  />
                }
              >

                <div className="overflow-hidden rounded-lg bg-black">

                  <div className="border-b border-gray-700 px-4 py-2">

                    <span className="text-sm text-gray-400">
                      {language}
                    </span>

                  </div>

                  <TextArea
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value)
                    }
                    placeholder={`Write your ${language} code here...`}
                    className="!min-h-[300px] !resize-none !border-0 !bg-black !text-green-400 !shadow-none"
                    styles={{
                      textarea: {
                        background: '#000',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                      },
                    }}
                  />

                </div>

                <div className="mt-3 flex justify-end">

                  <Button
                    type="primary"
                    onClick={runCode}
                  >
                    Run Code
                  </Button>

                </div>

                {output && (
                  <div className="mt-4">

                    <div className="mb-2 font-semibold">
                      Output
                    </div>

                    <div className="whitespace-pre-wrap rounded-lg bg-black p-4 font-mono text-sm text-green-400">
                      {output}
                    </div>

                  </div>
                )}

              </Card>

            </div>

            <Card
              title={
                <div className="flex items-center gap-2">

                  <RobotOutlined />

                  <span>
                    AI Assistant
                  </span>

                </div>
              }
              className="flex h-[calc(100vh-120px)] flex-col"
              styles={{
                body: {
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                },
              }}
            >

              <div className="mb-4 rounded-lg bg-gray-100 p-3">

                <Text type="secondary">
                  Ask for a hint, explanation, debugging help,
                  or guidance for this problem.
                </Text>

              </div>

              <div className="flex-1 overflow-y-auto rounded-lg bg-gray-50 p-4">

                {messages.length === 0 && (
                  <div className="flex h-full items-center justify-center text-center text-gray-400">
                    Ask CodeMentor AI about this problem
                  </div>
                )}

                {messages.map((item, index) => (

                  <div
                    key={index}
                    className={`mb-3 flex ${
                      item.role === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >

                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-lg p-3 ${
                        item.role === 'user'
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}
                    >
                      {item.content}
                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-4 flex gap-2">

                <TextArea
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onPressEnter={(e) => {

                    if (!e.shiftKey) {

                      e.preventDefault();

                      send();

                    }

                  }}
                  placeholder="Ask about this problem or your code..."
                  autoSize={{
                    minRows: 2,
                    maxRows: 4,
                  }}
                />

                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  loading={loading}
                  onClick={send}
                />

              </div>

            </Card>

          </div>

        </Content>

      </Layout>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
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

export default ProblemDetails;

