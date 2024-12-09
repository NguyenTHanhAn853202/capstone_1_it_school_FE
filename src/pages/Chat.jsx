import { Avatar, Button, Image, Input, Tabs, Upload } from 'antd';
import { BsLink45Deg } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoIosPeople, IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlinePeople } from 'react-icons/md';
import ImageCustom from '~/components/ImageCustom';
import image from '~/public/media/images/logo_node_react.png';
import ChatDialog from '~/components/ChatDialog';
import MenuChat from '~/components/MenuChat';
import Member from '~/components/Member';
import { useEffect, useId, useRef, useState } from 'react';
import Dialog from '~/components/Dialog';
import { get, post } from '~/database';
import { toastError, toastInfo, toastSuccess } from '~/utils/toasty';
import { PATH_MEDIA } from '~/utils/secret';
import timeAgo from '~/utils/timeAgo';

const listTabs = [
    {
        key: 1,
        label: 'Tất cả',
    },
    {
        key: 2,
        label: 'Nhóm',
    },
];

function Chat() {
    const [menuChat, setMenuChat] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [username, setUsername] = useState('');
    const [groupName, setGroupName] = useState('');
    const [listMember, setListMember] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const idIp = useId();
    const [myGroup, setMyGroup] = useState([]);
    const [groupId, setGroupId] = useState('');

    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);
        e.target.files[0] && setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleAddMember = async () => {
        try {
            const member = await get('/user/get-user?key=' + username);
            if (member.status === 'ok') setListMember([...listMember, member.data]);
            if (member?.status === 'info') toastInfo('Người dùng không tồn tại');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCreateGroup = async () => {
        try {
            setLoading(true);
            if (!groupName || !image) {
                toastInfo('Vui lòng nhập tên nhóm và chọn ảnh');
                return;
            }
            const membersUserNames = listMember.map((item) => item.user.username);
            const formData = new FormData();
            formData.append('groupName', groupName);
            formData.append('membersUserNames', JSON.stringify(membersUserNames));
            formData.append('type', 'thông thường');
            formData.append('avatar', image);
            const response = await post('/study-group/create-group', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status == 'ok') {
                toastSuccess('Tạo thành công');
                setOpen(false);
                setGroupName('');
                setImage('');
                setImageUrl('');
                setUsername('');
            } else {
                toastError('Tạo nhóm thất bại');
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setListMember([]);
        }
    };

    useEffect(() => {
        (async () => {
            const response = await get('/study-group/list');
            response.status === 'ok' && response.data.groups && setMyGroup(response.data.groups);
        })();
    }, []);
    console.log(myGroup);

    return (
        <div className="flex h-[575px]">
            <div className="w-[25%] border-r-2 pr-2 h-full border-silver cursor-pointer">
                <div className="flex w-full space-x-2">
                    <span className="block w-[90%]">
                        <Input prefix={<CiSearch />} />
                    </span>
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <IoIosPeople className="text-silver" size={'2rem'} />
                    </button>
                    <Dialog
                        handleOk={handleCreateGroup}
                        confirmLoading={loading}
                        setOpen={setOpen}
                        open={open}
                        title={'Tạo nhóm'}
                        content={
                            <div className="space-y-2">
                                <div className="flex space-x-2">
                                    <div className="relative">
                                        {imageUrl ? (
                                            <img src={imageUrl} className="size-[40px] rounded-full" />
                                        ) : (
                                            <Avatar size={40}>+</Avatar>
                                        )}
                                        <label
                                            className="size-[40px] absolute rounded-full  top-0 left-0 bg-[rgba(255,255,255,0)]"
                                            htmlFor={idIp}
                                        ></label>
                                        <input
                                            accept="image/*"
                                            id={idIp}
                                            type="file"
                                            className="hidden"
                                            onChange={handleChangeImage}
                                        />
                                    </div>
                                    <Input
                                        value={groupName}
                                        onChange={(e) => {
                                            setGroupName(e.target.value);
                                        }}
                                        className="flex-1"
                                        placeholder="Nhập tên nhóm"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <Input
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        className="!w-[70%]"
                                        placeholder="Nhập tên đăng nhập..."
                                    />
                                    <Button onClick={handleAddMember}>Thêm</Button>
                                </div>
                                {listMember.length > 0 && (
                                    <div className="space-y-2">
                                        <h1>Danh sách thành viên</h1>
                                        {listMember.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center ">
                                                <div className="flex space-x-2">
                                                    <Avatar src={PATH_MEDIA + item.avatar} size={30} />
                                                    <h2>{item.user.username}</h2>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setListMember((pre) => pre.filter((_, i) => i != index));
                                                    }}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                    />
                </div>
                <Tabs items={listTabs} defaultActiveKey={1} />
                <div className="space-y-2 max-h-[calc(100%-80px)] overflow-y-scroll">
                    {myGroup.map((item, index) => {
                        const groupChat = item.groupChat;
                        const lastMessage = item.lastMessage;
                        return (
                            <div
                                onClick={() => {
                                    setGroupId(groupChat._id);
                                }}
                                key={groupChat._id}
                                className="flex space-x-2"
                            >
                                <img className="!size-[40px] block rounded-full" src={PATH_MEDIA + groupChat.avatar} />
                                <div className="w-[60%]">
                                    <h2 className="font-bold truncate">{groupChat.groupName}</h2>
                                    <p className="opacity-80 truncate w-[90%]">
                                        {lastMessage?.sender?.name && `${lastMessage?.sender?.name}: `}
                                        {lastMessage?.content}
                                    </p>
                                </div>
                                <div className="">
                                    <p>{lastMessage?.createdAt && timeAgo(lastMessage.createdAt)}</p>
                                    {item.unreadCount > 0 && (
                                        <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">
                                            +{item.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ChatDialog groupId={groupId} setMenu={setMenuChat} />
            {menuChat &&
                (menuChat == 1 ? (
                    <MenuChat setMenu={setMenuChat} setMyGroup={setMyGroup} groupId={groupId} setGroupId={setGroupId} />
                ) : (
                    <Member setMenu={setMenuChat} />
                ))}
        </div>
    );
}

export default Chat;
