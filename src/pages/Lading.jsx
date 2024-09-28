import classnames from 'classnames/bind';
import style from '~/styles/LadingPage.module.scss';
import logo from '~/public/media/images/logo.png';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import mainLading from '~/public/media/images/main_lading_page.png';
import LoginRegister from './LoginRegister';
import { useState } from 'react';

const cx = classnames.bind(style);

function Lading() {
    const [enjoin, setEnjoin] = useState(false);
    return (
        <div className={cx('wrapper', 'relative')}>
            <div className="flex justify-between pt-[20px] pl-20 pr-20 items-center">
                <img className="w-[70px] h-[70px] object-cover" src={logo} />
                <ul className="flex items-center space-x-10 m-0">
                    <li>
                        <Link className="hover:opacity-65 hover:underline text-[1.6rem] font-bold" to={'/'}>
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link className=" hover:opacity-65 hover:underline text-[1.6rem] font-bold">Thông tin</Link>
                    </li>
                    <li>
                        <Button onClick={() => setEnjoin(!enjoin)}>Trải nghiệm</Button>
                    </li>
                </ul>
            </div>
            <h4 className="text-center text-white font-bold text-[1.8rem] pt-[40px]">Chào mừng bạn đến với ITSchool</h4>
            <p className="text-center text-[1.4rem] m-0">
                Nơi khởi đầu hành trình chinh phục công nghệ! Hãy khám phá các khóa học chất lượng cao,
                <br /> trang bị kỹ năng để thành công trong thế giới số.
            </p>
            <div>
                <img src={mainLading} className="select-none block w-[500px] object-cover m-auto" />
                <div className="flex justify-center space-x-[50px]">
                    <Button to={'/'} styles="w-[150px]  text-center">
                        Đăng nhập
                    </Button>
                    <Button to={'/'} styles="w-[150px] text-center">
                        Đăng ký
                    </Button>
                </div>
            </div>
            {enjoin && <LoginRegister setEnjoin={setEnjoin} />}
        </div>
    );
}

export default Lading;
