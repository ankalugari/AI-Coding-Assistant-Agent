import { Card, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    message.success('Login successful');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="mb-6 text-center">
          <Title level={2} className="!mb-2">
            CodeMentor AI
          </Title>

          <Text type="secondary">
            AI Coding Assistant
          </Text>
        </div>

        <div className="space-y-4">
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Email"
          />

          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Password"
          />

          <Button
            type="primary"
            size="large"
            block
            onClick={handleLogin}
          >
            Login
          </Button>

          <div className="text-center">
            <Text type="secondary">
              Don't have an account?{' '}
            </Text>

            <Button
              type="link"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;