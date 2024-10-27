function Container({ children, style, styleChil }) {
    const isWidth = typeof style === 'string' && style.includes('w-');
    const isWContainer = typeof styleChil === 'string' && styleChil.includes('w-');
    return (
        <div className={`${isWidth ? '' : 'w-full'} flex justify-center items-center ${style}`}>
            <div className={`${isWContainer ? '' : 'w-container'} ${styleChil}`}>{children}</div>
        </div>
    );
}

export default Container;
