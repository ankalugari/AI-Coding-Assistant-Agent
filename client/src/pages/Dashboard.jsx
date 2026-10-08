import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Statistic,
  Avatar,
  Typography,
  Button,
  Drawer,
} from 'antd';

import {
  DashboardOutlined,
  CodeOutlined,
  RobotOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

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

  const sidebar = (
    <div className="flex h-full flex-col bg-black text-white">
      {/* Logo */}
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

      {/* Profile */}
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

      {/* Navigation */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={['dashboard']}
        items={menuItems}
        onClick={handleMenuClick}
        className="!border-none !bg-black"
      />

      {/* Logout */}
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
      {/* Desktop Sidebar */}
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block"
      >
        {sidebar}
      </Sider>

      <Layout>
        {/* Black Header */}
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
                Dashboard
              </div>

              <div className="hidden text-xs text-gray-400 sm:block">
                Your coding learning overview
              </div>
            </div>
          </div>

          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Header>

        {/* Main Content */}
        <Content className="bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Welcome */}
            <Card className="mb-6 border-0">
              <Title
                level={2}
                className="!mb-1"
              >
                Welcome, {user?.name || 'User'} 👋
              </Title>

              <Text type="secondary">
                Continue your coding journey with CodeMentor AI.
              </Text>
            </Card>

            {/* Statistics */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Problems Solved"
                    value={0}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Problems Attempted"
                    value={0}
                    prefix={<CodeOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Current Streak"
                    value={0}
                    suffix="Days"
                    prefix={<FireOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="AI Reviews"
                    value={0}
                    prefix={<RobotOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            {/* Bottom Cards */}
            <Row
              gutter={[16, 16]}
              className="mt-6"
            >
              <Col xs={24} lg={16}>
                <Card title="Learning Progress">
                  <div className="py-8 text-center">
                    <Text type="secondary">
                      Your learning progress will appear here.
                    </Text>
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={8}>
                <Card title="AI Assistant">
                  <div className="flex flex-col items-center py-6 text-center">
                    <RobotOutlined className="mb-4 text-4xl" />

                    <Text type="secondary">
                      Ask CodeMentor AI for coding hints,
                      explanations, and debugging help.
                    </Text>

                    <Button
                      type="primary"
                      className="mt-4"
                      onClick={() =>
                        navigate('/assistant')
                      }
                    >
                      Open Assistant
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      {/* Mobile Sidebar */}
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

export default Dashboard;
