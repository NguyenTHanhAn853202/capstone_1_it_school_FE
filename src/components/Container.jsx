function Container({ children, style }) {
    const isWidth = typeof style === 'string' && style.includes('w-');
    return (
        <div className={`${isWidth ? '' : 'w-full'} flex justify-center items-center ${style}`}>
            <div className="w-container">{children}</div>
        </div>
    );
}

export default Container;
