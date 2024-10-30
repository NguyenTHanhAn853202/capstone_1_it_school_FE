import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import ShowMore from '~/components/ShowMore';
import Star from '~/components/Star';
import { get } from '~/database';
import avatarDefault from '~/public/media/images/default_avatar.jpg';
import { formatPrice } from '~/utils/formatPrice';
import { PATH_MEDIA } from '~/utils/secret';

const listLessons = ['Làm quen với HTML', 'Làm quen với HTML', 'Làm quen với HTML'];

function CourseInfo() {
    const [toggle, setToggle] = useState(false);
    const { id } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await get(`/course/get-course/${id}`);
                console.log(response);

                const lessonsResponse = await get(`/lesson/lessons/${id}`);
                if (lessonsResponse.status === 'ok') {
                    const data = lessonsResponse.data;
                    if (data.length > 3) {
                        setLessons([data[0], data[1], data[2]]);
                    } else {
                        setLessons(data);
                    }
                }
                response.status === 'ok' && setCourseInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleMoreLessons = async () => {
        const lessonsResponse = await get(`/lesson/lessons/${id}`);
        if (!toggle) {
            lessonsResponse.status === 'ok' && setLessons(lessonsResponse.data);
        } else {
            const data = lessonsResponse.data;
            if (data.length > 3) {
                setLessons([data[0], data[1], data[2]]);
            } else {
                setLessons(data);
            }
        }
        setToggle(!toggle);
    };

    return (
        <>
            <h1 className="text-center font-bold text-normal mb-5">Thôn tin khóa học</h1>
            <div className="flex justify-between gap-4">
                <div className="w-[55%] space-y-2">
                    <div className="flex gap-2 items-center">
                        <Avatar alt={'avatar'} url={avatarDefault} />
                        <div>
                            <strong>{courseInfo?.instructor?.name}</strong>
                            <br />
                            <span>Giang Vien</span>
                        </div>
                    </div>
                    <Star starNumber={4} />
                    <p className="flex ">
                        <strong className="block min-w-[80px]">Khóa học: </strong>
                        <span>{courseInfo?.title}</span>
                    </p>
                    <div className="flex">
                        <strong className="block min-w-[50px]">Mô tả: </strong>
                        <div dangerouslySetInnerHTML={{ __html: courseInfo?.description || '' }} />
                    </div>
                    <ul className="space-x-5">
                        <ul>
                            <strong>Nội dung bài học:</strong>
                        </ul>
                        {lessons.map((item, index) => (
                            <li key={index}>
                                <Link>{`${index + 1}. ${item?.title}`}</Link>
                            </li>
                        ))}
                        {lessons.length > 3 && (
                            <li>
                                <ShowMore
                                    onClick={handleMoreLessons}
                                    more={toggle}
                                    title={toggle ? 'Ẩn bớt' : 'Xem tất cả'}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex-1 space-y-3">
                    <img
                        src={`${PATH_MEDIA}/${courseInfo?.image}`}
                        className="w-[290] h-[180] block object-cover m-auto"
                    />
                    <h4 className="text-center text-red font-bold">{`Giá: ${formatPrice(courseInfo?.price)}VNĐ`}</h4>
                    <div className="flex justify-center">
                        <Button>Đăng ký ngay</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseInfo;
