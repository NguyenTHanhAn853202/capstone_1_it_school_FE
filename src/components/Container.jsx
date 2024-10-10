
function Container({ children, style }) {
    return (
        <div className={`w-full flex justify-center items-center ${style}`}>
            <div className="w-container">{children}</div>
           
        </div>
    );
}

export default Container;
