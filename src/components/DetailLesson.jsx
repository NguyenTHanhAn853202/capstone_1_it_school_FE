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
import { get, post } from '~/database';
import { useLocation, useParams } from 'react-router-dom';
import { PATH_MEDIA } from '~/utils/secret';
import { toastInfo } from '~/utils/toasty';
import Webcam from 'react-webcam';
import axios from 'axios';
import loading from '~/public/media/loading/laoding_video.gif';

function DetailLesson() {
    const webcamRef = useRef(null);
    const [count, setCount] = useState(0);
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
    const [countAPI, setCountAPI] = useState(0);
    const [quiz, setQuiz] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [lastTime, setLastTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);

    useEffect(() => {
        setIsMoreDescriptor(hiddenText(descriptionRef.current));
        var player = dashjs.MediaPlayer().create();
        var url = PATH_MEDIA + videoData.videoUrl;
        player.initialize(videoRef.current, url, false);
    }, [JSON.stringify(videoData)]);

    useEffect(() => {
        // videoRef.current.className.includes('hidden') && videoRef.current.play();
    }, [videoRef.current, thumbnail]);

    const captureAndSend = async () => {
        if (!webcamRef.current) return;
        const imageSrcs = webcamRef.current.getScreenshot();
        if (imageSrcs) {
            try {
                const blob = await fetch(imageSrcs).then((res) => res.blob());
                const file = new File([blob], 'webcam-image.jpg', {
                    type: 'image/jpeg',
                });

                const formData = new FormData();
                formData.append('image', file);
                const data = await axios.post('http://127.0.0.1:5000/detect', formData, {});
                console.log(data.data);
                if (data.data.status === 'Closed') {
                    setCount((pre) => pre + 1);
                } else {
                    if (count > 0) {
                        setCount((pre) => pre - 1);
                    }
                }
            } catch (error) {
                console.error('Error sending image:', error);
            }
        }
    };

    useEffect(() => {
        if (count > 3) {
            console.log('stop di e');
            toastInfo('Tập trụng học nha.');
            const speak = new SpeechSynthesisUtterance('warning');
            window.speechSynthesis.speak(speak);
            videoRef.current.pause();
            setCount(-1);
        }
    }, [count]);

    console.log(count);

    useEffect(() => {
        (async () => {
            const response = await get('/lesson/lesson/' + lessonId);
            if (response?.status === 'ok') {
                setVideoData(response.data);
            }
            const interactionAssignment = await get('/quiz/quiz-interaction/' + lessonId);
            interactionAssignment.status === 'ok' && setQuiz(interactionAssignment.data);
        })();
        setMaxTime(0);
        setLastTime(0);
        setCurrentQuiz(null);
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
    console.log(quiz);

    useEffect(() => {
        console.log(lastTime, countAPI * 3);

        if (lastTime > countAPI * 3) {
            captureAndSend();
            setCountAPI(countAPI + 1);
        }
    }, [lastTime]);

    const handleQuizInteraction = async (e) => {
        const value = e.target;
        if (value.currentTime < lastTime + 1 || value.currentTime < maxTime) {
            setLastTime(value.currentTime);
        } else {
            value.currentTime = lastTime;
        }
        if (value.currentTime > maxTime) {
            setMaxTime(value.currentTime);
        }

        quiz.forEach((item) => {
            if (value.currentTime + 1 > item.time && item.time > value.currentTime - 1) {
                setCurrentQuiz(item);
                videoRef.current.pause();
                setQuiz((pre) => pre.filter((_) => _._id !== item._id));
            }
        });
    };
    const handleSubmitAnswer = async () => {
        if (!answer) {
            toastInfo('Vui lòng chọn đáp án');
            return;
        }
        try {
            const response = await post('/quiz/submit-question-interaction', {
                quizId: currentQuiz._id,
                answer: answer,
            });
            if (response.status === 'ok' && response.data) {
                videoRef.current.play();
                setCurrentQuiz(null);
            }
            response.status === 'info' && toastInfo('Bạn đã chọn sai vui lòng chọn lại');
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnPlay = async () => {};
    const handleOnPause = async () => {
        console.log('pause');
        setCount(0);
        // setCountAPI(0);
    };

    return (
        <div className="flex space-x-5">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="absolute -z-10" // Ẩn webcam
            />
            <div className="w-[60%]">
                <div className="h-[400px] relative">
                    <div
                        className="relative h-full"
                        onClick={() => {
                            setthumbnail(false);
                            videoRef.current.play();
                        }}
                    >
                        <img
                            onError={(e) => {
                                e.target.src = loading;
                            }}
                            src={`${PATH_MEDIA}${videoData.thumbnailUrl}`}
                            className={`w-full h-full absolute ${!thumbnail && 'hidden'}`}
                        />
                        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <FaRegPlayCircle className="text-white text-[3rem]" />
                        </button>
                    </div>
                    {currentQuiz && (
                        <div className="w-full h-full bg-mark absolute top-0 z-50 flex justify-center items-center">
                            <div className="w-5/6 h-5/6 bg-white p-6 rounded-xl">
                                <h4>{currentQuiz?.question}</h4>
                                <Radio.Group
                                    onChange={(e) => {
                                        setAnswer(e.target.value);
                                    }}
                                >
                                    <Space direction="vertical" className="mt-4 ml-3">
                                        {currentQuiz.answer.map((item, index) => {
                                            return <Radio value={item}>{item}</Radio>;
                                        })}
                                    </Space>
                                </Radio.Group>
                                <Button onClick={handleSubmitAnswer} className="block w-[100px] mt-4">
                                    Tiếp
                                </Button>
                            </div>
                        </div>
                    )}
                    <video
                        onTimeUpdate={handleQuizInteraction}
                        onPlay={handleOnPlay}
                        onPause={handleOnPause}
                        ref={videoRef}
                        autoPlay={false}
                        controls
                        className={`w-full h-full absolute top-0 ${thumbnail && 'hidden'}`}
                    ></video>
                </div>
                <h2 className="font-bold mt-3 text-12">{`${videoData.position}. ${videoData.title}`}</h2>
                <div className="flex items-center space-x-2 mt-3 ">
                    <Avatar url={PATH_MEDIA + videoData?.course?.instructor?.avatar} />
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
                            videoUrl={item.videoUrl}
                            title={`${item.position}. ${item.title}`}
                            view={item.comment}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailLesson;
