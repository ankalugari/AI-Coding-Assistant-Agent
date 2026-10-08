import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Button,
  Drawer,
  Input,
  Tag,
  Spin,
  Empty,
  message,
} from 'antd';

import {
  DashboardOutlined,
  CodeOutlined,
  RobotOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { getProblems } from '../services/problemService';

const { Sider, Header, Content } = Layout;

const { Title, Text } = Typography;

function Problems() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [problems, setProblems] = useState([]);

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);

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
    {
      key: 'progress',
      icon: <BarChartOutlined />,
      label: 'Progress',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
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

    if (key === 'progress') {
      navigate('/progress');
    }

    if (key === 'profile') {
      navigate('/profile');
    }

    setMobileMenu(false);
  };

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await getProblems();

        setProblems(data);
      } catch (error) {
        console.error('PROBLEMS ERROR:', error);

        message.error(
          error.response?.data?.message ||
          'Unable to load problems'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const filteredProblems = problems.filter((problem) =>
    problem.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const sidebar = (
    <div className="flex h-full flex-col bg-black text-white">

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
        selectedKeys={['problems']}
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
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block"
      >
        {sidebar}
      </Sider>

      <Layout>

        <Header className="!flex !h-16 !items-center !justify-between !bg-black !px-4 sm:!px-6">

          <div className="flex items-center gap-3">

            <Button
              type="text"
              icon={
                <MenuOutlined className="!text-white" />
              }
              className="lg:!hidden"
              onClick={() => setMobileMenu(true)}
            />

            <div>

              <div className="text-lg font-semibold text-white">
                Problems
              </div>

              <div className="hidden text-xs text-gray-400 sm:block">
                Practice coding problems
              </div>

            </div>

          </div>

          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer"
          />

        </Header>

        <Content className="bg-gray-100 p-4 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-7xl">

            <Card className="mb-6 border-0">

              <Title
                level={2}
                className="!mb-1"
              >
                Coding Problems
              </Title>

              <Text type="secondary">
                Practice problems and improve your coding skills with CodeMentor AI.
              </Text>

            </Card>

            <Card className="mb-6">

              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search coding problems"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                allowClear
              />

            </Card>

            {loading ? (

              <div className="flex min-h-[300px] items-center justify-center">

                <Spin size="large" />

              </div>

            ) : filteredProblems.length === 0 ? (

              <Card>

                <Empty description="No problems found" />

              </Card>

            ) : (

              <Row gutter={[16, 16]}>

                {filteredProblems.map((problem) => (

                  <Col
                    xs={24}
                    sm={12}
                    lg={8}
                    key={problem.id}
                  >

                    <Card
                      hoverable
                      className="h-full"
                      onClick={() =>
                        navigate(
                          `/problems/${problem.id}`
                        )
                      }
                    >

                      <CodeOutlined className="mb-4 text-3xl" />

                      <Title
                        level={4}
                        className="!mb-3"
                      >
                        {problem.title}
                      </Title>

                      <div className="mb-3">

                        <Tag>
                          {problem.difficulty}
                        </Tag>

                        <Tag>
                          {problem.topic}
                        </Tag>

                      </div>

                      <Text type="secondary">
                        {problem.description}
                      </Text>

                    </Card>

                  </Col>

                ))}

              </Row>

            )}

          </div>

        </Content>

      </Layout>

      <Drawer
        placement="left"
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
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

export default Problems;
