import { Button, Radio, Segmented, Space } from 'antd';
import Avatar from './Avatar';
import avatar from '~/public/media/images/default_avatar.jpg';
import VideoCard from './VideoCard';
import image from '~/public/media/images/logo_node_react.png';
import CommentLesson from './CommentLesson';
import { useEffect, useRef, useState } from 'react';
import hiddenText from '~/utils/hiddenText';
import dashjs from 'dashjs';
import { CiPlay1 } from 'react-icons/ci';
import { FaRegPlayCircle } from 'react-icons/fa';
import Assignment from './Assignment';
import { get } from '~/database';
import { useLocation, useParams } from 'react-router-dom';
import { PATH_MEDIA } from '~/utils/secret';

function DetailLesson() {
    const lessonId = useParams().id;
    const [listLessons, setListLessons] = useState([]);
    // const { courseId = '673898f1716609e4efc7e4a8' } = useLocation().state;
    const arr = new Array(10).fill(null);
    const [isMoreDescriptor, setIsMoreDescriptor] = useState(null);
    const [clamp, setClamp] = useState('line-clamp-6');
    const descriptionRef = useRef(null);
    const videoRef = useRef(null);
    const [thumbnail, setthumbnail] = useState(true);
    const [toggleDescription, setToggleDescription] = useState(false);
    const [videoData, setVideoData] = useState({
        assignment: false,
        context: '',
        interactionAssignment: false,
        thumbnailUrl: '',
        title: '',
        videoUrl: '',
        position: 1,
        course: '',
    });
    const [quiz, setQuiz] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState({});

    useEffect(() => {
        setIsMoreDescriptor(hiddenText(descriptionRef.current));
        var player = dashjs.MediaPlayer().create();
        var url = PATH_MEDIA + videoData.videoUrl;
        player.initialize(videoRef.current, url, true);
    }, [JSON.stringify(videoData)]);

    useEffect(() => {
        // videoRef.current.className.includes('hidden') && videoRef.current.play();
    }, [videoRef.current, thumbnail]);

    useEffect(() => {
        (async () => {
            const response = await get('/lesson/lesson/' + lessonId);
            if (response?.status === 'ok') {
                setVideoData(response.data);
            }
            const interactionAssignment = await get('/quiz/quiz-interaction/' + lessonId);
            interactionAssignment.status === 'ok' && setQuiz(interactionAssignment.data);
        })();
    }, [lessonId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await get(`/lesson/lessons-of-course/${videoData.course?._id}`);
                if (response?.status === 'ok') {
                    const data = response.data;
                    setListLessons(data);
                } else {
                    console.log('Error get course');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [videoData.course?._id]);
    const handleQuizInteraction = (e) => {
        const value = e.target;
        quiz.forEach((item) => {
            console.log(item.time, value.currentTime);
            if (value.currentTime + 0.1 > item.time && item.time > value.currentTime - 0.1) {
                setQuiz((pre) => pre.filter((_) => _._id !== item._id));
            }
        });
    };

    return (
        <div className="flex space-x-5">
            <div className="w-[60%]">
                <div className="h-[400px] relative">
                    <div
                        className="relative h-full"
                        onClick={() => {
                            setthumbnail(false);
                            // videoRef.current.play();
                        }}
                    >
                        <img
                            src={`${PATH_MEDIA}${videoData.thumbnailUrl}`}
                            className={`w-full h-full absolute ${!thumbnail && 'hidden'}`}
                        />
                        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <FaRegPlayCircle className="text-white text-[3rem]" />
                        </button>
                    </div>
                    <div className="w-full h-full bg-mark absolute top-0 z-50 flex justify-center items-center">
                        <div className="w-5/6 h-5/6 bg-white p-6 rounded-xl">
                            <h4>
                                Câu 1: Ai là người đã cầm quân đánh trận rạch gầm - xoài mút, đại phá quân xiên trong
                                nữa ngày?
                            </h4>
                            <Space direction="vertical" className="mt-4 ml-3">
                                <Radio>Đáp án câu 1</Radio>
                                <Radio>Đáp án câu 2</Radio>
                                <Radio>Đáp án câu 3</Radio>
                                
                            </Space>
                            <Button className='block w-[200px]'>Tiếp</Button>
                        </div>
                    </div>
                    <video
                        onTimeUpdate={handleQuizInteraction}
                        ref={videoRef}
                        controls
                        className={`w-full h-full absolute top-0 ${thumbnail && 'hidden'}`}
                    ></video>
                </div>
                <h2 className="font-bold mt-3 text-12">{`${videoData.position}. ${videoData.title}`}</h2>
                <div className="flex items-center space-x-2 mt-3 ">
                    <Avatar url={avatar} />
                    <h2 className="font-bold">{videoData?.course?.instructor?.name}</h2>
                </div>

                <div className="bg-container p-4 pt-2 rounded-xl mt-1 mb-5">
                    <Segmented
                        onChange={(e) => {
                            setToggleDescription(e === 'Bài tập');
                        }}
                        options={['Mô tả', 'Bài tập']}
                        className="mb-2"
                    />
                    {toggleDescription ? (
                        <Assignment />
                    ) : (
                        <div>
                            <p
                                ref={descriptionRef}
                                className={`${clamp}`}
                                dangerouslySetInnerHTML={{ __html: videoData?.context || '' }}
                            ></p>
                            {isMoreDescriptor && (
                                <span
                                    onClick={() => {
                                        setIsMoreDescriptor(false);
                                        setClamp('line-clamp-none');
                                    }}
                                    className="italic opacity-60 cursor-pointer"
                                >
                                    Xem thêm
                                </span>
                            )}
                        </div>
                    )}

                    {clamp === 'line-clamp-none' && (
                        <span
                            onClick={() => {
                                setIsMoreDescriptor(true);
                                setClamp('line-clamp-6');
                            }}
                            className="italic opacity-60 cursor-pointer"
                        >
                            Thu gọn
                        </span>
                    )}
                </div>
                <CommentLesson />
            </div>
            <div className="flex-1 max-h-[400px]  border-b border-b-2 border-b-mark">
                <h2 className="h-[30px] text-12 leading-[30px]">Danh sách bài học</h2>
                <div className="overflow-hidden max-h-[370px] overflow-y-scroll space-y-2">
                    {listLessons.map((item, i) => (
                        <VideoCard
                            image={item.thumbnailUrl}
                            id={item._id}
                            time={120}
                            title={`${item.position}. ${item.title}`}
                            view={60}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailLesson;
