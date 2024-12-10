import ShowComment from '~/components/ShowComment';
import Container from '~/components/Container';
import CourseInfo from '~/components/CourseInfo';
import Line from '~/components/Line';
import ShowMore from '~/components/ShowMore';
import Comment from '~/components/Comment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get, post } from '~/database';
import { toastError, toastSuccess } from '~/utils/toasty';
import { rateValidation } from '~/middleware/rate';

function CourseInformation() {
    const [pageNumber, setPageNumber] = useState(1);
    const { id } = useParams();
    const [starNumber, setStarNumber] = useState(0);
    const [textComment, setTextComment] = useState('');
    const [{ hasMore, comments }, setComments] = useState({
        hasMore: false,
        comments: [],
    });
    useEffect(() => {
        (async () => {
            const response = await get(`/rate/list-rate/${id}?page=${pageNumber}`);
            if (response.status === 'ok') {
                const data = response.data;
                setComments({
                    hasMore: data.hasMore,
                    comments: data.listRateCourse,
                });
            }
        })();
    }, [id, pageNumber]);

    console.log(comments, hasMore);

    const handleSubmitComment = async () => {
        try {
            const value = await rateValidation.validate({ rate: starNumber, comment: textComment, courseId: id });
            const response = await post('/rate/create-rate', value);
            if (response?.status === 'ok') {
                setComments((pre) => {
                    const newComment = [...comments];
                    if (comments.length >= 5) {
                        newComment.pop();
                    }
                    newComment.unshift(response.data);
                    return { ...pre, comments: newComment };
                });
                setTextComment('');
                setStarNumber(0);
                toastSuccess('Tạo đánh giá thành công');
            }
            response?.response?.data && toastError('Đã xãy ra lỗi vui lòng thử lại');
        } catch (error) {
            toastError(error.message);
        }
    };

    return (
        <Container style="py-5">
            <CourseInfo />
            <Line style="my-4" />
            <div className="space-y-4 w-full">
                <h2 className="font-light text-normal text-center">Đánh giá</h2>
                <Comment
                    starNumber={starNumber}
                    setStarNumber={setStarNumber}
                    textComment={textComment}
                    setTextComment={setTextComment}
                    onClick={handleSubmitComment}
                />
                <div className="py-1"></div>
                {comments.map((item, index) => (
                    <ShowComment
                        rateId={item?._id}
                        key={item?.id}
                        isFeedback
                        username={item?.profile?.name}
                        context={item.comment}
                        starNumber={item.rate}
                        avatar={item?.profile?.avatar}
                        setComments={setComments}
                        canRemove={item?.profile?._id === localStorage?.profileId}
                    />
                ))}
                {(hasMore || pageNumber > 1) && (
                    <div className="flex justify-center">
                        <div className="w-[70%]">
                            <ShowMore
                                onClick={() => {
                                    if (hasMore) {
                                        setPageNumber(pageNumber + 1);
                                    } else setPageNumber(1);
                                }}
                                more={!hasMore}
                                title={!hasMore ? 'Ẩn bớt' : 'Xem thêm'}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default CourseInformation;
