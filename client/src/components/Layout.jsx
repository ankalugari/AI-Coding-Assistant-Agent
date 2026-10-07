import { Layout as AntLayout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = AntLayout;

function Layout({ children }) {
  return (
    <AntLayout className="min-h-screen">
      <Sidebar />

      <AntLayout className="min-w-0">
        <Header />

        <Content className="bg-gray-100 p-3 sm:p-4 md:p-6">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;