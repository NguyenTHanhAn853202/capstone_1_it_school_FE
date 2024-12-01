import { Link } from 'react-router-dom';
import image from '~/public/media/images/backgroup_lady_page.jpg';
import { pathname } from '~/routes/pathname';
import Button from './Button';
import { PATH_MEDIA } from '~/utils/secret';
function CardCourse({ lessonId, data }) {
    console.log(data);

    return (
        <div className="flex space-x-3 rounded-xl overflow-hidden border border-mark items-center">
            <img src={PATH_MEDIA + data.image} className="block w-[230px] h-[130px] object-fill" />
            <div className="space-y-[1px]">
                <h2 className="truncate text-10 font-bold">{data.title}</h2>
                <div className="flex items-center space-x-2">
                    <p>Instructor: {data.instructor.name}</p>
                </div>
                <h2 className="text-10">{data.count} bài</h2>
                <Link
                    className="bg-button_green block w-[100px] rounded-md h-[35px] text-center leading-[35px] !mt-2 text-white"
                    to={pathname.LESSON + '/' + data.firstLesson?._id}
                >
                    Học tập
                </Link>
            </div>
        </div>
    );
}

export default CardCourse;
