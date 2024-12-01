import { Avatar } from 'antd';
import { BsLink45Deg } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlinePeople } from 'react-icons/md';
import ImageCustom from '~/components/ImageCustom';
import image from '~/public/media/images/logo_node_react.png';

function MenuChat({ setMenu }) {
    const handleShowMember = () => {
        setMenu(2);
    };
    return (
        <div className="w-[20%] bg-[#F2F5F8] border-l border-silver max-h-[575px] overflow-y-scroll">
            <h1 className="font-bold h-[10%] text-center text-10 border-b bg-white">Thông tin nhóm</h1>
            <div className="bg-white py-2">
                <div className="flex justify-center ">
                    <Avatar size={40}>USER</Avatar>
                </div>
                <h2 className="text-center font-medium mt-2">Nhom hoc tạp balabala</h2>
            </div>
            <div className="bg-white py-2 mt-2">
                <div className="flex items-center justify-between px-2">
                    <h2>Thành viên nhóm</h2>
                    <span>
                        <IoMdArrowDropdown size="1.5rem" />
                    </span>
                </div>
                <div className="flex justify-between px-2 items-center cursor-pointer" onClick={handleShowMember}>
                    <div className="flex space-x-2 items-center">
                        <span>
                            <MdOutlinePeople size="1.5rem" />
                        </span>
                        <p>13 thành viên</p>
                    </div>
                    <span className=" px-1 text-[0.7rem] rounded-md bg-red text-white">+5</span>
                </div>
            </div>
            <div className="bg-white py-2 mt-2 px-2">
                <div className="flex items-center justify-between ">
                    <h2>Ảnh</h2>
                    <span>
                        <IoMdArrowDropdown size="1.5rem" />
                    </span>
                </div>
                <div className="flex flex-wrap">
                    <div className="rounded-lg overflow-hidden w-[60px h-[60px] mr-1 mb-2">
                        <ImageCustom src={image} className="!w-[60px] object-fill !h-[60px]" />
                    </div>
                    <div className="rounded-lg overflow-hidden w-[60px h-[60px] mr-1 mb-2">
                        <ImageCustom src={image} className="!w-[60px] object-fill !h-[60px]" />
                    </div>
                    <div className="rounded-lg overflow-hidden w-[60px h-[60px] mr-1 mb-2">
                        <ImageCustom src={image} className="!w-[60px] object-fill !h-[60px]" />
                    </div>
                    <div className="rounded-lg overflow-hidden w-[60px h-[60px] mr-1 mb-2">
                        <ImageCustom src={image} className="!w-[60px] object-fill !h-[60px]" />
                    </div>
                    <div className="rounded-lg overflow-hidden w-[60px h-[60px] mr-1 mb-2">
                        <ImageCustom src={image} className="!w-[60px] object-fill !h-[60px]" />
                    </div>
                </div>
                <button className="bg-container w-full py-[3px] rounded-md hover:opacity-60">Xem tất cả</button>
            </div>
            <div className="bg-white py-2 mt-2 px-2">
                <div className="flex items-center justify-between ">
                    <h2>Cuộc họp</h2>
                    <span>
                        <IoMdArrowDropdown size="1.5rem" />
                    </span>
                </div>
                <div className="flex space-x-1 ">
                    <p className="size-[45px] flex justify-center items-center bg-container  rounded-md border border-silver">
                        <BsLink45Deg />
                    </p>
                    <div>
                        <h4>Join our Cloud HD Video Meeting</h4>
                        <span className="text-button_green">us04web.zoom.us</span>
                    </div>
                </div>
                <button className="bg-container w-full py-[3px] rounded-md hover:opacity-60">Xem tất cả</button>
            </div>
        </div>
    );
}

export default MenuChat;
