import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Button({ children, to, styles = '', ...props }) {
    const styleButton = `hover:opacity-70 text-[1.1rem] text-white font-bold bg-button_green px-[20px] py-[10px] rounded-[30px] + ${styles}`;
    const [Tag, setTag] = useState(Link);
    useEffect(() => {
        if (to) setTag(Link);
        else setTag('button');
    }, []);
    return (
        <Tag {...props} to={to} className={styleButton}>
            {children}
        </Tag>
    );
}

export default Button;
