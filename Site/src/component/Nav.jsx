import React from 'react'

import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;
function Nav() {
  return (
    <>
               <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className='container'>
       

        <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/" className=''>Home</Link>
        </Menu.Item>
      
        <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/login">login</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/signup">signup</Link>
        </Menu.Item>
       
        
      </Menu>
    </Header>
    </>
  )
}

export default Nav