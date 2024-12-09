import * as Yup from 'yup';

export const changePasswordValidation = Yup.object({
    currentPassword: Yup.string().required('Vui lòng nhập đủ thông tin'),
    password: Yup.string()
        .min(7, 'Mật khẩu phải nhiều hơn 6 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu phải chứa ký tự hoa, ký tự thường, số và ký tự đặc biệt',
        )
        .required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu mới'),
});

export const postValidation = Yup.object({
    title: Yup.string().min(3, 'Tiêu đề lớn hơn 3 ký tự').required('Vui lòng nhập đủ thông tin'),
    content: Yup.string().min(3, 'Tiêu đề lớn hơn 3 ký tự').required('Vui lòng nhập đủ thông tin'),
    categoryId: Yup.string().required('Vui lòng chọn chuyên mục'),
});

export const numberValidation = Yup.number();
