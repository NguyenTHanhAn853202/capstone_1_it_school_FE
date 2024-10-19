import ShowComment from '~/components/ShowComment';
import Container from '~/components/Container';
import CourseInfo from '~/components/CourseInfo';
import Line from '~/components/Line';
import ShowMore from '~/components/ShowMore';
import Comment from '~/components/Comment';

function CourseInformation() {
    return (
        <Container style="py-5">
            <CourseInfo />
            <Line style="my-4" />
            <div className="space-y-4 w-full">
                <h2 className="font-light text-normal text-center">Đánh giá</h2>
                <ShowComment isFeedback username={'Nguyen Thanh An'} context={'Đây là khóa học HTML CSS '} />
                <ShowComment
                    isFeedback
                    username={'Nguyen Thanh An'}
                    context={
                        'Đây là khóa học HTML CSS rất đầy đủ và chi tiết, phù hợp cho dù bạn là người chưa từng biết tới HTML CSS.'
                    }
                />
                <ShowComment
                    isFeedback
                    username={'Nguyen Thanh An'}
                    context={
                        'Đây là khóa học HTML CSS rất đầy đủ và chi tiết, phù hợp cho dù bạn là người chưa từng biết tới HTML CSS.'
                    }
                />
                <div className="flex justify-center">
                    <div className="w-[70%]">
                        <ShowMore title={'Xem thêm'} />
                    </div>
                </div>
            </div>
            <Line style="my-4" />
            <Comment />
        </Container>
    );
}

export default CourseInformation;
