import { Card, Typography } from 'antd';

const { Text, Title } = Typography;

function StatCard({ title, value }) {
  return (
    <Card className="h-full">
      <Text type="secondary" className="text-sm">
        {title}
      </Text>

      <Title level={2} className="mb-0 mt-2">
        {value}
      </Title>
    </Card>
  );
}

export default StatCard;