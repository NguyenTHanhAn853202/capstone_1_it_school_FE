import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import logoFacebook from '~/public/media/images/logo_facebook_black.png';
import logoGoogle from '~/public/media/images/logo_google_black.png';
import logoGithub from '~/public/media/images/logo_git.png';
import { useEffect, useState } from 'react';
import { object, string, number, date, InferType, ref } from 'yup';
import { toast } from 'react-toastify';
import { success, toastError, toastSuccess } from '~/utils/toasty';
import { post } from '~/database';
import { pathname } from '~/routes/pathname';
import { Spin } from 'antd';

const logo = [logoFacebook, logoGoogle, logoGithub];

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const registerValidate = object({
        username: string().test('username-validation', 'tên đăng nhập là email hoặc số điện thoại', (value) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const phoneRegex = /^[0-9]{10,11}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
        password: string()
            .min(7, 'Mật khẩu ít nhất có 7 ký tự')
            .max(30, 'Mật khẩu không vượt quá 30 ký tự')
            .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường')
            .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa')
            .matches(/\d/, 'Mật khẩu phải chứa ít nhất một chữ số')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt')
            .required('Vui lòng nhập mật khẩu'),
        confirmPassword: string().oneOf([ref('password'), null], 'Mật khẩu không trùng khớp'),
    });

    const handleSubmitRegister = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const value = await registerValidate.validate(register);
            const response = await post('/user/register', {
                username: value.username,
                password: value.password,
                repeatPassword: value.confirmPassword,
            });
            if (response.status === 'ok') {
                toastSuccess('Đăng ký thành công');
                navigate(pathname.EXPERIENCE);
            }
            const errorMessage = response?.response?.data?.message;
            toastError(errorMessage);
        } catch (error) {
            toastError(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[100%] w-full bg-white flex justify-center top-0 absolute z-50">
            <div className="w-[70%] h-[100%]">
                <form onSubmit={handleSubmitRegister}>
                    <h2 className="text-center font-light pb-4 pt-[50px] text-black text-[2rem]">Đăng Ký</h2>
                    <input
                        value={register.username}
                        onChange={(e) => setRegister((props) => ({ ...props, username: e.target.value }))}
                        placeholder="Email hoặc số điện thoại"
                        className="mb-[25px] bg-input text-black opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        type="password"
                        value={register.password}
                        onChange={(e) => setRegister((props) => ({ ...props, password: e.target.value }))}
                        placeholder="Mật khẩu ít nhất có 7 ký tự"
                        className="bg-input text-black opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        value={register.confirmPassword}
                        type="password"
                        onChange={(e) => setRegister((props) => ({ ...props, confirmPassword: e.target.value }))}
                        placeholder="Nhập lại mật khẩu"
                        className="bg-input text-black opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mt-[25px] mr-auto px-[10px] my[5px]"
                    />

                    <div className="flex justify-center mt-2">
                        <Button styles="font-light text-[1rem] h-[35px] w-[190px] bg-button_green py-[5px] mt-[10px] ">
                            {loading ? <Spin /> : 'Đăng ký'}
                        </Button>
                    </div>
                </form>
                <span className="block text-center mt-3 text-black">Hoặc sử dụng cách khác</span>
                <div className="flex space-x-[10px] justify-center mt-[15px] ">
                    {logo.map((item, index) => (
                        <Link
                            className="cursor-pointer hover:opacity-50 flex justify-center items-center w-[40px] h-[40px] rounded-full border-[1px] border-black"
                            key={index}
                        >
                            <img className="block w-[30px] " src={item} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Register;
