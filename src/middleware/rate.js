import * as yup from 'yup';
export const rateValidation = yup.object({
    rate: yup.number().min(1, 'Vui lòng chọn số sao').max(5),
    comment: yup.string().required('Vui lòng nhập đánh giá của bạn'),
    courseId: yup.string().required('Lỗi khi comment vui lòng thử lại'),
});
