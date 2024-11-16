import { Link } from 'react-router-dom'


function VideoCard({to,title,view,image,time}){

    return <Link to={to} className="flex space-x-2">
        <img className='object-cover w-[150px] rounded-md' src={image} />
        <div className="flex-1">
            <h2 className='font-bold'>{title}</h2>
            <p className='opacity-50 text-[0.9rem]'>{time} phút</p>
            <p className='opacity-50 text-[0.9rem]'>{view} người xem</p>
        </div>
    </Link>
}

export default VideoCard