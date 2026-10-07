import {
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Statistic,
  Table,
} from 'antd';

const { Title, Text } = Typography;

function ProgressPage() {
  const data = [
    {
      key: '1',
      topic: 'Arrays',
      solved: 15,
      total: 20,
      progress: 75,
    },
    {
      key: '2',
      topic: 'Strings',
      solved: 10,
      total: 15,
      progress: 67,
    },
    {
      key: '3',
      topic: 'Recursion',
      solved: 4,
      total: 12,
      progress: 33,
    },
    {
      key: '4',
      topic: 'Dynamic Programming',
      solved: 2,
      total: 15,
      progress: 13,
    },
  ];

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'topic',
    },
    {
      title: 'Solved',
      render: (_, record) =>
        `${record.solved}/${record.total}`,
    },
    {
      title: 'Progress',
      render: (_, record) => (
        <Progress
          percent={record.progress}
          size="small"
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Title level={2} className="!mb-1">
          Learning Progress
        </Title>

        <Text type="secondary">
          Track your coding growth and identify weak areas.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Solved"
              value={31}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Attempts"
              value={52}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={60}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Current Streak"
              value={7}
              suffix=" days"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Topic Progress">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 500 }}
        />
      </Card>

      <Card title="AI Learning Insights">
        <div className="space-y-3">
          <Text>
            • Your strongest topic is Arrays.
          </Text>

          <br />

          <Text>
            • You need more practice with Recursion.
          </Text>

          <br />

          <Text>
            • Dynamic Programming is currently your weakest topic.
          </Text>

          <br />

          <Text>
            • The AI Agent can personalize future explanations based on these results.
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default ProgressPage;