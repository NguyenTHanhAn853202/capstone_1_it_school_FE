import image from '~/public/media/images/logo_node_react.png'
import Avatar from './Avatar';

function CommentLS() {
    return (  
        <div className="flex items-end space-x-2 pb-3">
            <Avatar style={"!size-[40px]"} url={image} />
            <div className='border-b border-b-dark w-full'>
                <input placeholder='Nhập bình luận' className='border-b border-b-2 border-b-dark w-full' /></div>
        </div>
    );
}

export default CommentLS;