import { useEffect, useState } from 'react';
import CardCourse from '~/components/CardCourse';
import { get } from '~/database';

const arr = new Array(10).fill(0);
function MyCourse() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getCourses = async () => {
            const response = await get('/course/my-courses');
            if (response.status === 'ok') {
                setCourses(response.data);
            }
        };
        getCourses();
    }, []);
    return (
        <div>
            <h1 className="text-12 font-bold">Khóa học của tôi</h1>
            <div className="flex flex-wrap">
                {courses.map((data, index) => (
                    <div key={index} className="w-[48%] my-2 mr-2 ml-2 ">
                        <CardCourse data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCourse;
