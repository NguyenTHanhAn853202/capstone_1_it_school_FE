import { IoIosList } from 'react-icons/io';
import UploadFileCard from './UploadFileCard';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import TextEditor from './TextEditor';
import { CiImageOn } from 'react-icons/ci';
import UplaoadedFileCard from './UploadedfFileCard';

import Button from './Button';
import { IoIosAdd } from 'react-icons/io';
import { destroy, get } from '~/database';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from './Dialog';
import { toastError, toastSuccess } from '~/utils/toasty';
import FormEditLesson from '../pages/FormEditLesson';

function EditLesson({ numberLesson = 0, title, lessonId, setLessonsTitle }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const handleDeleteLesson = () => {
        setOpenDialog(true);
    };
    const handleConfirmDelete = async () => {
        try {
            setConfirmLoading(true);
            const response = await destroy('/lesson/delete/' + lessonId);
            if (response?.status === 'ok') {
                toastSuccess('Xóa thành công');
                setLessonsTitle((pre) => {
                    const arr = [...pre];
                    arr.splice(numberLesson, 1);
                    return arr;
                });
            }
        } catch (error) {
            toastError('Đã xãy ra lỗi');
            console.log(error);
        } finally {
            setConfirmLoading(false);
            setOpenDialog(false);
        }
    };
    return (
        <>
            <div className="space-y-4 px-6 py-4">
                <div>
                    <div className="flex justify-between items-center pb-2">
                        <h2>Bài {numberLesson + 1}</h2>
                        <div className="flex space-x-2">
                            <Button
                                styles="!text-[0.9rem] font-light px-3 py-0"
                                onClick={() => {
                                    handleDeleteLesson();
                                }}
                            >
                                Xóa
                            </Button>
                            <Dialog
                                open={openDialog}
                                setOpen={setOpenDialog}
                                confirmLoading={confirmLoading}
                                title={'Xóa bài học'}
                                content={'Bạn có chắc chắn muốn xóa bài học này'}
                                handleOk={handleConfirmDelete}
                            />
                            <button
                                onClick={() => navigate('/edit-lesson/' + lessonId)}
                                className="flex items-center border border-button_green border-solid rounded-lg px-[7px]"
                            >
                                <IoIosAdd className="text-14 text-button_green" />
                                <span className="text-[0.9rem] text-button_green">Chỉnh sửa</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center bg-ip_dark rounded-lg overflow-hidden h-[40px] px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md ">
                        <button>
                            <IoIosList className="text-normal" />
                        </button>
                        <input
                            value={title}
                            disabled
                            className="w-full h-full  bg-ip_dark"
                            placeholder="Nhập tiêu đề của bài"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditLesson;
