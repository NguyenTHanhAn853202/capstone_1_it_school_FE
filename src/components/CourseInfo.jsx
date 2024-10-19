import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import ShowMore from '~/components/ShowMore';
import Star from '~/components/Star';
import avatarDefault from '~/public/media/images/default_avatar.jpg';
import thambnail from '~/public/media/images/logo_node_react.png';

const listLessons = ['Làm quen với HTML', 'Làm quen với HTML', 'Làm quen với HTML'];

function CourseInfo() {
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <h1 className="text-center font-bold text-normal mb-5">Thôn tin khóa học</h1>
            <div className="flex justify-between gap-4">
                <div className="w-[55%] space-y-2">
                    <div className="flex gap-2 items-center">
                        <Avatar alt={'avatar'} url={avatarDefault} />
                        <div>
                            <strong>Nguyen thanh an</strong>
                            <br />
                            <span>Giang Vien</span>
                        </div>
                    </div>
                    <Star starNumber={4} />
                    <p className="flex ">
                        <strong className="block min-w-[80px]">Khóa học: </strong>
                        <span>HTML CSS cơ bản</span>
                    </p>
                    <p className="flex">
                        <strong className="block min-w-[50px]">Mô tả: </strong>
                        <span>
                            Đây là khóa học HTML CSS rất đầy đủ và chi tiết, phù hợp cho dù bạn là người chưa từng biết
                            tới HTML CSS.
                        </span>
                    </p>
                    <ul className="space-x-5">
                        <ul>
                            <strong>Nội dung bài học:</strong>
                        </ul>
                        {listLessons.map((item, index) => (
                            <li>
                                <Link>{`${index + 1}. ${item}`}</Link>
                            </li>
                        ))}
                        <li>
                            <ShowMore
                                onClick={() => setToggle(!toggle)}
                                more={toggle}
                                title={toggle ? 'Ẩn bớt' : 'Xem tất cả'}
                            />
                        </li>
                    </ul>
                </div>
                <div className="flex-1 space-y-3">
                    <img src={thambnail} className="w-[290] h-[180] block object-cover m-auto" />
                    <h4 className="text-center text-red font-bold">{`Giá: 200.000 VNĐ`}</h4>
                    <div className="flex justify-center">
                        <Button>Đăng ký ngay</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseInfo;
