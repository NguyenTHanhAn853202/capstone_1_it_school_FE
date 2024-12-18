import { Button, Select, Upload } from 'antd';
import Item from 'antd/es/list/Item';
import { useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import InputNoBorder from '~/components/InputNoBorder';
import TextEditor from '~/components/TextEditor';
import { get, post } from '~/database';
import { toastError, toastInfo, toastSuccess } from '~/utils/toasty';
import { postValidation } from '~/utils/validation';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [category, setCategory] = useState([]);
    const handleBeforeUpload = (e) => {
        setImage([e]);
        return false;
    };
    const handleRemove = (file) => {
        const index = image.indexOf(file);
        const newFileList = image.slice();
        newFileList.splice(index, 1);
        setImage(newFileList);
    };
    const handleSubmit = async (e) => {
        try {
            const value = await postValidation.validate({
                title: title,
                content: content,
                categoryId: categoryId,
            });
            if (image.length === 0) {
                toastInfo('Vui lòng chọn hình ảnh');
                return;
            }
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('categoryId', categoryId);
            formData.append('image', image[0]);

            const response = await post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 'ok') {
                toastSuccess('Tạo bài viết thành công!');
                setImage([]);
                setTitle('');
                setContent('');
                setCategoryId('');
            } else {
                toastError('Tạo bài viết thất bại!');
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                toastInfo(error.message);
            } else {
                console.log('Đã xảy ra lỗi');
            }
        }
    };

    useEffect(() => {
        async function getCategories() {
            const response = await get('/post/categories');
            if (response.status === 'ok') {
                const data = response.data.map((item) => ({ value: item._id, label: item.name }));
                setCategory(data);
            }
        }
        getCategories();
    }, []);

    return (
        <div className="flex justify-center mt-2">
            <div className="w-[60%] space-y-4">
                <h1 className="text-12 font-bold">Tạo bài viết</h1>
                <InputNoBorder
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={'Nhập tên khóa học'}
                    lable="Tiêu đề:"
                />
                <TextEditor label={'Nội dung:'} value={content} setValue={setContent} />

                <div className="flex justify-between">
                    <Upload
                        style={{
                            width: '300px',
                            minWidth: '300px',
                            overflow: 'hidden',
                        }}
                        onRemove={handleRemove}
                        accept="image/*"
                        fileList={image}
                        beforeUpload={handleBeforeUpload}
                    >
                        <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                    </Upload>
                    <Select
                        onChange={(e) => {
                            setCategoryId(e);
                        }}
                        defaultValue={''}
                        style={{
                            width: '300px',
                            minWidth: '300px',
                        }}
                        options={[{ value: '', label: 'Chọn loại bài' }, ...category]}
                    />
                </div>
                <Button onClick={handleSubmit} className="bg-button_green hover:!bg-button_green hover:!opacity-60">
                    Đăng bài
                </Button>
            </div>
        </div>
    );
}

export default CreatePost;
