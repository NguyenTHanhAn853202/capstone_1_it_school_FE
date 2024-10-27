import * as yup from 'yup';

export const courseValidation = yup.object({
    title: yup.string().min(3, 'Tên khóa học phải chứa ít nhất 3 ký tự').required('Tên khóa học không được để trống'),
    description: yup
        .string()
        .min(10, 'Mô tả phải chứa ít nhất 10 ký tự')
        .required('Mô tả khóa học không được để trống'),
    price: yup.number().min(0, 'Giá khóa học phải lớn hơn hoặc bằng 0').required('Giá khóa học không được để'),
    categoryId: yup.string().required('Vui lòng chọn loại khóa học'),
    level: yup.string().required('Vui lòng nhập mức độ của khóa học'),
    thumbnail: yup
        .mixed()
        .required('Vui lòng chọn ảnh khóa học')
        .test('size', 'File quá lớn', (value) => {
            return value && value.size <= 1024 * 1024 * 5; // Giới hạn file size 5MB
        })
        .test('fileType', 'Định dạng file không hợp lệ', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
});
