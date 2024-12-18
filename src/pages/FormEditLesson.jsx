import { IoCloudUploadOutline } from 'react-icons/io5';
import UplaoadedFileCard from '../components/UploadedfFileCard';
import UploadFileCard from '../components/UploadFileCard';
import TextEditor from '../components/TextEditor';
import { CiImageOn } from 'react-icons/ci';
import { IoIosAdd, IoIosList } from 'react-icons/io';
import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get, post } from '~/database';
import { toastError, toastInfo, toastSuccess } from '~/utils/toasty';
import { handleAssignmentXLSX, handleInteractionAssignmentXLSX } from '~/utils/handleAssignment';
import { contextType } from 'react-quill';

function FormEditLesson() {
    const { id } = useParams();
    const [{ title, context, quizLesson, quizVideo, thumbnail, video }, setData] = useState({
        title: '',
        context: '',
        quizLesson: '',
        quizVideo: '',
        thumbnail: '',
        video: '',
    });

    console.log({ title, context, quizLesson, quizVideo, thumbnail, video });

    const handleSubmit = async () => {
        try {
            const assitnment = quizLesson?.name ? await handleAssignmentXLSX(quizLesson) : quizLesson;
            const interactionAssignment = quizVideo?.name
                ? await handleInteractionAssignmentXLSX(quizVideo)
                : quizVideo;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('context', context);
            formData.append('video', video);
            formData.append('thumbnail', thumbnail);
            formData.append('quizLesson', JSON.stringify(assitnment));
            formData.append('quizVideo', JSON.stringify(interactionAssignment));
            formData.append('lessonId', id);
            const response = await post('/lesson/update/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toastSuccess('Chỉnh sửa thành công');
            console.log(response);
        } catch (error) {
            toastError('Đã xãy ra lỗi vui lòng thử lại');
        }
    };

    useEffect(() => {
        (async () => {
            const response = await get('/lesson/lesson/' + id);
            if (response?.status === 'ok') {
                const dataRes = response.data;
                setData({
                    title: dataRes.title,
                    context: dataRes.context,
                    quizLesson: dataRes.assignment,
                    quizVideo: dataRes.interactionAssignment,
                    thumbnail: dataRes.thumbnailUrl,
                    video: dataRes.videoUrl,
                });
            } else {
                toastInfo('Đã xãy ra lỗi vui lòng thử lại');
            }
        })();
    }, [id]);
    return (
        <div className="flex justify-center py-6">
            <div className="space-y-4 w-[60%] bg-container px-6 py-4 rounded-2xl">
                <div>
                    <label>Tên bài học</label>
                    <div className="flex gap-3 items-center bg-ip_dark rounded-lg overflow-hidden h-[40px] px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md ">
                        <input
                            value={title}
                            onChange={(e) => setData((pre) => ({ ...pre, title: e.target.value }))}
                            className="w-full h-full  bg-ip_dark"
                            placeholder="Nhập tiêu đề của bài"
                        />
                    </div>
                </div>

                <TextEditor
                    value={context}
                    setValue={(text) => setData((pre) => ({ ...pre, context: text }))}
                    label={'Mô tả khóa học'}
                />
                <div className="flex justify-between">
                    <div className="space-y-3 w-[47%]">
                        <UploadFileCard
                            onChange={(e) => setData((pre) => ({ ...pre, video: e.target.files[0] }))}
                            accept=".mp4"
                            title={'Tải tệp bài giảng'}
                            description={'Chọn video bài giảng'}
                            icon={<IoCloudUploadOutline className="text-normal" />}
                        />
                        {video && (
                            <UplaoadedFileCard
                                onClick={() => setData((pre) => ({ ...pre, video: '' }))}
                                fileName={video?.name || 'Video bài học'}
                                perLoad={100}
                            />
                        )}
                        <UploadFileCard
                            onChange={(e) => setData((pre) => ({ ...pre, quizVideo: e.target.files[0] }))}
                            accept=".xlsx, .xls, .docx"
                            title={'Bài tập tương tác'}
                            description={'Chọn file bài tập của bạn'}
                            icon={<IoCloudUploadOutline className="text-normal" />}
                        />
                        {quizVideo && (
                            <UplaoadedFileCard
                                onClick={() => setData((pre) => ({ ...pre, quizVideo: '' }))}
                                perLoad={100}
                                fileName={quizVideo.name || 'Bài tập tương tác'}
                            />
                        )}
                    </div>
                    <div className="w-[47%] space-y-3">
                        <UploadFileCard
                            onChange={(e) => setData((pre) => ({ ...pre, thumbnail: e.target.files[0] }))}
                            accept=".png,.jpg,.jpeg"
                            title={'Thumbnail'}
                            description={'Chọn Thumbnail'}
                            icon={<CiImageOn className="text-normal" />}
                        />
                        {thumbnail && (
                            <UplaoadedFileCard
                                onClick={() => setData((pre) => ({ ...pre, thumbnail: '' }))}
                                fileName={thumbnail.name || 'thumbnail'}
                                perLoad={100}
                            />
                        )}
                        <UploadFileCard
                            onChange={(e) => setData((pre) => ({ ...pre, quizLesson: e.target.files[0] }))}
                            accept=".xlsx, .xls, .docx"
                            title={'Bài tập'}
                            description={'Chọn bài tập'}
                            icon={<IoCloudUploadOutline className="text-normal" />}
                        />
                        {quizLesson && (
                            <UplaoadedFileCard
                                onClick={() => setData((pre) => ({ ...pre, quizLesson: '' }))}
                                perLoad={100}
                                fileName={quizLesson.name || 'Bài tập'}
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleSubmit} styles="w-[150px] !py-1">
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FormEditLesson;
