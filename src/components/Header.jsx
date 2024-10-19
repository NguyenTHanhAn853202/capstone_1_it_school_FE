import { useToggleMode } from '~/hook/useDarkMode';
import classname from 'classnames/bind';
import styles from '~/styles/homePage.module.scss';
import Container from './Container';
import logo from '~/public/media/images/logo.png';
import { FaRegAddressBook } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import avatar from '~/public/media/images/logo_node_react.png';
import { IoIosSearch } from 'react-icons/io';

const cx = classname.bind(styles);

function Header() {
    const handleToggle = useToggleMode((state) => state.toggleDarkMode);
    return (
        <Container
            style={
                'h-[70px] w-[80%] 1xl:w-[85%] xl:w-header fixed right-0 py-[10px] border-dark border-b bg-white  z-50'
            }
        >
            <div className="flex justify-between">
                <img src={logo} className="block w-[40px] h-[40px]" />
                <div className="w-[400px] h-[40px] rounded-3xl overflow-hidden border border-dark flex items-center">
                    <input className="w-[86%] h-full text-black px-[13px]" />
                    <span className="w-[0.5px] h-1/2 bg-dark "></span>
                    <button className="text-black text-[1.6rem] flex-1 flex justify-center hover:opacity-50">
                        <IoIosSearch />
                    </button>
                </div>
                <div className="flex space-x-sm">
                    <button className="text-[1.6rem] text-black hover:opacity-50">
                        <FaRegAddressBook />
                    </button>
                    <button className="text-[1.8rem] text-black hover:opacity-50">
                        <IoIosNotificationsOutline />
                    </button>
                    <img
                        className="size-[40px] rounded-full cursor-pointer hover:opacity-50"
                        src={avatar}
                        alt={'avatar'}
                    />
                </div>
            </div>
        </Container>
    );
}

export default Header;
