import CommentLS from './CommentLS';
import avatar from '~/public/media/images/default_avatar.jpg';
import ShowCommentLS from './ShowCommentLS';
import ShowMore from './ShowMore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';

function CommentLesson({}) {
    const [showMore, setShowMore] = useState(false);

    const [{ comments, count }, setComments] = useState({
        comments: [],
        count: 0,
    });

    const [page, setPage] = useState(1);
    const lessonId = useParams().id;
    useEffect(() => {
        (async () => {
            setComments({ comments: [], count: 0 });
            try {
                const response = await get(`/user/get-comments/${lessonId}?page=1`);
                response.status = 'ok' && setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [lessonId]);
    console.log(comments[0]?.comment);

    const hanldeMoreComment = async () => {
        if (!showMore) {
            const response = await get(`/user/get-comments/${lessonId}?page=${page + 1}`);
            response.status === 'ok' &&
                setComments((pre) => {
                    return {
                        comments: [...pre.comments, ...response.data.comments],
                        count: pre.count,
                    };
                });
            setPage(page + 1);
        } else {
            const response = await get(`/user/get-comments/${lessonId}?page=1`);
            response.status = 'ok' && setComments(response.data);
            setPage(1);
        }
    };
    useEffect(() => {
        setShowMore(count === comments.length);
    }, [count, comments.length]);

    return (
        <div className="rounded-xl space-y-4">
            <h1 className="font-bold text-12">{count} bình luận</h1>
            <CommentLS setComments={setComments} avatar={avatar} />
            <div className="mt-4"></div>
            <div className="space-y-2">
                {comments.map((item) => (
                    <ShowCommentLS
                        key={item._id}
                        commentId={item?.comment?._id}
                        numberReply={item?.comment?.numberReply}
                        avatarUrl={`${PATH_MEDIA}${item?.comment?.profile?.avatar}`}
                        profileId={item?.comment?.profile?._id}
                        context={item?.comment?.comment}
                        time={'16 giờ'}
                        username={item?.comment?.profile?.name}
                    />
                ))}

                {count > 5 && (
                    <ShowMore onClick={hanldeMoreComment} title={showMore ? 'Đóng' : 'Xem thêm'} more={showMore} />
                )}
            </div>
        </div>
    );
}

export default CommentLesson;
