import { Avatar, Input, Tabs } from 'antd';
import { BsLink45Deg } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoIosPeople, IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlinePeople } from 'react-icons/md';
import ImageCustom from '~/components/ImageCustom';
import image from '~/public/media/images/logo_node_react.png';
import ChatDialog from '~/components/ChatDialog';
import MenuChat from '~/components/MenuChat';
import Member from '~/components/Member';
import { useState } from 'react';

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
    console.log(menuChat);

    return (
        <div className="flex h-[575px]">
            <div className="w-[25%] border-r-2 pr-2 h-full border-silver cursor-pointer">
                <div className="flex w-full space-x-2">
                    <span className="block w-[90%]">
                        <Input prefix={<CiSearch />} />
                    </span>
                    <button>
                        <IoIosPeople className="text-silver" size={'2rem'} />
                    </button>
                </div>
                <Tabs items={listTabs} defaultActiveKey={1} />
                <div className="space-y-2 max-h-[calc(100%-80px)] overflow-y-scroll">
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Avatar size={40}>USER</Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold truncate">Nhom hoc tạp balabala</h2>
                            <p className="opacity-80">Thanh An: hello</p>
                        </div>
                        <div className="">
                            <p>5 phut</p>
                            <span className=" px-1 text-[0.8rem] rounded-md bg-red text-white">+11</span>
                        </div>
                    </div>
                </div>
            </div>
            <ChatDialog setMenu={setMenuChat} />
            {menuChat && (menuChat == 1 ? <MenuChat setMenu={setMenuChat} /> : <Member setMenu={setMenuChat} />)}
        </div>
    );
}

export default Chat;
