import { useEffect, useState } from 'react';

import {
  Card,
  Typography,
  Tag,
  Spin,
  Button,
  message,
} from 'antd';

import {
  ArrowLeftOutlined,
} from '@ant-design/icons';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { getProblem } from '../services/problemService';

const { Title, Text } = Typography;

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProblem = async () => {
    try {
      const data = await getProblem(id);

      setProblem(data);
    } catch (error) {
      console.error('PROBLEM ERROR:', error);

      message.error(
        error.response?.data?.message ||
        'Unable to load problem'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  return (
    <div className="w-full">
      <Button
        icon={<ArrowLeftOutlined />}
        className="mb-4"
        onClick={() =>
          navigate('/problems')
        }
      >
        Back to Problems
      </Button>

      <Card>
        <Title level={2}>
          {problem.title}
        </Title>

        <div className="mb-6">
          <Tag>
            {problem.difficulty}
          </Tag>

          <Tag>
            {problem.topic}
          </Tag>
        </div>

        <Title level={4}>
          Problem Description
        </Title>

        <Text>
          {problem.description}
        </Text>

        <div className="mt-6">
          <Button
            type="primary"
            onClick={() =>
              navigate(
                `/assistant?problem=${problem.id}`
              )
            }
          >
            Solve with AI Assistant
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ProblemDetails;
