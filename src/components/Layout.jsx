import Header from './Header';
import { useToggleMode } from '~/hook/useDarkMode';

function Layout({ children }) {
    const darkMode = useToggleMode((state) => state.darkMode);
    return (
        <div className={darkMode ? 'dark' : ''}>
            <Header />
            {children}
        </div>
    );
}

export default Layout;
