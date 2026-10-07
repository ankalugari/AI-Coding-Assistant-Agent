import { Avatar } from 'antd';
import {
  UserOutlined,
  RobotOutlined,
} from '@ant-design/icons';

function ChatMessage({ role, content }) {
  const user = role === 'user';

  return (
    <div
      className={`mb-4 flex gap-2 sm:gap-3 ${
        user ? 'justify-end' : 'justify-start'
      }`}
    >
      {!user && (
        <Avatar
          size="small"
          icon={<RobotOutlined />}
        />
      )}

      <div
        className={`max-w-[85%] rounded-lg p-3 text-sm sm:max-w-[75%] sm:text-base ${
          user
            ? 'bg-blue-500 text-white'
            : 'bg-white shadow-sm'
        }`}
      >
        {content}
      </div>

      {user && (
        <Avatar
          size="small"
          icon={<UserOutlined />}
        />
      )}
    </div>
  );
}

export default ChatMessage;