import { Link, useParams } from 'react-router-dom';
import { PATH_MEDIA } from '~/utils/secret';

function VideoCard({ to, title, view, image, time, id }) {
    const lessonId = useParams().id;
    return (
        <Link
            to={id !== lessonId ? '/lesson/' + id : null}
            className={`flex space-x-2 hover:opacity-60 ${id === lessonId && 'opacity-60'}`}
        >
            <img className="object-cover w-[150px] h-[85px] rounded-md" src={`${PATH_MEDIA + image}`} />
            <div className="flex-1">
                <h2 className="font-bold">{title}</h2>
                <p className="opacity-50 text-[0.9rem]">{time} phút</p>
                <p className="opacity-50 text-[0.9rem]">{view} người xem</p>
            </div>
        </Link>
    );
}

export default VideoCard;
