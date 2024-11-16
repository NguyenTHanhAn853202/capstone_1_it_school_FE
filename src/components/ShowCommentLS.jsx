import { MdExpandMore } from 'react-icons/md';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import CommentLS from './CommentLS';
import SubComment from './SubComment';

function ShowCommentLS({ avatarUrl, username, time, context }) {
    const [isReply, setIsReply] = useState(false);
    const [isSubComment, setIsSubComment] = useState(false);
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
                    <span
                        onClick={() => {
                            setIsSubComment(!isSubComment);
                            console.log(isSubComment);
                        }}
                        className="text-[0.8rem] italic opacity-50 cursor-pointer "
                    >
                        Xem phản hồi
                    </span>
                </div>
                {isSubComment && (
                    <SubComment
                        avatarUrl={avatarUrl}
                        username={'Ngo Thu'}
                        context={'That khong do?'}
                        time={'10 phut'}
                    />
                )}
                {isReply && <CommentLS notAvatar />}
            </div>
        </div>
    );
}

export default ShowCommentLS;
