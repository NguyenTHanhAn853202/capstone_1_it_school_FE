import avatarDefault from '~/public/media/images/default_avatar.jpg';
import Avatar from './Avatar';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import hiddenText from '~/utils/hiddenText';
import Star from './Star';
import { PATH_MEDIA } from '~/utils/secret';
import Dialog from './Dialog';
import { post } from '~/database';
import { toastError, toastSuccess } from '~/utils/toasty';
import { useParams } from 'react-router-dom';

function ShowComment({
    username,
    avatar,
    context,
    isFeedback = false,
    starNumber,
    canRemove = false,
    rateId = '',
    setComments,
}) {
    const commentRef = useRef();
    const [showMore, setShowMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { id } = useParams();

    const handleClickOk = async () => {
        try {

            setConfirmLoading(true);
            if (!rateId) return toastError('Đã xãy ra lỗi trong quá trình xử lý');
            const response = await post(`/rate/delete-rate/${rateId}`, {
                courseId: id,
            });
            if (response?.status === 'ok') {
                setComments((pre) => {
                    const hasMore = pre.hasMore;
                    const newComments = pre.comments.filter((item) => item._id !== rateId);
                    console.log(newComments);

                    return { hasMore, comments: newComments };
                });
                toastError('Xoá thành công');
            } else {
                toastError('Đã xãy ra lỗi trong quá trình xử lý');
            }
            setOpen(false);
            setConfirmLoading(false);
        } catch (error) {
            toastError('Đã xãy ra lỗi trong quá trình xử lý');
            setOpen(false);
            setConfirmLoading(false);
        }
    };

    useEffect(() => {
        setShowMore(hiddenText(commentRef.current));
    }, [hiddenText(commentRef.current)]);
    return (
        <div className="flex gap-4 items-center w-[70%] m-auto h-[90px]">
            <Avatar url={`${PATH_MEDIA}/${avatar}`} />
            <div className="border h-full gap-4 flex-1 overflow-hidden justify-between border-spacing-[1px] border-border px-[10px] py-[15px] bg-mark shadow-md rounded-lg flex ">
                <div className="w-[80%]">
                    <div className="flex items-center gap-2">
                        <h4 className="font-black self-start">{username}</h4>
                        {isFeedback && <Star starNumber={starNumber} />}
                    </div>
                    <p ref={commentRef} className="text-[0.9rem] truncate text-ellipsis mt-[3px]">
                        {context}
                    </p>
                    {showMore && <button className="italic text-[0.8rem] font-light opacity-60">Xem thêm</button>}
                </div>
                {canRemove && (
                    <div className="flex items-end space-x-1 self-center mr-1">
                        <button
                            onClick={() => setOpen(true)}
                            className="italic text-[0.8rem] underline hover:opacity-55"
                        >
                            Xoá
                        </button>
                        <Dialog
                            open={open}
                            setOpen={setOpen}
                            confirmLoading={confirmLoading}
                            content={'Bạn có chắc chắn muốn xoá đánh giá'}
                            title={'Xoá đánh giá'}
                            handleOk={handleClickOk}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowComment;
