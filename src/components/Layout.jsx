import Header from './Header';
import { useToggleMode } from '~/hook/useDarkMode';
import SideBar from './Sidebar';

function Layout({ children }) {
    const darkMode = useToggleMode((state) => state.darkMode);
    return (
        <div className={darkMode ? 'dark' : ''}>
            <SideBar />
            <Header />
            {children}
        </div>
    );
}

export default Layout;
