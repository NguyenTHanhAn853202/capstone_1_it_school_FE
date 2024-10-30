import avatarDefault from '~/public/media/images/default_avatar.jpg';
import Avatar from './Avatar';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import hiddenText from '~/utils/hiddenText';
import Star from './Star';
import { PATH_MEDIA } from '~/utils/secret';

function ShowComment({ username, avatar, context, isFeedback = false, starNumber }) {
    const commentRef = useRef();
    const [showMore, setShowMore] = useState(false);

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
                <div className="flex items-end space-x-1 self-center">
                    <button>
                        <AiOutlineLike className="text-normal " />
                    </button>
                    <button className="font-light text-[0.9rem] opacity-70 italic">Phản hồi</button>
                </div>
            </div>
        </div>
    );
}

export default ShowComment;
