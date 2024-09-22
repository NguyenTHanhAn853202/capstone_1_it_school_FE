import { Container, Row } from 'react-bootstrap';
import { useToggleMode } from '~/hook/useDarkMode';

import classname from 'classnames/bind';
import styles from '~/styles/homePage.module.scss';

const cx = classname.bind(styles);

function Header() {
    const toggleDarkMode = useToggleMode((state) => state.toggleDarkMode);
    const handleToggle = useToggleMode((state) => state.toggleDarkMode);

    return (
        <div className="container mx-auto dark:bg-black flex">
            <button onClick={handleToggle}>Toggle</button>
            <h1 className={cx('name', 'text-red', 'dark:text-white')}>ABC</h1>
            <p className="dark:text-white">ajbscbajb bskbjabsdkbskadbkbwsd </p>
        </div>
    );
}

export default Header;
