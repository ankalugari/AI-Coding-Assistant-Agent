import { useState } from 'react';
import {Form,Input,Button,Card,Typography,message,} from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const { Title, Text } = Typography;

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      message.success('Registration successful');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.message ||'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <Title level={2} className="text-center">
          CodeMentor AI
        </Title>

        <Text
          type="secondary"
          className="mb-6 block text-center"
        >
          Create your account
        </Text>

        <Form
          layout="vertical"
          onFinish={handleRegister}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
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
              {
                min: 6,
                message: 'Password must be at least 6 characters',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Register
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <Text>
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default Register;
