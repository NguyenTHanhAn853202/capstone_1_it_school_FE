import { Button, Carousel, Descriptions, Spin } from 'antd';
import slider1 from '~/public/media/images/home-slider1.png';
import slider2 from '~/public/media/images/home-slider-2.png';
import CardAd from '~/components/Card';
import sampleImage from '~/public/media/images/logo_node_react.png';
import { useEffect, useState } from 'react';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';
import '~/styles/Carousel.scss';

const sliders = [
    {
        title: 'ITSchool',
        description: 'Lập trình từ cơ bản đến nâng cao - Học và thành công cùng chúng tôi!',
        image: slider1,
    },
    {
        title: 'Javascript cơ bản',
        description: 'Học trực tiếp mọi lúc, mọi nơi và bài tập thực tế!',
        image: slider2,
    },
];

function HomePage() {
    const [containAll, setContainAll] = useState([
        {
            title: 'Khóa học nổi bật',
            courses: [],
        },
        {
            title: 'Khóa học mới',
            courses: [],
        },
        {
            title: 'Khóa học miễn phí',
            courses: [],
        },
        {
            title: 'Khóa học phổ biến',
            courses: [],
        },
    ]);
    useEffect(() => {
        (async () => {
            const responses = [
                get('/course/new-courses'),
                get('/course/hot-courses'),
                get('/course/free-courses'),
                get('/course/common-star-courses'),
            ];
            const [newC, hot, free, popular] = await Promise.all(responses);
            setContainAll([
                {
                    title: 'Khóa học nổi bật',
                    courses: hot.data,
                },
                {
                    title: 'Khóa học mới',
                    courses: newC.data,
                },
                {
                    title: 'Khóa học miễn phí',
                    courses: free.data,
                },
                {
                    title: 'Khóa học phổ biến',
                    courses: popular.data,
                },
            ]);
        })();
    }, []);
    return (
        <div className="space-y-4">
            <div>
                <Carousel className="h-[300px] overflow-hidden" arrows infinite={true}>
                    {sliders.map((item, index) => (
                        <div key={index} className="h-[300px] relative">
                            <div className="absolute z-30 top-1/2 -translate-y-1/2 ml-6">
                                <h1 className="text-[40px] font-bold">{item.title}</h1>
                                <p className="text-12 font-bold">{item.description}</p>
                                <Button className="mt-2">Tham gia ngay</Button>
                            </div>
                            <img className="absolute object-fill w-full h-full" src={item.image} />
                        </div>
                    ))}
                </Carousel>
            </div>
            {containAll.map((item, index) => {
                if (item.courses.length === 0 && index === 0)
                    return (
                        <div className="flex mt-3 justify-center">
                            <Spin />
                        </div>
                    );
                if (item.courses.length === 0) return <></>;
                return (
                    <div key={index}>
                        <h1 className="font-bold text-12 mb-2">{item.title}</h1>
                        <Carousel className="flex justify-center space-x-2" arrows slidesToShow={4}>
                            {item.courses.map((item, index) => (
                                <div className="ml-2">
                                    <CardAd
                                        courseId={item._id}
                                        key={index}
                                        star={item?.star}
                                        viewers={item?.studentNumber}
                                        image={`${PATH_MEDIA}${item?.image}`}
                                        price={item?.price}
                                        title={item?.title}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                );
            })}
        </div>
    );
}

export default HomePage;
