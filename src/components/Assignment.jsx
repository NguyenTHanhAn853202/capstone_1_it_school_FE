import { Button } from 'antd';
import Dialog from './Dialog';
import { useState } from 'react';
import { toastError } from '~/utils/toasty';
import { FaTimes } from 'react-icons/fa';

const quessions = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin'],
        correctAnswer: 'Paris',
    },
    {
        question: 'What is 5 + 3?',
        answers: ['5', '8', '10'],
        correctAnswer: '8',
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ['William Shakespeare', 'Mark Twain', 'Jane Austen'],
        correctAnswer: 'William Shakespeare',
    },
    {
        question: 'What is the boiling point of water at sea level?',
        answers: ['50°C', '100°C', '150°C'],
        correctAnswer: '100°C',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Earth', 'Mars', 'Venus'],
        correctAnswer: 'Mars',
    },
    {
        question: 'What is the largest ocean on Earth?',
        answers: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso'],
        correctAnswer: 'Leonardo da Vinci',
    },
    {
        question: 'What is the primary programming language for web development?',
        answers: ['Python', 'JavaScript', 'Java'],
        correctAnswer: 'JavaScript',
    },
    {
        question: 'What is the chemical symbol for gold?',
        answers: ['Au', 'Ag', 'Fe'],
        correctAnswer: 'Au',
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        answers: ['China', 'Japan', 'Thailand'],
        correctAnswer: 'Japan',
    },
];

function Assignment() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [answers, setAnswers] = useState([]);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleSubmitQuestion = async () => {
        try {
            console.log(answers);

            if (answers.length < quessions.length) {
                toastError('Vui lòng trả lời đầy đủ các câu hỏi');
                return;
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
    console.log(answers);

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
            {quessions.map((question, index) => (
                <div key={index}>
                    <p className="font-bold">{`Câu ${index + 1}. ${question.question}`}</p>
                    <ul className="space-y-[2px]">
                        {question.answers.map((answer, i) => (
                            <li className="ml-4 flex relative items-center" key={i}>
                                {i === 1 && (
                                    <span className='absolute left-[-15px]'>
                                        <FaTimes className="text-red" />
                                    </span>
                                )}
                                <input
                                    onChange={(e) => handleChooseAnswer(question._id || index, answer, index)}
                                    className="accent-button_green size-[14px] checked:outline-button_green border-button_green"
                                    id={'answer' + index + '' + i}
                                    type="radio"
                                    name={`question${index + 1}`}
                                    value={answer}
                                />
                                <label
                                    className="ml-1 cursor-pointer font-thin opacity-80 italic"
                                    htmlFor={'answer' + index + '' + i}
                                >
                                    {answer}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="">
                <Button onClick={handleOpenDialog} className="hover:border-button_green">
                    Hoàn thành
                </Button>
            </div>
        </div>
    );
}

export default Assignment;
