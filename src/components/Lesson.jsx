import { IoIosList } from 'react-icons/io';
import InputNoBorder from './InputNoBorder';
import UploadFileCard from './UploadFileCard';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import TextEditor from './TextEditor';
import { CiImageOn } from 'react-icons/ci';
import UplaoadedFileCard from './UploadedfFileCard';
import { useLesson } from '~/context/lesson';
import { transformSizeFile } from '~/utils/transformSizeFile';
import Button from './Button';
import { IoIosAdd } from 'react-icons/io';

function Lesson({ numberLesson = 0 }) {
    const [isShow, setIsShow] = useState(true);
    const lesson = useLesson((state) => state.lessons[numberLesson]);
    const setLesson = useLesson.getState();
    const [description, setDescription] = useState('');
    useEffect(() => {
        setLesson.updateLesson(numberLesson, { description: description });
    }, [description]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center pb-2">
                    <h2>Bài {numberLesson + 1}</h2>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setLesson.removeLesson(numberLesson)}
                            styles="!text-[0.9rem] font-light px-3 py-0"
                        >
                            Xóa
                        </Button>
                        <button
                            onClick={() => {
                                setLesson.addLesson(numberLesson);
                            }}
                            className="flex items-center border border-button_green border-solid rounded-lg px-[7px]"
                        >
                            <IoIosAdd className="text-14 text-button_green" />
                            <span className="text-[0.9rem] text-button_green">Thêm bài mới</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 items-center bg-ip_dark rounded-lg overflow-hidden h-[40px] px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md ">
                    <button onClick={() => setIsShow(!isShow)}>
                        <IoIosList className="text-normal" />
                    </button>
                    <input
                        value={lesson.title}
                        onChange={(e) => setLesson.updateLesson(numberLesson, { title: e.target.value })}
                        className="w-full h-full  bg-ip_dark"
                        placeholder="Nhập tiêu đề của bài"
                    />
                </div>
            </div>
            {isShow && (
                <>
                    <TextEditor setValue={setDescription} value={description} label={'Mô tả khóa học'} />
                    <div className="flex justify-between">
                        <div className="space-y-3 w-[47%]">
                            <UploadFileCard
                                onChange={(e) => setLesson.updateLesson(numberLesson, { video: e.target.files[0] })}
                                accept=".mp4"
                                title={'Tải tệp bài giảng'}
                                description={'Chọn video bài giảng'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.video && (
                                <UplaoadedFileCard
                                    fileName={lesson.video.name}
                                    perLoad={100}
                                    size={transformSizeFile(lesson.video.size)}
                                />
                            )}
                            <UploadFileCard
                                onChange={(e) =>
                                    setLesson.updateLesson(numberLesson, { interactionAssignment: e.target.files[0] })
                                }
                                accept=".xlxs, .xls, .docx"
                                title={'Bài tập tương tác'}
                                description={'Chọn file bài tập của bạn'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.interactionAssignment && (
                                <UplaoadedFileCard
                                    fileName={lesson.interactionAssignment.name}
                                    perLoad={100}
                                    size={transformSizeFile(lesson.interactionAssignment.size)}
                                />
                            )}
                        </div>
                        <div className="w-[47%] space-y-3">
                            <UploadFileCard
                                onChange={(e) => setLesson.updateLesson(numberLesson, { thumbnail: e.target.files[0] })}
                                accept=".png,.jpg,.jpeg"
                                title={'Thumbnail'}
                                description={'Chọn Thumbnail'}
                                icon={<CiImageOn className="text-normal" />}
                            />
                            {lesson.thumbnail && (
                                <UplaoadedFileCard
                                    fileName={lesson.thumbnail.name}
                                    perLoad={100}
                                    size={transformSizeFile(lesson.thumbnail.size)}
                                />
                            )}
                            <UploadFileCard
                                onChange={(e) =>
                                    setLesson.updateLesson(numberLesson, { assignment: e.target.files[0] })
                                }
                                accept=".xlxs, .xls, .docx"
                                title={'Bài tập'}
                                description={'Chọn bài tập'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.assignment && (
                                <UplaoadedFileCard
                                    fileName={lesson.assignment.name}
                                    perLoad={100}
                                    size={transformSizeFile(lesson.assignment.size)}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Lesson;
