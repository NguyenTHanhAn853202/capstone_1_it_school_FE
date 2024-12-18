import { BsFillCameraVideoFill, BsLink45Deg } from 'react-icons/bs';

import { IoIosSend, IoMdTabletLandscape } from 'react-icons/io';
import { MdGroupAdd, MdInsertEmoticon } from 'react-icons/md';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoImageOutline } from 'react-icons/io5';
import { Avatar, Button, Image, Input } from 'antd';
import backgrouudChat from '~/public/media/images/backgroud-group-chat.jpg';
import { useEffect, useId, useRef, useState } from 'react';
import { get, post } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';
import { isObject } from 'formik';
import Dialog from './Dialog';
import { toastError, toastInfo, toastSuccess } from '~/utils/toasty';
import parseMeetingData from '~/utils/parseZoom';
import { socket } from '~/utils/socket';
import formatDateTime from '~/utils/formatDatetime';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function ChatDialog({ setMenu, groupId = '', setGroupId, setIsLoadData }) {
    const messageContainer = useRef(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [group, setGroup] = useState('');
    const imageId = useId();
    const fileId = useId();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [username, setUsername] = useState('');
    const [openMeetings, setOpenMeetings] = useState(false);
    const [loadingMeeting, setLoadingMeeting] = useState(false);
    const [dateMeeting, setDateMeeting] = useState(new Date());

    const handleShowMenu = () => {
        setMenu((pre) => (pre ? false : 1));
    };
    useEffect(() => {
        if (groupId) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [groupId, JSON.stringify(messages)]);
    useEffect(() => {
        (async () => {
            const data = await get('/study-group/get-group/' + groupId);
            data.status === 'ok' && setMessages(data.data.messages);
            data.status === 'ok' && setGroup(data.data.groupChat);
        })();
    }, [groupId]);
    const handleAddMember = async () => {
        try {
            const member = await get('/user/get-user?key=' + username);
            if (member.status === 'ok') setListMember([...listMember, member.data]);
            if (member?.status === 'info') toastInfo('Người dùng không tồn tại');
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleSubmitMember = async () => {
        try {
            setLoading(true);
            for (let member of listMember) {
                const data = await post('/study-group/add-profile-group', {
                    username: member.user.username,
                    groupChatId: groupId,
                });
                if (data.response.data.status === 'error') {
                    toastError(data.response.data.message);
                }
            }
        } catch (error) {
            toastError(data.message);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    const handleChat = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('groupId', groupId);
            formData.append('content', message);
            const data = await post('/study-group/create-mess', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.status === 'ok') {
                // setMessages([...messages, data.data]);
                setMessage('');
                setIsLoadData((pre) => pre + 1);
            } else {
                toastInfo('Bạn không còn là thành viên của nhóm');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        console.log('groupId ' + groupId);
    }, [groupId]);

    const handleCreateMeeting = async () => {
        try {
            setLoadingMeeting(true);
            const meeting = await get(`/zoom/schedule?scheduledTime=${dateMeeting}&groupChatId=${groupId}`);
            if (meeting?.url) {
                window.open(meeting.url, '_blank');
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoadingMeeting(false);
            setOpenMeetings(false);
            setDateMeeting(new Date());
        }
    };

    useEffect(() => {
        if (open == false) {
            setUsername('');
            setListMember([]);
        }
    }, [open]);

    useEffect(() => {
        if (!groupId) return;

        const handleSocketEvent = (data) => {
            setMessages((pre) => [...pre, data.data]);
            setIsLoadData((pre) => pre + 1);
        };

        socket.on(groupId, handleSocketEvent);

        return () => {
            socket.off(groupId, handleSocketEvent); // Hủy đăng ký sự kiện cũ khi groupId thay đổi
        };
    }, [groupId]); // Chỉ chạy lại khi groupId thay đổi

    console.log(dateMeeting);

    // xử lý upload file và img
    return (
        <div className="flex-1">
            {groupId ? (
                <>
                    <div className="h-[10%] pl-2 bg-white flex items-center justify-between">
                        <div className="flex space-x-2">
                            <Avatar src={PATH_MEDIA + group?.avatar} size={40} />
                            <div>
                                <h2 className="font-bold truncate">{group?.groupName}</h2>
                                <p className="opacity-80">{group?.members?.length} Thành viên</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 pr-1">
                            <Dialog
                                handleOk={handleSubmitMember}
                                confirmLoading={loading}
                                open={open}
                                setOpen={setOpen}
                                content={
                                    <div className="space-y-2 py-4">
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
                                                                setListMember((pre) =>
                                                                    pre.filter((_, i) => i != index),
                                                                );
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
                            <button
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                <MdGroupAdd className="opacity-60" size={'1.5rem'} />
                            </button>
                            <Dialog
                                confirmLoading={loadingMeeting}
                                content={
                                    <DatePicker
                                        defaultValue={dayjs(new Date())}
                                        format="DD/MM/YYYY HH:mm"
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        onOk={(value) => {
                                            if (value) {
                                                setDateMeeting(value.toDate());
                                            }
                                        }}
                                        minDate={dayjs(new Date())}
                                    />
                                }
                                open={openMeetings}
                                setOpen={setOpenMeetings}
                                title={'Chọn thời gian'}
                                handleOk={handleCreateMeeting}
                            />
                            <button
                                onClick={() => {
                                    setOpenMeetings(true);
                                }}
                            >
                                <BsFillCameraVideoFill className="opacity-60" size={'1.5rem'} />
                            </button>
                            <button onClick={handleShowMenu}>
                                <IoMdTabletLandscape className="opacity-60" size={'1.5rem'} />
                            </button>
                        </div>
                    </div>
                    <div ref={messageContainer} className="bg-[#F2F5F8] py-2 h-[75%] overflow-y-scroll pl-2">
                        <div className="">
                            {messages.map((item, index) => {
                                let url = '';
                                let passwordMeeting = '';
                                let start;
                                if (item.type == 'linkMeeting') {
                                    const { StartTime, password, joinUrl } = JSON.parse(item.content);
                                    url = joinUrl;
                                    start = dayjs(StartTime).format('DD/MM/YYYY HH:mm');
                                    passwordMeeting = password;
                                }
                                return item.sender._id !== localStorage.profileId ? (
                                    <div className="flex items-start space-x-2 mb-2">
                                        <Avatar src={PATH_MEDIA + item.sender.avatar} size={40} />
                                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                                            {item.type === 'text' && <p>{item.content}</p>}
                                            {item.type === 'image' && (
                                                <Image
                                                    src={PATH_MEDIA + item.content}
                                                    className="!w-[200px] !block !object-cover !h-[130px]"
                                                />
                                            )}
                                            {['word', 'excel', 'file'].includes(item.type) && (
                                                <a href={PATH_MEDIA + item.content} target="_blank" className="block">
                                                    Download file
                                                </a>
                                            )}
                                            {item.type == 'linkMeeting' && (
                                                <div>
                                                    <p>
                                                        <p>Meeting</p>
                                                        Link:
                                                        <a href={url} target="_blank">
                                                            Tham gia
                                                        </a>
                                                        <p>Password: {passwordMeeting}</p>
                                                        <p>Time: {start}</p>
                                                    </p>
                                                </div>
                                            )}
                                            <span className="text-[0.8rem] opacity-60 block">
                                                {formatDateTime(item.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-end mr-2">
                                        <div className="flex items-start space-x-2 mb-2">
                                            <div className="bg-white rounded-md shadow-lg px-2 py-1">
                                                {item.type === 'text' && <p>{item.content}</p>}
                                                {item.type === 'image' && (
                                                    <Image
                                                        src={PATH_MEDIA + item.content}
                                                        className="!w-[200px] !block !object-cover !h-[130px]"
                                                    />
                                                )}
                                                {['word', 'excel', 'file'].includes(item.type) && (
                                                    <a
                                                        href={PATH_MEDIA + item.content}
                                                        target="_blank"
                                                        className="block"
                                                    >
                                                        Download file
                                                    </a>
                                                )}
                                                {item.type == 'linkMeeting' && (
                                                    <div>
                                                        <p>
                                                            <p>Meeting</p>
                                                            Link:
                                                            <a href={url} target="_blank">
                                                                Tham gia
                                                            </a>
                                                            <p>Password: {passwordMeeting}</p>
                                                            <p>Time: {start}</p>
                                                        </p>
                                                    </div>
                                                )}
                                                <span className="text-[0.8rem] opacity-60 block">
                                                    {formatDateTime(item.createdAt)}
                                                </span>
                                            </div>
                                            <Avatar src={PATH_MEDIA + item.sender.avatar} size={40} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-white h-[15%] border-t border-r border-b border-silver relative">
                        {showEmoji ? (
                            <Picker
                                data={data}
                                onEmojiSelect={(e) => {
                                    setMessage(message + e.native.toString());
                                }}
                                onClickOutside={() => {
                                    console.log();
                                }}
                            />
                        ) : null}
                        <div className="h-[40%] border-b border-silver flex items-center space-x-2 pl-2">
                            <button
                                onClick={() => {
                                    console.log(showEmoji);
                                    setShowEmoji(!showEmoji);
                                }}
                            >
                                <MdInsertEmoticon size="1.5rem" />
                            </button>
                            <label htmlFor={imageId}>
                                <IoImageOutline size="1.5rem" />
                            </label>
                            <input
                                onChange={(e) => {
                                    setMessage(e.target.files[0]);
                                }}
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id={imageId}
                            />
                            <label htmlFor={fileId}>
                                <BsLink45Deg size="1.5rem" />
                            </label>
                            <input
                                onChange={(e) => {
                                    setMessage(e.target.files[0]);
                                }}
                                type="file"
                                className="hidden"
                                accept=".txt,.doc,.docx,.ppt,.pptx,.pdf"
                                id={fileId}
                            />
                        </div>
                        <form onSubmit={handleChat} className="h-[60%] flex items-center justify-between px-4">
                            {isObject(message) ? (
                                <div className="flex items-center space-x-1 ">
                                    {message?.type?.startsWith('image') ? (
                                        <Image className="!size-[40px]" src={URL.createObjectURL(message)} />
                                    ) : (
                                        <span>{message.name}</span>
                                    )}
                                    <span
                                        className="underline italic cursor-pointer"
                                        onClick={() => {
                                            setMessage('');
                                        }}
                                    >
                                        Xóa
                                    </span>
                                </div>
                            ) : (
                                <input
                                    className="h-full flex-1 text-10 pr-2"
                                    placeholder="Nhập tin nhắn"
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                />
                            )}
                            <button type="submit">
                                <IoIosSend size="1.7rem" />
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <div className=" mt-[150px] w-[60%] mx-auto items-center">
                    <h1 className="text-14 font-bold text-center">Chào mừng bạn đến với group chat</h1>
                    <p className="text-center text-10">
                        Nơi đây là không gian để chúng ta cùng nhau trao đổi, chia sẻ kiến thức, và hỗ trợ lẫn nhau
                        trong quá trình phát triển. Mỗi thành viên đều là một phần quan trọng tạo nên sự thành công của
                        cộng đồng này.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ChatDialog;
