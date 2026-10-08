import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Tag,
  Spin,
  message,
  Button,
} from 'antd';

import { useNavigate, useParams } from 'react-router-dom';

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
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!problem) {
    return null;
  }

  return (
    <div>
      <Button
        className="mb-4"
        onClick={() => navigate('/problems')}
      >
        Back
      </Button>

      <Card>
        <Title level={2}>
          {problem.title}
        </Title>

        <div className="mb-4">
          <Tag>{problem.difficulty}</Tag>
          <Tag>{problem.topic}</Tag>
        </div>

        <Title level={4}>
          Problem
        </Title>

        <Text>
          {problem.description}
        </Text>
      </Card>
    </div>
  );
}

export default ProblemDetails;
