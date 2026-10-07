import {
  Typography,
  Row,
  Col,
  Input,
  Select,
  Empty,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import ProblemCard from '../components/ProblemCard';

const { Title, Text } = Typography;

function Problems() {
  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description:
        'Find two numbers in an array that add up to a target value.',
    },
    {
      id: 2,
      title: 'Reverse String',
      difficulty: 'Easy',
      description:
        'Reverse a string without using built-in reverse methods.',
    },
    {
      id: 3,
      title: 'Binary Search',
      difficulty: 'Medium',
      description:
        'Search for an element in a sorted array efficiently.',
    },
    {
      id: 4,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description:
        'Check whether brackets in a string are balanced.',
    },
    {
      id: 5,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      description:
        'Merge overlapping intervals in an array.',
    },
    {
      id: 6,
      title: 'Longest Substring',
      difficulty: 'Medium',
      description:
        'Find the longest substring without repeating characters.',
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Title level={2} className="!mb-1">
          Coding Problems
        </Title>

        <Text type="secondary">
          Practice problems and improve your problem-solving skills.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Search problems..."
        />

        <Select
          size="large"
          placeholder="Filter by difficulty"
          className="w-full"
          options={[
            {
              value: 'easy',
              label: 'Easy',
            },
            {
              value: 'medium',
              label: 'Medium',
            },
            {
              value: 'hard',
              label: 'Hard',
            },
          ]}
        />
      </div>

      <Row gutter={[16, 16]}>
        {problems.map((problem) => (
          <Col
            key={problem.id}
            xs={24}
            sm={12}
            lg={8}
          >
            <ProblemCard problem={problem} />
          </Col>
        ))}
      </Row>

      {problems.length === 0 && (
        <Empty description="No problems found" />
      )}
    </div>
  );
}

export default Problems;