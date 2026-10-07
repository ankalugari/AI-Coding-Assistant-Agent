import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CodeOutlined,
  RobotOutlined,
  BugOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/problems',
      icon: <CodeOutlined />,
      label: 'Problems',
    },
    {
      key: '/assistant',
      icon: <RobotOutlined />,
      label: 'AI Assistant',
    },
    {
      key: '/review',
      icon: <CheckCircleOutlined />,
      label: 'Code Review',
    },
    {
      key: '/debug',
      icon: <BugOutlined />,
      label: 'Debug',
    },
    {
      key: '/progress',
      icon: <BarChartOutlined />,
      label: 'Progress',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
      className="min-h-screen"
    >
      <div className="px-5 py-5 text-xl font-bold text-white">
        CodeMentor AI
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}

export default Sidebar;