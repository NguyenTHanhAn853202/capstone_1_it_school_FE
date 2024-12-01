import HeaderPage from './Header';
// import { useToggleMode } from '~/hook/useDarkMode';
// import SideBar from './Sidebar';

// function Layout({ children }) {
//     return (
//         <div className="relative">
//             <SideBar />
//             <Header />
//             <div className="absolute w-[80%] right-0 top-[70px] h-[70px] 1xl:w-[85%]">{children}</div>
//         </div>
//     );
// }

// export default Layout;

import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import SideBar from './Sidebar';
const { Header, Sider, Content } = Layout;
function LayoutPage({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className="bg-side_bar">
            <Sider className="!max-w-[250px] !w-[250px] !flex-1" trigger={null} collapsible collapsed={collapsed}>
                <SideBar />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <HeaderPage />
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
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
export default LayoutPage;
