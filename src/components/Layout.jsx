import HeaderPage from './Header';
import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { ChatBotWidget } from 'chatbot-widget-ui';
import SideBar from './Sidebar';
import { post } from '~/database';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
function LayoutPage({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [messages, setMessages] = useState('');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { pathname } = useLocation();

    const customApiCall = async (message) => {
        const res = await post('/user/chatbot', {
            text: message,
        });
        if (res.status === 'ok') return res.data;
        return 'Chưa tìm thấy câu trả lời phù hợp';
    };
    const navigate = useNavigate();
    const [back, setBack] = useState(true);
    useEffect(() => {
        if (
            pathname.includes('/store') ||
            pathname.includes('/profile') ||
            pathname.includes('/chat') ||
            pathname.includes('/post') ||
            pathname === '/'
        ) {
            setBack(false);
        }
    }, [pathname]);
    return (
        <Layout className="bg-side_bar">
            <Sider className="!max-w-[200px] !w-[200px] !flex-1" trigger={null} collapsible collapsed={collapsed}>
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
                    {back && (
                        <button
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <BiLeftArrowAlt className="text-[26px]" />
                        </button>
                    )}
                    {children}
                </Content>
            </Layout>
            {!pathname.includes('/chat') && (
                <div>
                    <ChatBotWidget
                        callApi={customApiCall}
                        primaryColor="#3498db"
                        inputMsgPlaceholder="Nhập câu hỏi"
                        chatbotName="IT school"
                        isTypingMessage="Đang suy nghỉ..."
                        IncommingErrMsg="Oops! Something went wrong. Try again."
                        handleNewMessage={setMessages}
                        chatIcon={
                            <div
                                style={{
                                    fontSize: '24px',
                                    color: 'white',
                                    backgroundColor: '#3498db',
                                    padding: '15px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s',
                                    fontFamily: 'Arial, sans-serif', // Đặt font chữ cho icon chat
                                }}
                            >
                                💬
                            </div>
                        }
                    />
                </div>
            )}
        </Layout>
    );
}
export default LayoutPage;
