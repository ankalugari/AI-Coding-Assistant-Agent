import { useEffect, useState } from 'react';

import {
  Card,
  Col,
  Row,
  Statistic,
  Progress,
  Spin,
  Empty,
  message,
  Typography,
  Tag,
} from 'antd';

import {
  CodeOutlined,
  CheckCircleOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';

import {
  getLearningStats,
  getTopicProgress,
} from '../services/progressService';

const { Title, Text } = Typography;

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const statsData = await getLearningStats();
      const topicsData = await getTopicProgress();

      setStats(statsData);
      setTopics(topicsData);
    } catch (error) {
      console.error('DASHBOARD ERROR:', error);

      message.error(
        error.response?.data?.message ||
        'Unable to load dashboard'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <Title
          level={2}
          className="!mb-1 text-xl sm:text-2xl"
        >
          Welcome, {user?.name || 'User'}
        </Title>

        <Text type="secondary">
          Track your coding practice and learning progress.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            className="h-full"
            styles={{
              body: {
                padding: 20,
              },
            }}
          >
            <Statistic
              title="Problems Solved"
              value={stats?.solved || 0}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            className="h-full"
            styles={{
              body: {
                padding: 20,
              },
            }}
          >
            <Statistic
              title="Problems Attempted"
              value={stats?.attempted || 0}
              prefix={<CodeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            className="h-full"
            styles={{
              body: {
                padding: 20,
              },
            }}
          >
            <Statistic
              title="AI Reviews"
              value={stats?.reviews || 0}
              prefix={<FileSearchOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        className="mt-6"
        title="Topic Progress"
      >
        {topics.length === 0 ? (
          <Empty
            description="No learning progress yet"
          />
        ) : (
          <div className="space-y-6">
            {topics.map((topic) => (
              <div key={topic.id}>
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Text strong className="text-base">
                      {topic.topic}
                    </Text>

                    <div className="mt-1">
                      <Tag>{topic.level}</Tag>
                    </div>
                  </div>

                  <Text strong>
                    {Number(topic.accuracy || 0)}%
                  </Text>
                </div>

                <Progress
                  percent={Number(topic.accuracy || 0)}
                  showInfo={false}
                />

                <Text
                  type="secondary"
                  className="text-sm"
                >
                  {topic.problems_solved || 0} solved /{' '}
                  {topic.problems_attempted || 0} attempted
                </Text>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
