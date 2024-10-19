import Header from './Header';
import { useToggleMode } from '~/hook/useDarkMode';
import SideBar from './Sidebar';

function Layout({ children }) {
    return (
        <div className="relative">
            <SideBar />
            <Header />
            <div className="absolute w-[80%] right-0 top-[70px] h-[70px] 1xl:w-[85%]">{children}</div>
        </div>
    );
}

export default Layout;
