import classnames from 'classnames/bind';
import logo from '~/public/media/images/logo.png';
import { useState } from 'react';
import { post } from '~/database';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import * as Yup from 'yup';
import { toastError } from '~/utils/toasty';

// const cx = classnames.bind(style);
const phoneRegExp = /^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/;
function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string().test('username', 'Tên đăng nhập phải là email hoặc số điện thoại', (value) => {
            if (!value) return false;
            const isValidEmail = Yup.string().email().isValidSync(value);
            const isValidPhone = phoneRegExp.test(value);
            return isValidEmail || isValidPhone;
        }),
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const value = await validationSchema.validate({ username: username });
            const response = await post('/user/forgot-password', {
                username,
            });
            response?.status === 'info' && navigate('/verify-code', { state: { username } });
            response?.response?.data?.message && toastError(response?.response?.data?.message);
        } catch (error) {
            setMessage('Yêu cầu thất bại, Vui lòng thử lại.');
            toastError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-[30px] py-[50px] space-y-md">
                <div className="text-center mb-6">
                    <img src={logo} className="mx-auto mb-4 size-[50px]" />
                    <h2 className="text-2xl font-semibold text-gray-800">Quên mật khẩu</h2>
                    <p className="text-gray-600 mt-2">
                        Nhập email hoặc số điện thoại của bạn để nhận mã xác nhận lấy lại mật khẩu
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full h-[40px] px-3 py-2 mb-4 border border-gray-300 rounded-lg text-black ring-2 focus:ring-teal-500"
                        placeholder="Email hoặc số điện thoại"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="flex justify-center">
                        <Button type="submit" styles="w-[200px]">
                            Tiếp tục
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <span className="text-black">Hoặc</span>
                </div>
                <div className="text-center mt-4">
                    <Link to="/" className="text-button">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
