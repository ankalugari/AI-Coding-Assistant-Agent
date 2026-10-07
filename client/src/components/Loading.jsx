import { Spin } from 'antd';

function Loading() {
  return (
    <div className="flex justify-center p-6">
      <Spin />
    </div>
  );
}

export default Loading;