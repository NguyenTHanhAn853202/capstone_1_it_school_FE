import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';

function SubComment({ time, commentId, isReloadReply, setNumReply }) {
    const [replys, setReplys] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await get('/user/reply/' + commentId);
            response.status === 'ok' && setReplys(response.data);
        })();
    }, [commentId, isReloadReply]);
    console.log(replys);

    return (
        <>
            {replys.map((reply) => (
                <div className="flex space-x-2 w-full">
                    <Avatar styles={'!size-[25px]'} src={`${PATH_MEDIA}${reply?.profile?.avatar}`} />
                    <div className="flex-1">
                        <h3 className="font-bold">
                            {reply?.profile?.name}{' '}
                            <span className="font-light opacity-60 ml-4 text-[0.8rem]">{time}</span>
                        </h3>
                        <p className="text-[0.9rem]">{reply?.comment}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SubComment;
