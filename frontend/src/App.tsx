import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { GithubOutlined, AreaChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RepositoryAnalysis from './pages/RepositoryAnalysis';
import Settings from './pages/Settings';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<AreaChartOutlined />}>
            <Link to="/">ダッシュボード</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<GithubOutlined />}>
            <Link to="/analysis">リポジトリ分析</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/settings">設定</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<RepositoryAnalysis />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Weave Japan MVP ©2023 Created by Jules
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
