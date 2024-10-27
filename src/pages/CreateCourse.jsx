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
import { toastError, toastSuccess } from '~/utils/toasty';

function CreateCourse() {
    const course = useCourse((state) => state.course);
    const lessons = useLesson((state) => state.lessons);

    const handlSubmitCourse = async () => {
        try {
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
            console.log(data);
        } catch (error) {
            toastError(error.message);
        } finally {
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
                    Đăng
                </Button>
            </div>
        </Container>
    );
}

export default CreateCourse;
