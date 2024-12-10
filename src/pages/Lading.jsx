import classnames from 'classnames/bind';
import style from '~/styles/LadingPage.module.scss';
import logo from '~/public/media/images/logo.png';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import mainLading from '~/public/media/images/main_lading_page.png';
import LoginRegister from './LoginRegister';
import { useState } from 'react';
import Container from '~/components/Container';
import InstructorRegister from './InstructorRegister';

const cx = classnames.bind(style);

function Lading() {
    const [enjoin, setEnjoin] = useState({ value: null });
    const [instructor, setInstructor] = useState(false);
    return (
        <div className={cx('wrapper', 'relative')}>
            <div className="absolute w-full">
                <div className="flex justify-between pt-[20px] pl-[20px] pr-[20px] items-center">
                    <img className="w-[70px] h-[70px] object-cover" src={logo} />
                    <ul className="flex items-center space-x-[14px] m-0">
                        <li>
                            <Link
                                className="hover:opacity-65 hover:underline text-[1.2rem] font-bold text-white"
                                to={'/'}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setInstructor(true);
                                }}
                                className=" hover:opacity-65 hover:underline text-[1.2rem] font-bold text-white"
                            >
                                Đăng ký giảng viên
                            </button>
                        </li>
                        <li>
                            <Button onClick={() => setEnjoin({ value: 'login' })}>Trải nghiệm</Button>
                        </li>
                    </ul>
                </div>
                <h4 className="text-center text-white font-bold text-[1.8rem] pt-[40px]">
                    Chào mừng bạn đến với ITSchool
                </h4>
                <p className="text-center text-[1.4rem] m-0 text-white">
                    Nơi khởi đầu hành trình chinh phục công nghệ! Hãy khám phá các khóa học chất lượng cao,
                    <br /> trang bị kỹ năng để thành công trong thế giới số.
                </p>
                <div>
                    <img src={mainLading} className="select-none block w-[500px] object-cover m-auto" />
                    <div className="flex justify-center space-x-[50px]">
                        <Button onClick={() => setEnjoin({ value: 'login' })} styles="w-[150px]  text-center">
                            Đăng nhập
                        </Button>
                        <Button onClick={() => setEnjoin({ value: 'register' })} styles="w-[150px] text-center">
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
            {enjoin.value && <LoginRegister enjoin={enjoin} setEnjoin={setEnjoin} />}
            {instructor && <InstructorRegister setInstructor={setInstructor} />}
        </div>
    );
}

export default Lading;
