import { Card, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ProblemCard({ problem }) {
  const navigate = useNavigate();

  return (
    <Card
      title={<span className="text-sm sm:text-base">{problem.title}</span>}
      extra={<Tag color="blue">{problem.difficulty}</Tag>}
      className="h-full"
    >
      <p className="mb-4 text-sm text-gray-600 sm:text-base">{problem.description}</p>
      <Button type="primary" block onClick={() => navigate(`/assistant?problem=${problem.id}`)}>Solve Problem</Button>
    </Card>
  );
}

export default ProblemCard;