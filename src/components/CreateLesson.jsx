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

function CreateLesson({ numberLesson = 0, lesson, setLessons, index }) {
    const [isShow, setIsShow] = useState(true);

    return (
        <div className="space-y-4 px-6 py-4">
            <div>
                <div className="flex justify-between items-center pb-2">
                    <h2>Bài {numberLesson + 1}</h2>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => {
                                setLessons((pre) => {
                                    return pre.filter((_, i) => index != i);
                                });
                            }}
                            styles="!text-[0.9rem] font-light px-3 py-0"
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3 items-center bg-ip_dark rounded-lg overflow-hidden h-[40px] px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md ">
                    <button onClick={() => setIsShow(!isShow)}>
                        <IoIosList className="text-normal" />
                    </button>
                    <input
                        value={lesson.title}
                        onChange={(e) =>
                            setLessons((pre) => {
                                return pre.map((item, i) => (i === index ? { ...item, title: e.target.value } : item));
                            })
                        }
                        className="w-full h-full  bg-ip_dark"
                        placeholder="Nhập tiêu đề của bài"
                    />
                </div>
            </div>
            {isShow && (
                <>
                    <TextEditor
                        value={lesson.context}
                        setValue={(text) =>
                            setLessons((pre) => {
                                return pre.map((item, i) => (i === index ? { ...item, context: text } : item));
                            })
                        }
                        label={'Mô tả khóa học'}
                    />
                    <div className="flex justify-between">
                        <div className="space-y-3 w-[47%]">
                            <UploadFileCard
                                onChange={(e) =>
                                    setLessons((pre) => {
                                        return pre.map((item, i) =>
                                            i === index ? { ...item, video: e.target.files[0] } : item,
                                        );
                                    })
                                }
                                accept=".mp4"
                                title={'Tải tệp bài giảng'}
                                description={'Chọn video bài giảng'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.video && (
                                <UplaoadedFileCard
                                    perLoad={100}
                                    size={transformSizeFile(lesson.video.size)}
                                    fileName={lesson.video.name}
                                    onClick={() =>
                                        setLessons((pre) => {
                                            return pre.map((item, i) => (i === index ? { ...item, video: '' } : item));
                                        })
                                    }
                                />
                            )}
                            <UploadFileCard
                                onChange={(e) =>
                                    setLessons((pre) => {
                                        return pre.map((item, i) =>
                                            i === index ? { ...item, interactionAssignment: e.target.files[0] } : item,
                                        );
                                    })
                                }
                                accept=".xlsx, .xls, .docx"
                                title={'Bài tập tương tác'}
                                description={'Chọn file bài tập của bạn'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.interactionAssignment && (
                                <UplaoadedFileCard
                                    fileName={lesson.interactionAssignment.name}
                                    size={lesson.interactionAssignment.size}
                                    perLoad={100}
                                    onClick={() =>
                                        setLessons((pre) => {
                                            return pre.map((item, i) =>
                                                i === index ? { ...item, interactionAssignment: '' } : item,
                                            );
                                        })
                                    }
                                />
                            )}
                        </div>
                        <div className="w-[47%] space-y-3">
                            <UploadFileCard
                                onChange={(e) =>
                                    setLessons((pre) => {
                                        return pre.map((item, i) =>
                                            i === index ? { ...item, thumbnail: e.target.files[0] } : item,
                                        );
                                    })
                                }
                                accept=".png,.jpg,.jpeg"
                                title={'Thumbnail'}
                                description={'Chọn Thumbnail'}
                                icon={<CiImageOn className="text-normal" />}
                            />
                            {lesson.thumbnail && (
                                <UplaoadedFileCard
                                    perLoad={100}
                                    fileName={lesson.thumbnail.name}
                                    size={lesson.thumbnail.size}
                                    onClick={() =>
                                        setLessons((pre) => {
                                            return pre.map((item, i) =>
                                                i === index ? { ...item, thumbnail: '' } : item,
                                            );
                                        })
                                    }
                                />
                            )}
                            <UploadFileCard
                                onChange={(e) =>
                                    setLessons((pre) => {
                                        return pre.map((item, i) =>
                                            i === index ? { ...item, assignment: e.target.files[0] } : item,
                                        );
                                    })
                                }
                                accept=".xlsx, .xls, .docx"
                                title={'Bài tập'}
                                description={'Chọn bài tập'}
                                icon={<IoCloudUploadOutline className="text-normal" />}
                            />
                            {lesson.assignment && (
                                <UplaoadedFileCard
                                    perLoad={100}
                                    fileName={lesson.assignment.name}
                                    size={lesson.assignment.size}
                                    onClick={() =>
                                        setLessons((pre) => {
                                            return pre.map((item, i) =>
                                                i === index ? { ...item, assignment: '' } : item,
                                            );
                                        })
                                    }
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CreateLesson;
