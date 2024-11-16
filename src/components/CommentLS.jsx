import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { useState } from 'react';
import { Button } from 'antd';
import { post } from '~/database';

function CommentLS({ notAvatar = false, avatar, placeholder = 'Nhập bình luận' }) {
    const lessonId = useParams().id;
    console.log(lessonId);

    const [comment, setComment] = useState('');
    const handleSubmitComment = async () => {
        try {
            const response = await post(`/user/comment`, {
                lessonId,
                comment: comment,
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setComment('');
        }
    };
    return (
        <div className="flex items-end space-x-2 pb-3">
            {!notAvatar && <Avatar style={'!size-[40px]'} url={avatar} />}
            <div className="border-b border-b-dark w-full">
                <input
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="border-b border-b-2 border-b-dark w-full text-[0.9rem]"
                />
            </div>
            <Button onClick={handleSubmitComment} className="px-3">
                Gửi
            </Button>
        </div>
    );
}

export default CommentLS;
