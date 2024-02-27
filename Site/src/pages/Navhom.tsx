import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const Navhom = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
       
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/layout" className='text-decoration-none'>Nav 2</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <span>Nav 2</span>
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />}>
        <span>Nav 3</span>
      </Menu.Item>
      <Menu.Item key="4" icon={<UploadOutlined />}>
        <span>Nav 3</span>
      </Menu.Item>
      <Menu.Item key="5" icon={<UploadOutlined />}>
        <span>Nav 3</span>
      </Menu.Item>
      <Menu.Item key="6" icon={<UploadOutlined />}>
        <span>Nav 3</span>
      </Menu.Item>
      <Menu.Item key="7" icon={<UploadOutlined />}>
        <span>Nav 3</span>
      </Menu.Item>

    </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
      
    </Layout>
  );
};
export default Navhom;