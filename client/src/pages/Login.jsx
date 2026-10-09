import { useState } from 'react';
import {Form,Input,Button,Card,Typography,message,} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await loginUser(values);
      message.success('Login successful');
      navigate('/dashboard', {replace: true,});
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <Title level={2} className="text-center">CodeMentor AI</Title>
        <Text type="secondary" className="mb-6 block text-center">Login to your account</Text>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <Text>
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default Login;
