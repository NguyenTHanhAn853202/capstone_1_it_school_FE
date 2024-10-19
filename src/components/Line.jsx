function Line({ style }) {
    return (
        <div className="flex justify-center">
            <div className={`w-[90%] h-[1px] bg-black ${style}`}></div>
        </div>
    );
}

export default Line;
