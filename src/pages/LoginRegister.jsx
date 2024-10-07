import Login from '~/components/Login';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Fragment, useEffect, useRef, useState } from 'react';
import Register from '~/components/Register';
import styles from '~/styles/LoginRegisterPage.module.scss';
import classname from 'classnames/bind';

const cx = classname.bind(styles);

function LoginRegister({ setEnjoin, enjoin }) {
    const [isRun, setIsMove] = useState(enjoin?.value === 'register' ? true : false);
    const layoutRef = useRef();
    const handleClickClose = (e) => {
        e.target === layoutRef.current && setEnjoin({ value: null });
    };
    return (
        <div
            onClick={handleClickClose}
            ref={layoutRef}
            className="w-full h-[100vh] absolute top-0 right-0 left-0 flex justify-center items-center bg-mark "
        >
            <div className="w-[60%] h-[500px] bg-[url('/src/public/media/images/backgroup_login.jpg.png')] overflow-hidden  rounded-[20px]  bg-no-repeat bg-cover ">
                <div className="h-full relative">
                    <div className={cx('test')}></div>
                    <div className={cx(isRun ? 'move-right' : 'reset', 'z-50', 'relative w-1/2')}>
                        {isRun ? <Register /> : <Login />}
                    </div>

                    <div className={cx(isRun ? 'move-left' : 'reset', 'absolute w-1/2 top-0 right-0')}>
                        {!isRun ? (
                            <div
                                className={cx('absolute h-full w-full right-0 top-0 flex items-center justify-center')}
                            >
                                <div>
                                    <h2 className="text-center text-white">Chào mừng bạn đến với ITSchool</h2>
                                    <p className="w-[80%] text-white text-center font-light ml-auto mr-auto pt-3">
                                        Hãy tạo tài khoản ngay để bắt đầu hành trình học tập và khám phá thế giới công
                                        nghệ.
                                    </p>
                                    <div className="flex justify-center pt-3">
                                        <button
                                            onClick={() => setIsMove(!isRun)}
                                            className="border-white text-[1.2rem] border rounded-2xl hover:opacity-50 px-5 py-1 text-white flex items-center"
                                        >
                                            Đăng ký
                                            <span className="ml-[20px] block">
                                                <FaChevronRight />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={cx('w-full absolute h-full top-0 right-0 flex items-center justify-center')}
                            >
                                <div>
                                    <h2 className="text-center text-white">Chào mừng trở lại!</h2>
                                    <p className="w-[80%] text-center font-light ml-auto mr-auto pt-3 text-white">
                                        Vui lòng đăng nhập để tiếp tục khám phá và học tập tại IT School.
                                    </p>
                                    <div className="flex justify-center pt-3">
                                        <button
                                            onClick={() => setIsMove(!isRun)}
                                            className="border-white text-[1.2rem] border rounded-2xl hover:opacity-50 px-5 py-1 text-white flex items-center"
                                        >
                                            <span className="mr-[20px] block">
                                                <FaChevronLeft />
                                            </span>
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
