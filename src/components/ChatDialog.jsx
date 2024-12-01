import { BsFillCameraVideoFill, BsLink45Deg } from 'react-icons/bs';

import { IoIosSend, IoMdTabletLandscape } from 'react-icons/io';
import { MdGroupAdd, MdInsertEmoticon } from 'react-icons/md';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IoImageOutline } from 'react-icons/io5';
import { Avatar } from 'antd';
import { useEffect, useId, useRef, useState } from 'react';

function ChatDialog({ setMenu }) {
    const messageContainer = useRef(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState('');
    const imageId = useId();
    const fileId = useId();

    const handleShowMenu = () => {
        console.log('hi');

        setMenu((pre) => (pre ? false : 1));
    };
    useEffect(() => {
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }, []);
    return (
        <div className="flex-1">
            <div className="h-[10%] pl-2 bg-white flex items-center justify-between">
                <div className="flex space-x-2">
                    <Avatar size={40}>USER</Avatar>
                    <div>
                        <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                        <p className="opacity-80">13 Thanh vien</p>
                    </div>
                </div>
                <div className="flex space-x-2 pr-1">
                    <button>
                        <MdGroupAdd className="opacity-60" size={'1.5rem'} />
                    </button>
                    <button>
                        <BsFillCameraVideoFill className="opacity-60" size={'1.5rem'} />
                    </button>
                    <button onClick={handleShowMenu}>
                        <IoMdTabletLandscape className="opacity-60" size={'1.5rem'} />
                    </button>
                </div>
            </div>
            <div ref={messageContainer} className="bg-[#F2F5F8] py-2 h-[75%] overflow-y-scroll pl-2">
                <div className="flex flex-col-reverse">
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="bg-white rounded-md shadow-lg px-2 py-1">
                            <p>Hello moi nguoi 1</p>
                            <span className="text-[0.8rem] opacity-60">12:15</span>
                        </div>
                    </div>
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
                    <input type="file" className="hidden" accept="image/*" id={imageId} />
                    <label htmlFor={fileId}>
                        <BsLink45Deg size="1.5rem" />
                    </label>
                    <input type="file" className="hidden" accept=".txt,.doc,.docx,.ppt,.pptx,.pdf" id={fileId} />
                </div>
                <form className="h-[60%] flex items-center justify-between px-2">
                    <input
                        className="h-full text-10"
                        placeholder="Nhập tin nhắn"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <button type="submit">
                        <IoIosSend size="1.7rem" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatDialog;
