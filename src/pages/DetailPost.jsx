import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { IoShareOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';

function DetailPost() {
    const postId = useParams().id;
    const [postDetail, setPostDetail] = useState(null);
    useEffect(() => {
        async function postDetail() {
            const response = await get('/post/' + postId);
            if (response.status === 'ok') {
                setPostDetail(response.data);
            }
        }
        postDetail();
    }, []);
    return (
        <div className="flex justify-center pt-4">
            <div className="w-[70%] space-y-4">
                <div className="flex justify-between">
                    <div className="flex space-x-1">
                        <Avatar src={PATH_MEDIA + postDetail?.author.avatar} size={40} />
                        <div>
                            <h2>{postDetail?.author.name}</h2>
                            <span>12 thang truoc</span>
                        </div>
                    </div>
                    <button>
                        <IoShareOutline size="1.2rem" />
                    </button>
                </div>
                <h1 className="text-10 font-bold">{postDetail?.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: postDetail?.content || '' }}></p>
            </div>
        </div>
    );
}

export default DetailPost;
