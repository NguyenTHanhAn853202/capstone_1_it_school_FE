import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Container from '~/components/Container';
import ContainerLesson from '~/components/ContainerLesson';
import CreateCourseCom from '~/components/CreateCourseCom';
import EditLesson from '~/components/EditLesson';
import { useCourse } from '~/context/courseState';
import { useLesson, useUpdateLesson } from '~/context/lesson';
import { get } from '~/database';

function EditCourse() {
    const { updateTitle, updateDescription, updatePrice, updateLevel, updateThumbnail, updateCategory } = useCourse(
        (state) => ({
            updateTitle: state.updateTitle,
            updateDescription: state.updateDescription,
            updatePrice: state.updatePrice,
            updateLevel: state.updateLevel,
            updateThumbnail: state.updateThumbnail,
            updateCategory: state.updateCategory,
        }),
    );
    const { id } = useParams();
    const [lessonstitle, setLessonsTitle] = useState([]);

    useEffect(() => {
        (async () => {
            const resCourse = get(`/course/get-course/${id}`);
            if (resCourse?.data) {
                const data = resCourse.data;
                updateTitle(data?.title);
                updateCategory(data?.category);
                updatePrice(data?.price);
                updateDescription(data?.description);
                updateLevel(data?.level);
                updateThumbnail(data?.image);
            }
            const titleLesson = await get('/lesson/lessons/' + id);
            titleLesson?.data && setLessonsTitle(titleLesson.data);
        })();
    }, [id]);

    console.log(lessonstitle);

    return (
        <Container styleChil={'w-[60%] my-5'}>
            <h1 className="font-bold text-12">Chỉnh sửa khoá học</h1>
            <CreateCourseCom />
            <ContainerLesson styles={'!p-0'}>
                {lessonstitle.map((item, index) => (
                    <EditLesson
                        numberLesson={index}
                        title={item.title}
                        lessonId={item._id}
                        setLessonsTitle={setLessonsTitle}
                    />
                ))}
            </ContainerLesson>
            <div className="flex justify-end mt-5 pr-5">
                <Button styles="py-2 w-[150px]">Đăng</Button>
            </div>
        </Container>
    );
}

export default EditCourse;
