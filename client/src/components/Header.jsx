import { Avatar, Layout, Dropdown, Typography } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

function Header() {
  const navigate = useNavigate();

  const items = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const handleMenu = ({ key }) => {
    if (key === 'profile') {
      navigate('/profile');
    }

    if (key === 'logout') {
      navigate('/login');
    }
  };

  return (
    <AntHeader className="flex h-16 items-center justify-between bg-white px-3 shadow-sm sm:px-4 md:px-6">
      <Text strong className="text-base sm:text-lg">
        CodeMentor AI
      </Text>

      <Dropdown
        menu={{
          items,
          onClick: handleMenu,
        }}
        placement="bottomRight"
      >
        <Avatar
          className="cursor-pointer"
          icon={<UserOutlined />}
        />
      </Dropdown>
    </AntHeader>
  );
}

export default Header;