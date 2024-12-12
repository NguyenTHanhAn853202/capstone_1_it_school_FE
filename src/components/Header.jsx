import { useToggleMode } from '~/hook/useDarkMode';
import classname from 'classnames/bind';
import styles from '~/styles/homePage.module.scss';
import Container from './Container';
import logo from '~/public/media/images/logo.png';
import { FaRegAddressBook } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import avatar from '~/public/media/images/logo_node_react.png';
import { IoIosSearch } from 'react-icons/io';
import { PATH_MEDIA } from '~/utils/secret';
import { Popover, Tooltip } from 'antd';
import { pathname } from '~/routes/pathname';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useStore } from '~/hook/store';

const cx = classname.bind(styles);

function Header() {
    const handleToggle = useToggleMode((state) => state.toggleDarkMode);
    const imgRef = useRef();
    const avatar = useStore((state) => state.store.avatar);
    console.log(avatar);

    useEffect(() => {
        imgRef.current.src = avatar;
    }, [avatar]);
    return (
        <Container
            style={'flex items-center h-full'}
            // style={
            //     'h-[70px] w-[80%] 1xl:w-[85%] xl:w-header fixed right-0 py-[10px] border-dark border-b bg-white  z-50'
            // }
        >
            <div className="flex justify-between">
                <img src={logo} className="block w-[40px] h-[40px]" />
                {/* <div className="w-[400px] h-[40px] rounded-3xl overflow-hidden border border-dark flex items-center">
                    <input className="w-[86%] h-full text-black px-[13px]" />
                    <span className="w-[0.5px] h-1/2 bg-dark "></span>
                    <button className="text-black text-[1.6rem] flex-1 flex justify-center hover:opacity-50">
                        <IoIosSearch />
                    </button>
                </div> */}
                <div className="flex space-x-sm">
                    <Link
                        to={pathname.MYCOURSE}
                        className="text-[1.6rem] text-black hover:opacity-50 flex items-center"
                    >
                        <FaRegAddressBook />
                    </Link>
                    <Link className="text-[1.8rem] text-black hover:opacity-50 flex items-center">
                        <IoIosNotificationsOutline />
                    </Link>
                    <Popover
                        content={
                            <div className="flex flex-col space-y-2">
                                {(localStorage.role === 'INSTRUCTOR' || localStorage.role === 'ADMIN') && (
                                    <>
                                        <Link className="text-10" to={pathname.COURSEMANAGEMENT}>
                                            Quản lý khóa học
                                        </Link>
                                        <Link className="text-10" to={pathname.CREATECOURSE}>
                                            Tạo mới khóa học
                                        </Link>
                                    </>
                                )}
                                {localStorage.role === 'ADMIN' && (
                                    <>
                                        <Link className="text-10" to={pathname.ACCEPT_INSTRUCTOR}>
                                            Duyệt tài khoản giảng viên
                                        </Link>
                                        <Link className="text-10" to={pathname.ACCOUNT_MANAGEMENT}>
                                            Quản lý tài khoản
                                        </Link>
                                    </>
                                )}
                                <Link className="text-10" to={pathname.PROFILE}>
                                    Thông tin cá nhân
                                </Link>
                                <Link className="text-10" to={pathname.CHANGE_PASSWORD}>
                                    Đổi mật khẩu
                                </Link>
                            </div>
                        }
                    >
                        <img
                            className="size-[40px] rounded-full cursor-pointer hover:opacity-50"
                            src={`${PATH_MEDIA}/${localStorage?.avatar}`}
                            alt={'avatar'}
                            ref={imgRef}
                        />
                    </Popover>
                </div>
            </div>
        </Container>
    );
}

export default Header;
