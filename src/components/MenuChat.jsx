import { Avatar, Button } from 'antd';
import { useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdOutlinePeople } from 'react-icons/md';
import ImageCustom from '~/components/ImageCustom';
import { get, post } from '~/database';
import image from '~/public/media/images/logo_node_react.png';
import { PATH_MEDIA } from '~/utils/secret';
import Dialog from './Dialog';

function MenuChat({ setMenu, groupId, setGroupId, setMyGroup }) {
    const [infoGroup, setInfoGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [removeMember, setRemoveMember] = useState({
        open: false,
        loading: false,
    });
    const [openOut, setOpenOut] = useState(false);
    const [loadingOut, setLoadingOut] = useState(false);
    const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
    const [loadingDeleteGroup, setLoadingDeleteGroup] = useState(false);
    const [show, setShow] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const handleShowMember = () => {
        setShow(!show);
    };
    const handleShareGroup = async () => {
        await navigator.clipboard.writeText('http://localhost:8000/api/study-group/join/' + groupId);
    };
    const handleRemoveMember = async (memberId) => {
        try {
            setRemoveMember({ ...removeMember, loading: true });
            const data = await post('/study-group/remove-profile-group', {
                removeIdMembersId: [idRemove],
                groupChatId: groupId,
            });
            console.log(data);
            data.status === 'ok' && setMembers(members.filter((member) => member._id != idRemove));
        } catch (error) {
            console.log(error.message);
        } finally {
            setRemoveMember({ open: false, loading: false });
            setIdRemove(null);
        }
    };
    const handelOutGroup = async () => {
        try {
            setLoadingOut(true);
            const data = await post('/study-group/out-group/' + groupId);
            if (data.status === 'ok') {
                console.log('helo');
                setMyGroup((pre) => pre.filter((item) => item.groupChat._id !== groupId));
                setGroupId('');
                setMenu(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpenOut(false);
            setLoadingOut(false);
        }
    };
    const handleDeleteGroup = async () => {
        try {
            setLoadingDeleteGroup(true);
            const data = await post('/study-group/delete-group/' + groupId);
            if (data.status === 'ok') {
                console.log('helo');
                setMyGroup((pre) => pre.filter((item) => item.groupChat._id !== groupId));
                setGroupId('');
                setMenu(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpenDeleteGroup(false);
            setLoadingDeleteGroup(false);
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const group = await get('/study-group/get-group/' + groupId);
                const listMembers = [];
                if (group.status == 'ok') {
                    setInfoGroup(group.data);
                    const members = group.data.groupChat.members;
                    for (let member of members) {
                        const data = await get('/user/member/' + member);
                        data.status == 'ok' && listMembers.push(data.data);
                    }
                }
                console.log(listMembers);

                setMembers(listMembers);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, [groupId]);

    return (
        <div className="w-[20%] bg-[#F2F5F8] border-l border-silver max-h-[575px] overflow-y-scroll">
            <h1 className="font-bold h-[10%] text-center text-10 border-b bg-white">Thông tin nhóm</h1>

            <div className="bg-white py-2">
                <div className="flex justify-center ">
                    <Avatar size={40} src={PATH_MEDIA + infoGroup?.groupChat.avatar} />
                </div>
                <h2 className="text-center font-medium mt-2">{infoGroup?.groupChat.groupName}</h2>
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
                        <p>{members.length} thành viên</p>
                    </div>
                </div>
            </div>
            <div className="bg-white py-2 mt-2 px-2 space-y-2">
                {members.map((item, i) => {
                    console.log(item);

                    return (
                        <div key={item._id} className="flex justify-between">
                            <div className="flex items-center">
                                <Avatar src={PATH_MEDIA + item.avatar} size={35} />
                                <div className="ml-1">
                                    <h4 className="max-w-[130px] truncate">{item.name}</h4>
                                    <h4>
                                        {infoGroup?.groupChat.createdBy === item._id ? 'Quản trị viên' : 'Thành viên'}
                                    </h4>
                                </div>
                            </div>
                            <Dialog
                                content={'Bạn có chắc chắn muốn xóa'}
                                title={'Xóa thành viên'}
                                confirmLoading={removeMember.loading}
                                open={removeMember.open}
                                handleOk={() => handleRemoveMember(item._id)}
                                setOpen={(value) => {
                                    setRemoveMember((pre) => ({ ...pre, open: value }));
                                }}
                            />
                            {infoGroup?.groupChat.createdBy === localStorage.profileId &&
                                infoGroup?.groupChat.createdBy !== item._id && (
                                    <button
                                        onClick={() => {
                                            setRemoveMember((pre) => ({ ...pre, open: true }));
                                            setIdRemove(item._id);
                                        }}
                                        className="italic"
                                    >
                                        Xóa
                                    </button>
                                )}
                        </div>
                    );
                })}

                {/* <div className="flex items-center justify-between ">
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
                <button className="bg-container w-full py-[3px] rounded-md hover:opacity-60">Xem tất cả</button> */}
            </div>
            <Dialog
                content={'Bạn có muốn rời nhóm'}
                title={'Rời nhóm chát'}
                handleOk={handelOutGroup}
                open={openOut}
                confirmLoading={loadingOut}
                setOpen={setOpenOut}
            />
            {localStorage.profileId !== infoGroup?.groupChat.createdBy && (
                <button
                    className="block w-full text-center py-1 mt-1 bg-white shadow-lg"
                    onClick={() => {
                        setOpenOut(true);
                    }}
                >
                    Thoát nhóm
                </button>
            )}
            <Dialog
                content={'Bạn có chắc chắn muốn xóa nhóm'}
                title={'Xóa nhóm chát'}
                handleOk={handleDeleteGroup}
                open={openDeleteGroup}
                confirmLoading={loadingDeleteGroup}
                setOpen={setOpenDeleteGroup}
            />
            {localStorage.profileId === infoGroup?.groupChat.createdBy && (
                <>
                    <button
                        className="block w-full text-center py-1 mt-1 bg-white shadow-lg"
                        onClick={handleShareGroup}
                    >
                        Copy link
                    </button>
                    <button
                        className="block w-full text-center py-1 mt-1 bg-white shadow-lg"
                        onClick={() => {
                            setOpenDeleteGroup(true);
                        }}
                    >
                        Xóa nhóm
                    </button>
                </>
            )}
        </div>
    );
}

export default MenuChat;
