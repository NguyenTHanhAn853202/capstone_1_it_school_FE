import { Avatar } from 'antd';

function SubComment({ avatarUrl = '', username, time, context }) {
    return (
        <div className="flex space-x-2 w-full">
            <Avatar styles={'!size-[25px]'} url={avatarUrl} />
            <div className="flex-1">
                <h3 className="font-bold">
                    {username} <span className="font-light opacity-60 ml-4 text-[0.8rem]">{time}</span>
                </h3>
                <p className="text-[0.9rem]">{context}</p>
            </div>
        </div>
    );
}

export default SubComment;
