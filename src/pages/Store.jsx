import slider1 from '~/public/media/images/home-slider1.png';
import slider2 from '~/public/media/images/home-slider-2.png';
import { Button, Carousel, Checkbox, Flex, Pagination, Select } from 'antd';
import CourseStore from '~/components/CourseStore';
import { useEffect, useState } from 'react';
import { get } from '~/database';

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

const limit = 12;
function Store() {
    const [level, setLevel] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberPage, setNumberPage] = useState(10);
    useEffect(() => {
        (async () => {
            const response = await get(
                `/course/search-course?level=${level.join(',')}&category=${filterCategory.join(
                    ',',
                )}&title=${title}&sort=${sort}&limit=${limit}&currentPage=${currentPage}`,
            );
            if (response.status === 'ok') {
                setCourses(response.data.courses || []);
                setNumberPage(response.data.numberPage * 10);
            }
        })();
    }, [JSON.stringify(level), JSON.stringify(filterCategory), title, sort, currentPage]);
    useEffect(() => {
        (async () => {
            const response = await get('/category');
            response?.status === 'ok' && setCategory(response.data);
        })();
    }, []);

    console.log(numberPage);

    return (
        <div>
            <Carousel className="h-[200px] overflow-hidden" arrows infinite={true}>
                {sliders.map((item, index) => (
                    <div key={index} className="h-[200px] relative">
                        <div className="absolute z-30 top-1/2 -translate-y-1/2 ml-6">
                            <h1 className="text-[40px] font-bold">{item.title}</h1>
                            <p className="text-12 font-bold">{item.description}</p>
                            <Button className="mt-2">Tham gia ngay</Button>
                        </div>
                        <img className="absolute object-fill w-full h-full" src={item.image} />
                    </div>
                ))}
            </Carousel>
            <div className="flex justify-center">
                <div className="w-[700px] bg-[rgba(242,245,248,0.8)] rounded-xl flex justify-between items-center h-[60px] relative -top-4 px-5">
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        type="text"
                        className="w-[400px] rounded-lg font-normal h-[35px] text-10 px-2"
                        placeholder="--Tìm kiếm--"
                    />

                    <div className="space-x-2">
                        <Button
                            onClick={() => {
                                setTitle('');
                                setSearch('');
                            }}
                        >
                            Xóa
                        </Button>
                        <Button
                            onClick={() => {
                                setTitle(search);
                            }}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border border-black w-[70%] m-auto rounded-xl overflow-hidden">
                <h2 className="px-3 text-12 font-bold bg-container">Lọc</h2>
                <div className="px-3 py-2">
                    <h4 className="font-bold">Danh mục khóa học:</h4>
                    <Checkbox.Group
                        className="ml-3 mt-2"
                        options={category.map((item) => {
                            return {
                                label: <p className="text-10 font-medium">{item.name}</p>,
                                value: item._id,
                                disabled: false,
                            };
                        })}
                        onChange={(value) => {
                            setFilterCategory(value);
                        }}
                    />
                    <h4 className="font-bold mt-2">Mức độ:</h4>
                    <Checkbox.Group
                        className="ml-3 space-x-4 mt-2"
                        onChange={(value) => {
                            setLevel(value);
                        }}
                        options={[
                            { label: <p className="text-10 font-medium">Dễ</p>, value: 'ELEMENTARY' },
                            { label: <p className="text-10 font-medium">Trung bình</p>, value: 'INTERMEDIATE' },
                            { label: <p className="text-10 font-medium">Khó</p>, value: 'ADVANCED' },
                        ]}
                    />

                    <Select
                        className="w-[200px] block text-12 mt-2"
                        onChange={(value) => setSort(value)}
                        defaultValue={''}
                        options={[
                            {
                                label: 'Giá',
                                value: '',
                            },
                            {
                                label: 'Tăng dần',
                                value: 'asc',
                            },
                            {
                                label: 'Giảm dần',
                                value: 'desc',
                            },
                        ]}
                    ></Select>
                </div>
            </div>
            <Flex className="mt-4" wrap gap="middle" justify="left">
                {courses.map((item, index) => (
                    <CourseStore key={index + item.star} data={item} />
                ))}
            </Flex>
            {courses.length === 0 && <h1 className="mt-6 text-center">Không tìm thấy khóa học nào</h1>}
            {numberPage > 10 && (
                <Pagination
                    className="mt-3"
                    onChange={(e) => {
                        setCurrentPage(e);
                    }}
                    defaultCurrent={1}
                    total={numberPage}
                />
            )}
        </div>
    );
}

export default Store;
