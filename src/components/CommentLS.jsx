import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { useState } from 'react';
import { Button } from 'antd';
import { get, post } from '~/database';

function CommentLS({ notAvatar = false, avatar, placeholder = 'Nhập bình luận', setComments }) {
    const lessonId = useParams().id;
    const [comment, setComment] = useState('');
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await post(`/user/comment`, {
                lessonId,
                comment: comment,
            });
            if (response.status === 'ok') {
                const data = await get(`/user/get-comments/${lessonId}?page=1`);
                data.status = 'ok' && setComments(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setComment('');
        }
    };
    return (
        <form onSubmit={(e) => handleSubmitComment(e)} className="flex items-end space-x-2 pb-3">
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
            <input
                type="submit"
                className="px-4 py-[2px] cursor-pointer  bg-button_green rounded-lg text-white text-[0.9rem]"
                value={'Gửi'}
            />
        </form>
    );
}

export default CommentLS;
