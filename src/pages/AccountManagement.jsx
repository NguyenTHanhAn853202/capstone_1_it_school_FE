import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { get, post } from '~/database';

const AccountManagement = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [tab, setTab] = useState(1);
    const [data, setData] = useState([]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) => (searchedColumn === dataIndex ? <span style={{ fontWeight: 'bold' }}>{text}</span> : text),
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => index + 1,
            width: '5%',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            width: '30%',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%',

            ...getColumnSearchProps('name'),
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Button type="danger" onClick={() => handleBlock(record)}>
                    {record.status ? 'Block' : 'UnBlock'}
                </Button>
            ),
        },
    ];

    const handleBlock = async (record) => {
        const status = record.status;
        if (status) {
            await post('/user/block', {
                userId: record.key,
            });
        } else {
            await post('/user/unblock', {
                userId: record.key,
            });
        }
        loadData();
    };
    async function loadData() {
        try {
            let condition = 'all';
            if (tab === 2) condition = 'active';
            else if (tab === 3) condition = 'inactive';
            const res = await get('/user/all-user?status=' + condition);
            if (res.status === 'ok') {
                const processedData = res.data.map((item, index) => ({
                    key: item.user._id,
                    username: item.user.username || 'Chưa cập nhật',
                    name: item.name || 'Chưa cập nhật',
                    phoneNumber: item.phoneNumber || 'Chưa cập nhật',
                    status: item.user.status,
                }));
                setData(processedData);
            }
        } catch (error) {}
    }
    useEffect(() => {
        loadData();
    }, [tab]);

    return (
        <div>
            <h1 className="text-12 mb-4 font-medium">Quản lý tài khoản</h1>
            <div>
                <Tabs
                    items={[
                        { label: 'Tất cả', key: 1 },
                        { label: 'Chưa khóa', key: 2 },
                        { label: 'Đã khóa', key: 3 },
                    ]}
                    onChange={(value) => setTab(value)}
                    defaultActiveKey={1}
                />
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default AccountManagement;
