import { Avatar } from 'antd';
import { IoShareOutline } from 'react-icons/io5';
import { PATH_MEDIA } from '~/utils/secret';
import loading from '~/public/media/loading/loading.gif';
import { Link } from 'react-router-dom';
import ImageCustom from './ImageCustom';
import { pathname } from '~/routes/pathname';

function PostCard({ image, username, avatar, title, description, id }) {
    return (
        <div className="p-2 border border-silver rounded-lg">
            <div className="flex justify-between">
                <div className="flex space-x-1">
                    <Avatar size={25} src={PATH_MEDIA + avatar} />
                    <h2>{username}</h2>
                </div>
                <button>
                    <IoShareOutline size="1.2rem" />
                </button>
            </div>
            <div className="flex space-x-2 mt-3">
                <div className="rounded-lg overflow-hidden !w-[170px] !h-[100px] border">
                    <ImageCustom src={PATH_MEDIA + image} className={'!w-[170px] !h-[100px] object-fill'} />
                </div>
                <div className="flex-1">
                    <Link
                        to={pathname.POSTDETAIL + '/' + id}
                        className="text-10 font-bold truncate cursor-pointer hover:opacity-60 hover:text-black"
                    >
                        {title}
                    </Link>
                    <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: description || '' }}></p>

                    <span className="mt-1 block opacity-70">1 thang truoc</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
