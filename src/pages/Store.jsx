import slider1 from '~/public/media/images/home-slider1.png';
import slider2 from '~/public/media/images/home-slider-2.png';
import { Button, Carousel, Checkbox, Flex, Select } from 'antd';
import CourseStore from '~/components/CourseStore';

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

const data = [
    {
        image: slider2,
        title: 'Bai hoc cua nguyen thanh an',
        price: 1000000,
        viewers: 56,
        star: 4,
        courseId: '',
    },
    {
        image: slider2,
        title: 'Bai hoc cua nguyen thanh an',
        price: 1000000,
        viewers: 56,
        star: 4,
        courseId: '',
    },
    {
        image: slider2,
        title: 'Bai hoc cua nguyen thanh an',
        price: 1000000,
        viewers: 56,
        star: 4,
        courseId: '',
    },
    {
        image: slider2,
        title: 'Bai hoc cua nguyen thanh an',
        price: 1000000,
        viewers: 56,
        star: 4,
        courseId: '',
    },
    {
        image: slider2,
        title: 'Bai hoc cua nguyen thanh an',
        price: 1000000,
        viewers: 56,
        star: 4,
        courseId: '',
    },
];

function Store() {
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
                        type="text"
                        className="w-[400px] rounded-lg font-normal h-[35px] text-10 px-2"
                        placeholder="--Tìm kiếm--"
                    />
                    <Button>Tìm kiếm</Button>
                </div>
            </div>
            <div className="border border-black w-[70%] m-auto rounded-xl overflow-hidden">
                <h2 className="px-3 text-12 font-bold bg-container">Lọc</h2>
                <div className="px-3 py-2">
                    <h4 className="font-bold">Danh mục khóa học:</h4>
                    <Checkbox.Group
                        className="ml-3 space-x-4 mt-2"
                        options={[
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Apple',
                            },
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Pear',
                            },
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Orange',
                                disabled: false,
                            },
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Orange',
                                disabled: false,
                            },
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Orange',
                                disabled: false,
                            },
                            {
                                label: <p className="text-10 font-medium">Apple</p>,
                                value: 'Orange',
                                disabled: false,
                            },
                        ]}
                        onChange={(e) => {
                            console.log(e);
                        }}
                    />
                    <h4 className="font-bold mt-2">Mức độ:</h4>
                    <Checkbox.Group
                        className="ml-3 space-x-4 mt-2"
                        options={[
                            { label: <p className="text-10 font-medium">Dễ</p>, value: 'Apple' },
                            { label: <p className="text-10 font-medium">Trung bình</p>, value: 'Pear' },
                            { label: <p className="text-10 font-medium">Khó</p>, value: 'Orange' },
                        ]}
                    />
                    <Select
                        className="w-[200px] block text-12 mt-2"
                        onChange={(value) => console.log(value)}
                        defaultValue={0}
                        options={[
                            {
                                label: 'Giá',
                                value: 0,
                            },
                            {
                                label: 'Tăng dần',
                                value: -1,
                            },
                            {
                                label: 'Giảm dần',
                                value: 1,
                            },
                        ]}
                    ></Select>
                </div>
            </div>
            <Flex className='mt-4' wrap gap="middle" justify="left">
                {data.map((item, index) => (
                    <CourseStore key={index} data={item} />
                ))}
            </Flex>
        </div>
    );
}

export default Store;
