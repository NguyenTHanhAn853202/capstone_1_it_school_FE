import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import ShowMore from '~/components/ShowMore';
import Star from '~/components/Star';
import { get, post } from '~/database';
import avatarDefault from '~/public/media/images/default_avatar.jpg';
import { pathname } from '~/routes/pathname';
import { formatPrice } from '~/utils/formatPrice';
import { PATH_MEDIA } from '~/utils/secret';
import { socket } from '~/utils/socket';
import { toastInfo, toastSuccess } from '~/utils/toasty';
const listLessons = ['Làm quen với HTML', 'Làm quen với HTML', 'Làm quen với HTML'];

function CourseInfo() {
    const [toggle, setToggle] = useState(false);
    const { id } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [lessons, setLessons] = useState([]);
    const [totalLessons, setTotalLessons] = useState(0);
    const [isEnroll, setIsEnroll] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const event = `payment-${localStorage.profileId}`;
        const handlePayment = (data) => {
            if (data.code === 100) {
                // toastSuccess('Thanh Toán thành công');
                setIsEnroll(true);
            }
        };
        socket.on(event, handlePayment);
        return () => {
            socket.off(event, handlePayment);
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await get(`/course/get-course/${id}?profileId=${localStorage.profileId || null}`);
                const lessonsResponse = await get(`/lesson/lessons/${id}`);
                if (lessonsResponse.status === 'ok') {
                    const data = lessonsResponse.data;
                    if (data.length > 3) {
                        setLessons([data[0], data[1], data[2]]);
                    } else {
                        setLessons(data);
                    }
                    setTotalLessons(data.length);
                }
                console.log(response);

                if (response.status === 'ok') {
                    setCourseInfo(response.data.course);
                    setIsEnroll(response.data.enroll);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleEnroll = async () => {
        if (!localStorage.profileId) {
            navigate(pathname.EXPERIENCE);
            return;
        }
        if (isEnroll) {
            console.log(lessons[0]);
            lessons[0]?._id ? navigate('/lesson/' + lessons[0]?._id) : toastInfo('Khóa học chưa có bài học nào');
        } else {
            if (+courseInfo.price === 0) {
                // backend implementing
                const pay = await post('/payment/free/' + courseInfo._id);
                if (pay.status === 'ok') {
                    setIsEnroll(true);
                    toastSuccess('Đăng ký thành công');
                }
                console.log(pay);

                return;
            }
            const response = await get(`/payment/vnpay?amount=${courseInfo.price}&bankOrder=${courseInfo._id}`);
            response.status === 'ok' && window.open(response.data.url, '_blank');
        }
    };

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
                        <Avatar size={50} alt={'avatar'} src={`${PATH_MEDIA}/${courseInfo?.instructor?.avatar}`} />
                        <div>
                            <strong>{courseInfo?.instructor?.name}</strong>
                            <br />
                            <span>Giang Vien</span>
                        </div>
                    </div>
                    {courseInfo?.star === 0 ? <p>Chưa có đánh giá</p> : <Star starNumber={courseInfo?.star} />}
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
                                <p>{`${index + 1}. ${item?.title}`}</p>
                            </li>
                        ))}
                        {totalLessons > 3 && (
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
                    {courseInfo?.image && (
                        <img
                            src={`${PATH_MEDIA}/${courseInfo?.image}`}
                            className="w-[290px] h-[180px] block object-cover m-auto"
                        />
                    )}
                    <h4 className="text-center text-red font-bold">{`Giá: ${formatPrice(courseInfo?.price)}VNĐ`}</h4>
                    <div className="flex justify-center">
                        <Button onClick={handleEnroll}>{isEnroll ? 'Đến khóa học' : 'Đăng ký ngay'}</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseInfo;
