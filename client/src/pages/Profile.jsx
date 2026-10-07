import {
  Typography,
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Tag,
} from 'antd';

const { Title, Text } = Typography;

function Profile() {
  const handleSave = (values) => {
    console.log(values);
  };

  return (
    <div className="space-y-5">
      <div>
        <Title level={2} className="!mb-1">
          Profile
        </Title>

        <Text type="secondary">
          Manage your learning preferences and AI personalization.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Learning Profile">
            <div className="space-y-4">
              <div>
                <Text type="secondary">
                  Current Level
                </Text>

                <div className="mt-1">
                  <Tag color="blue">
                    Beginner
                  </Tag>
                </div>
              </div>

              <div>
                <Text type="secondary">
                  Preferred Language
                </Text>

                <div className="mt-1">
                  <Tag color="green">
                    JavaScript
                  </Tag>
                </div>
              </div>

              <div>
                <Text type="secondary">
                  Learning Style
                </Text>

                <div className="mt-1">
                  <Tag color="purple">
                    Simple Explanation
                  </Tag>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Profile Settings">
            <Form
              layout="vertical"
              onFinish={handleSave}
            >
              <Form.Item
                label="Name"
                name="name"
                initialValue="Niharika"
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                initialValue="user@example.com"
              >
                <Input
                  size="large"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                label="Preferred Programming Language"
                name="language"
                initialValue="javascript"
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'javascript',
                      label: 'JavaScript',
                    },
                    {
                      value: 'java',
                      label: 'Java',
                    },
                    {
                      value: 'python',
                      label: 'Python',
                    },
                    {
                      value: 'typescript',
                      label: 'TypeScript',
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Explanation Style"
                name="style"
                initialValue="simple"
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'simple',
                      label: 'Simple Explanation',
                    },
                    {
                      value: 'detailed',
                      label: 'Detailed Explanation',
                    },
                    {
                      value: 'examples',
                      label: 'More Examples',
                    },
                  ]}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                Save Profile
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;