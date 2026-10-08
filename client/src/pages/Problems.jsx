import { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Tag,
  Typography,
  Spin,
  Empty,
  message,
} from 'antd';

import { useNavigate } from 'react-router-dom';

import { getProblems } from '../services/problemService';

const { Title, Text } = Typography;

function Problems() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProblems = async () => {
    try {
      setLoading(true);

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

  useEffect(() => {
    loadProblems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Title level={2}>
          Coding Problems
        </Title>

        <Text type="secondary">
          Practice coding problems with CodeMentor AI
        </Text>
      </div>

      {problems.length === 0 ? (
        <Empty description="No coding problems found" />
      ) : (
        <Row gutter={[16, 16]}>
          {problems.map((problem) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              key={problem.id}
            >
              <Card
                hoverable
                title={problem.title}
                onClick={() =>
                  navigate(`/problems/${problem.id}`)
                }
              >
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
  );
}

export default Problems;
