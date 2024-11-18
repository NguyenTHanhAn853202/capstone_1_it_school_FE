import { MdExpandMore, MdMoreVert } from 'react-icons/md';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import CommentLS from './CommentLS';
import SubComment from './SubComment';
import { post } from '~/database';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Tooltip } from 'antd';
import Dialog from './Dialog';

function ShowCommentLS({ avatarUrl, username, time, context, commentId, numberReply, profileId }) {
    const [isReply, setIsReply] = useState(false);
    const [isSubComment, setIsSubComment] = useState(false);
    const [reply, setReply] = useState('');
    const [isReloadReply, setIsReloadReply] = useState(false);
    const [numReply, setNumReply] = useState(numberReply);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await post('/user/reply', {
                reply: reply,
                commentId: commentId,
            });
            response.status === 'ok' && setIsSubComment(true);
            response.status === 'ok' && setNumReply((pre) => pre + 1);
            setIsReloadReply(!isReloadReply);
        } catch (error) {
            console.log(error.message);
        } finally {
            setReply('');
        }
    };

    const handleDeleteComment = async () => {
        try {
            const deleteComment = await post('/user/delete-comment/:' + commentId);
            console.log(deleteComment);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex space-x-2 w-full">
            <Avatar styles={'!size-[30px]'} url={avatarUrl} />
            <div className="flex-1">
                <h3 className="font-bold">
                    {username} <span className="font-light opacity-60 ml-4 text-[0.8rem]">{time}</span>
                </h3>
                <p className="text-[0.9rem]">{context}</p>
                <div className="mb-1">
                    <span
                        onClick={() => {
                            setIsReply(!isReply);
                        }}
                        className="text-[0.8rem] italic opacity-50 cursor-pointer mr-3"
                    >
                        Phản hồi
                    </span>
                    {numReply > 0 && (
                        <span
                            onClick={() => {
                                setIsSubComment(!isSubComment);
                                console.log(isSubComment);
                            }}
                            className="text-[0.8rem] italic opacity-50 cursor-pointer "
                        >
                            Xem phản hồi ({numReply})
                        </span>
                    )}
                </div>
                {isSubComment && (
                    <SubComment
                        isReloadReply={isReloadReply}
                        commentId={commentId}
                        avatarUrl={avatarUrl}
                        username={'Ngo Thu'}
                        context={'That khong do?'}
                        time={'10 phut'}
                        setNumReply={setNumReply}
                    />
                )}
                {isReply && (
                    <form onSubmit={(e) => handleSubmitComment(e)} className="flex items-end space-x-2 pb-3">
                        <div className="border-b border-b-dark w-full">
                            <input
                                value={reply}
                                onChange={(e) => {
                                    setReply(e.target.value);
                                }}
                                placeholder={'Nhập bình luận'}
                                className="border-b border-b-2 border-b-dark w-full text-[0.9rem]"
                            />
                        </div>
                        <input
                            type="submit"
                            className="px-4 py-[2px] cursor-pointer  bg-button_green rounded-lg text-white text-[0.9rem]"
                            value={'Gửi'}
                        />
                    </form>
                )}
            </div>
            {profileId === localStorage.profileId && (
                <div className="text-12 flex items-center">
                    <Dialog
                        confirmLoading={confirmLoading}
                        content={'Bạn có muốn xóa bình luận'}
                        title={'Xóa bình luận'}
                        handleOk={handleDeleteComment}
                    />
                    <Tooltip title="Xóa">
                        <button>
                            <RiDeleteBinLine />
                        </button>
                    </Tooltip>
                </div>
            )}
        </div>
    );
}

export default ShowCommentLS;
