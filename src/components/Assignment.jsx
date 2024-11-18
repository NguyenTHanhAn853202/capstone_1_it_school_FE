import { Button } from 'antd';
import Dialog from './Dialog';
import { useEffect, useState } from 'react';
import { toastError, toastSuccess } from '~/utils/toasty';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { get, post } from '~/database';

function Assignment() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const lessonId = useParams().id;
    const [score, setScore] = useState(null);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const [colorScore, setColorScore] = useState('');
    const handleSubmitQuestion = async () => {
        try {
            if (answers.length < questions.length) {
                toastError('Vui lòng trả lời đầy đủ các câu hỏi');
                return;
            }
            const response = await post(`/quiz/submit-question`, {
                answers,
                lessonId,
            });
            if (response.status === 'ok') {
                const data = response.data;
                if (Math.floor(data.correctAnswer / data.totalQuestion) >= 0.8) {
                    toastSuccess('Bạn đã vượt qua bài kiễm tra');
                    setColorScore('text-button_green');
                } else {
                    toastError('Bạn không vượt qua bài kiểm tra');
                    setColorScore('text-red');
                }
                setScore(data.correctAnswer + '/' + data.totalQuestion);
            }
            //call api
        } catch (error) {
            toastError('Đã xãy ra lỗi, vui lòng thử lại');
        } finally {
            setLoadingConfirm(false);
            setOpenDialog(false);
        }
    };
    const handleChooseAnswer = (id, answer, index) => {
        setAnswers((pre) => {
            let arr = [...pre];
            arr = arr.filter((item) => item.id !== id);
            arr.push({ id, answer });
            return arr;
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await get(`/quiz/quiz-no-interaction/${lessonId}`);
                if (response.status === 'ok') {
                    console.log(response.data);

                    setQuestions(response.data);
                } else {
                    console.log('Lấy câu h��i thất bại');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [lessonId]);

    return (
        <div className="space-y-2">
            <Dialog
                open={openDialog}
                setOpen={setOpenDialog}
                confirmLoading={loadingConfirm}
                content={'Bạn có chắc chắn muốn gửi bài'}
                title={'Gửi bài'}
                handleOk={handleSubmitQuestion}
            />
            {questions.map((question, index) => (
                <div key={index}>
                    <p className="font-bold">{`Câu ${index + 1}. ${question.question}`}</p>
                    <ul className="space-y-[2px]">
                        {question.answer.map((item, i) => (
                            <li className="ml-4 flex relative items-center" key={i}>
                                {/* {i === 1 && (
                                    <span className="absolute left-[-15px]">
                                        <FaTimes className="text-red" />
                                    </span>
                                )} */}
                                <input
                                    onChange={(e) => handleChooseAnswer(question._id, e.target.value, index)}
                                    className="accent-button_green size-[14px] checked:outline-button_green border-button_green"
                                    id={'answer' + index + '' + i}
                                    type="radio"
                                    name={`question${index + 1}`}
                                    value={item}
                                />
                                <label
                                    className="ml-1 cursor-pointer font-thin opacity-80 italic"
                                    htmlFor={'answer' + index + '' + i}
                                >
                                    {item}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="space-x-2">
                <Button onClick={handleOpenDialog} className="hover:border-button_green">
                    Hoàn thành
                </Button>
                {score && <span className={colorScore}>{score} điểm</span>}
            </div>
        </div>
    );
}

export default Assignment;
