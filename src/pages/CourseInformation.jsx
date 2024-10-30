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

const pageNumber = 1;
function CourseInformation() {
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
    }, [id]);

    const handleSubmitComment = async () => {
        try {
            const value = await rateValidation.validate({ rate: starNumber, comment: textComment, courseId: id });
            const response = await post('/rate/create-rate', value);
            response?.status === 'ok' && toastSuccess('Tạo đánh giá thành công');
            response?.response?.data?.message && toastError('Đã xãy ra lỗi vui lòng thử lại');
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

                {comments.map((item, index) => (
                    <ShowComment
                        key={index}
                        isFeedback
                        username={item?.profile?.name}
                        context={item.comment}
                        starNumber={item.rate}
                        avatar={item?.profile?.avatar}
                    />
                ))}
                {hasMore && (
                    <div className="flex justify-center">
                        <div className="w-[70%]">
                            <ShowMore title={'Xem thêm'} />
                        </div>
                    </div>
                )}
            </div>
            {comments.length > 0 && <Line style="my-4" />}
            <Comment
                starNumber={starNumber}
                setStarNumber={setStarNumber}
                textComment={textComment}
                setTextComment={setTextComment}
                onClick={handleSubmitComment}
            />
        </Container>
    );
}

export default CourseInformation;
