import { Avatar, Input } from 'antd';
import { IoMdArrowBack } from 'react-icons/io';
import { MdGroupAdd } from 'react-icons/md';

function Member({ setMenu }) {
    return (
        <div className="w-[20%] h-575px">
            <div className="h-[10%] border-b bg-white flex items-center px-2">
                <button
                    onClick={() => {
                        setMenu(1);
                    }}
                >
                    <IoMdArrowBack size={'1.5rem'} />
                </button>
                <h1 className="font-bold  text-center text-10 flex-1">Thành viên</h1>
            </div>
            <div className="max-h-[calc(575px-10%)] overflow-y-scroll">
                <div className="mt-2 flex px-2 space-x-1">
                    <Input placeholder="Nhập tên đăng nhập" />
                    <button className=" ">
                        <MdGroupAdd size="1.5rem" />
                    </button>
                </div>
                <div className="mt-2 px-2">
                    <h2 className="font-medium text-10 truncate">Thành viên mới</h2>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-1 items-center ">
                                <Avatar size={25}>USER</Avatar>
                                <h4>Thanh An</h4>
                            </div>
                            <button className="px-2 rounded-lg text-white bg-button_green">Duyệt</button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-1 items-center ">
                                <Avatar size={25}>USER</Avatar>
                                <h4>Thanh An</h4>
                            </div>
                            <button className="px-2 rounded-lg text-white bg-button_green">Duyệt</button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-1 items-center ">
                                <Avatar size={25}>USER</Avatar>
                                <h4>Thanh An</h4>
                            </div>
                            <button className="px-2 rounded-lg text-white bg-button_green">Duyệt</button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-1 items-center ">
                                <Avatar size={25}>USER</Avatar>
                                <h4>Thanh An</h4>
                            </div>
                            <button className="px-2 rounded-lg text-white bg-button_green">Duyệt</button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <div className="flex space-x-1 items-center ">
                                <Avatar size={25}>USER</Avatar>
                                <h4>Thanh An</h4>
                            </div>
                            <button className="px-2 rounded-lg text-white bg-button_green">Duyệt</button>
                        </div>
                    </div>
                </div>
                <div className="mt-2 px-2">
                    <h2 className="font-medium text-10 truncate">Danh sách thành viên</h2>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-1 items-center">
                            <Avatar size={25}>USER</Avatar>
                            <h4>Thanh An</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Member;
