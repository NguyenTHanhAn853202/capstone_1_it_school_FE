import { GoHome } from 'react-icons/go';
import { pathname } from '~/routes/pathname';
import { MdOutlineAssignment } from 'react-icons/md';
import { GiBookshelf } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { IoLogInOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '~/database';
const listNav = [
    { Element: GoHome, title: 'Trang chủ', to: pathname.HOME },
    { Element: GiBookshelf, title: 'Khóa học', to: pathname.STORE },
    { Element: HiOutlineUserGroup, title: 'Nhóm học tập', to: pathname.CHAT },
    { Element: HiOutlineChatAlt2, title: 'Diễn đàn', to: pathname.POST },
];
function SideBar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await post('/user/logout');
        if (res.status === 'ok') {
            localStorage.clear();
            navigate(pathname.EXPERIENCE);
        }
    };
    return (
        <nav className="min-h-screen h-full top-0 bg-side_bar z-50">
            <h1 className="text-center hover:text-black h-[70px] leading-[70px] font-bold text-[1.5rem]">
                <Link to={pathname.HOME} className="hover:text-black">
                    ITSchool
                </Link>
            </h1>
            <ul className="pl-[20px] pt-5 pr-[10px]">
                {listNav.map((item, index) => (
                    <li className="" key={index}>
                        <Link
                            to={item.to}
                            className="hover:bg-mark hover:opacity-60 text-[1.1rem] rounded-xl font-bold flex items-center gap-1 py-[10px] px-[5px]"
                        >
                            <item.Element className="text-[1.4rem]" />
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {localStorage.profileId && (
                <>
                    <div className="flex justify-center mt-5">
                        <span className="block w-[90%] h-[2px] bg-ip_dark"></span>
                    </div>
                    <div className="pl-[20px] pr-[10px] flex mt-1">
                        <button className="py-[10px] px-[5px] hover:bg-mark hover:opacity-60 rounded-xl w-full text-[1.1rem] font-bold flex items-center gap-1">
                            <IoLogInOutline className="text-[1.4rem]" />
                            <button onClick={handleLogout}>Logout</button>
                        </button>
                    </div>
                </>
            )}
        </nav>
    );
}

export default SideBar;
