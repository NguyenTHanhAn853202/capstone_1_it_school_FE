import { Spin } from 'antd';
import { useEffect, useId, useState } from 'react';
import Button from '~/components/Button';
import Container from '~/components/Container';
import ContainerLesson from '~/components/ContainerLesson';
import CreateCourseCom from '~/components/CreateCourseCom';
import Lesson from '~/components/Lesson';
import { useCourse } from '~/context/courseState';
import { useLesson } from '~/context/lesson';
import { get, post } from '~/database';
import { courseValidation } from '~/middleware/course';
import { handleAssignmentXLSX, handleInteractionAssignmentXLSX } from '~/utils/handleAssignment';
import { toastError, toastSuccess } from '~/utils/toasty';

function CreateCourse() {
    const course = useCourse((state) => state.course);
    const lessons = useLesson((state) => state.lessons);
    const clearLessons = useLesson.getState().clearLessons;
    const clearCourse = useCourse.getState().clear;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        clearCourse();
        clearLessons();
    }, []);

    const handlSubmitCourse = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            const validCourse = await courseValidation.validate({
                title: course.title,
                description: course.description,
                price: course.price,
                categoryId: course.categoryId,
                thumbnail: course.thumbnail || undefined,
                level: course.level,
            });
            formData.append('title', course.title);
            formData.append('description', course.description);
            formData.append('price', course.price);
            formData.append('categoryId', course.categoryId);
            formData.append('level', course.level);
            formData.append('image', course.thumbnail);

            const data = await post('/course/create-course', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data?.status !== 'ok') {
                toastError('Đã xãy ra lỗi ở quá trình tạo khoá học');
                return;
            }
            const courseId = data.data._id;
            if (lessons.length > 0) {
                const listLesson = lessons.map((item) => ({ ...item }));
                for (let index = 0; index < listLesson.length; index++) {
                    const element = listLesson[index];
                    const assigment = element.assignment ? await handleAssignmentXLSX(element.assignment) : null;
                    const interactionAssignment = element.interactionAssignment
                        ? await handleInteractionAssignmentXLSX(element.interactionAssignment)
                        : null;
                    element.assigment = assigment;
                    element.interactionAssignment = interactionAssignment;
                }

                const listResponse = [];
                for (let index = 0; index < listLesson.length; index++) {
                    const item = listLesson[index];
                    const formData = new FormData();
                    console.log(item.assigment);
                    console.log(item.video);
                    formData.append('title', item.title);
                    formData.append('courseId', courseId);
                    formData.append('context', item.description);
                    formData.append('quizVideo', JSON.stringify(item.interactionAssignment));
                    formData.append('quizLesson', JSON.stringify(item.assigment));
                    formData.append('video', item.video);
                    formData.append('thumbnail', item.thumbnail);
                    const data = await post('/lesson/create', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    listResponse.push(data);
                }
                // clearLessons();
                // clearCourse();
                const listErr = [];
                listResponse.forEach((item, index) => {
                    if (item?.response || item.status === 'error') listErr.push(index + 1);
                });
                if (listErr.length === 0) {
                    toastSuccess('Xử lý thành công');
                    clearLessons();
                    clearCourse();
                } else {
                    const response = await post('/course/delete-course/' + courseId);
                    toastError('Đã xãy ra lỗi ở bài: ' + listErr.join(', '));
                }
            }
        } catch (error) {
            console.log(error.message);
            toastError(error.message);
        } finally {
            setLoading(false);
            console.log(course);
        }
    };
    return (
        <Container styleChil={'w-[60%] my-5'}>
            <h1 className="font-bold text-12">Tạo khóa học mới</h1>
            <CreateCourseCom />
            <ContainerLesson>
                {lessons.map((_, i) => {
                    return <Lesson numberLesson={i} key={_.id} />;
                })}
            </ContainerLesson>
            <div className="flex justify-end mt-5 pr-5">
                <Button styles="py-2 w-[150px]" onClick={handlSubmitCourse}>
                    {loading ? <Spin /> : 'Đăng'}
                </Button>
            </div>
        </Container>
    );
}

export default CreateCourse;
