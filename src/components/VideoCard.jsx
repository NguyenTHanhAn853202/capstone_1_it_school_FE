import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';
import { XMLParser } from 'fast-xml-parser';

function VideoCard({ to, title, view, image, time, id, videoUrl }) {
    const lessonId = useParams().id;
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        async function load() {
            const parseISODuration = (duration) => {
                const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/.exec(duration);
                const hours = parseFloat(match[1] || 0);
                const minutes = parseFloat(match[2] || 0);
                const seconds = parseFloat(match[3] || 0);
                let time = hours * 3600 + minutes * 60 + seconds;
                if (time > 60) {
                    time = Math.ceil(time / 60) + ' phút';
                } else {
                    time = Math.floor(time) + ' giây';
                }
                return time;
            };

            const getVideoDurationFromMPD = async () => {
                try {
                    const response = await get(PATH_MEDIA + videoUrl);
                    let start = response.indexOf('mediaPresentationDuration="') + 'mediaPresentationDuration="'.length;
                    let str = '';
                    while (true) {
                        if (response[start] === '"') {
                            break;
                        }
                        str += response[start];
                        start++;
                    }
                    setTimer(parseISODuration(str));
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            getVideoDurationFromMPD();
        }

        load();
    });
    return (
        <Link
            to={id !== lessonId ? '/lesson/' + id : null}
            className={`flex space-x-2 hover:opacity-60 ${id === lessonId && 'opacity-60'}`}
        >
            <img className="object-cover w-[150px] h-[85px] rounded-md" src={`${PATH_MEDIA + image}`} />
            <div className="flex-1">
                <h2 className="font-bold">{title}</h2>
                <p className="opacity-50 text-[0.9rem]">{timer}</p>
                {/* <p className="opacity-50 text-[0.9rem]">{view} Bình luận</p> */}
            </div>
        </Link>
    );
}

export default VideoCard;
