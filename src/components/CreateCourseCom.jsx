import InputNoBorder from './InputNoBorder';
import { CiImageOn } from 'react-icons/ci';
import UploadFileCard from './UploadFileCard';
import { useEffect, useState } from 'react';
import inputOnlyNumber from '~/utils/inputOnlyNumber';
import { useCourse } from '~/context/courseState';
import UplaoadedFileCard from './UploadedfFileCard';
import { transformSizeFile } from '~/utils/transformSizeFile';
import { get } from '~/database';
import TextEditor from './TextEditor';
function CreateCourseCom() {
    const { updateTitle, updateDescription, updatePrice, updateLevel, updateThumbnail, updateCategory } = useCourse(
        (state) => ({
            updateTitle: state.updateTitle,
            updateDescription: state.updateDescription,
            updatePrice: state.updatePrice,
            updateLevel: state.updateLevel,
            updateThumbnail: state.updateThumbnail,
            updateCategory: state.updateCategory,
        }),
    );
    const [category, setCategory] = useState([]);
    const { title, description, price, level, thumbnail, categoryId } = useCourse((state) => state.course);
    const [descriptionState, setDescriptionState] = useState(description);
    useEffect(() => {
        (async () => {
            try {
                const response = await get('/category');
                response?.status === 'ok' && setCategory(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        updateDescription(descriptionState);
    }, [descriptionState]);

    return (
        <div className="space-y-4 bg-container px-6 py-4 rounded-2xl">
            <InputNoBorder
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder={'Nhập tên khóa học'}
                lable={'Tên khóa học'}
            />
            <TextEditor setValue={setDescriptionState} value={descriptionState} label={'Mô tả khóa học'} />
            <div className="flex justify-between">
                <div className="w-[47%] space-y-4">
                    <div>
                        <label className="block ">Loại</label>
                        <select
                            onChange={(e) => updateCategory(e.target.value)}
                            className="outline-none bg-ip_dark rounded-lg p-2 w-full shadow-shadow shadow-md"
                        >
                            <option value="">Chọn chuyên môn</option>
                            {category.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <UploadFileCard
                        accept=".png,.jpg,.jpeg"
                        title={'Ảnh bìa'}
                        icon={<CiImageOn className="text-[2.3rem]" />}
                        description={'Chọn ảnh bìa'}
                        onChange={(e) => updateThumbnail(e.target.files[0])}
                    />
                    {thumbnail && (
                        <UplaoadedFileCard
                            fileName={thumbnail.name}
                            perLoad={100}
                            size={transformSizeFile(thumbnail.size)}
                            onClick={() => updateThumbnail('')}
                        />
                    )}
                </div>
                <div className="w-[47%] space-y-4">
                    <div>
                        <label className="block">Mức độ</label>
                        <select
                            onChange={(e) => updateLevel(e.target.value)}
                            className="outline-none bg-ip_dark rounded-lg p-2 w-full shadow-shadow shadow-md"
                        >
                            <option value="">Chọn mức độ</option>
                            <option value="ELEMENTARY">Dễ</option>
                            <option value="INTERMEDIATE">Trung bình</option>
                            <option value="ADVANCED">Khó</option>
                        </select>
                    </div>
                    <InputNoBorder
                        value={price}
                        onChange={(e) => updatePrice(e.target.value)}
                        placeholder={'Nhập giá của khóa học(VND)'}
                        lable={'Giá'}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateCourseCom;
