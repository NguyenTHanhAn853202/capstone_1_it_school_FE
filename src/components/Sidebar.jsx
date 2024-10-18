import { GoHome } from 'react-icons/go';
import { pathname } from '~/routes/pathname';
import { MdOutlineAssignment } from 'react-icons/md';
import { GiBookshelf } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { IoLogInOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
const listNav = [
    { Element: GoHome, title: 'Trang chủ', to: pathname.HOME },
    { Element: GiBookshelf, title: 'Khoá học của tôi', to: '' },
    { Element: MdOutlineAssignment, title: 'Bài tập', to: '' },
    { Element: HiOutlineUserGroup, title: 'Nhóm học tập', to: '' },
    { Element: HiOutlineChatAlt2, title: 'Diễn đàn', to: '' },
];
function SideBar() {
    return (
        <nav className="w-side_bar h-screen absolute top-0 bg-side_bar">
            <h1 className="text-center h-[70px] leading-[70px] font-bold text-[1.5rem]">ITSchool</h1>
            <ul className="pl-[20px] pt-5 pr-[10px]">
                {listNav.map((item, index) => (
                    <li className="" key={index}>
                        <Link
                            to={item.to}
                            className="hover:bg-mark hover:opacity-60 text-[1.1rem] rounded-xl font-bold flex items-center gap-3 p-[10px]"
                        >
                            <item.Element className="text-3xl" />
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-5">
                <span className="block w-[90%] h-[2px] bg-ip_dark"></span>
            </div>
            <div className="pl-[20px] pr-[10px] flex mt-1">
                <button className="p-[10px] hover:bg-mark hover:opacity-60 rounded-xl w-full text-[1.1rem] font-bold flex items-center gap-3">
                    <IoLogInOutline className="text-3xl" />
                    <span>Login</span>
                </button>
            </div>
        </nav>
    );
}

export default SideBar;
