import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import logoFacebook from '~/public/media/images/logo_facebook_black.png';
import logoGoogle from '~/public/media/images/logo_google_black.png';
import logoGithub from '~/public/media/images/logo_git.png';
import { get, post } from '~/database';
import { useState } from 'react';
import { object } from 'yup';
import { toastError, toastInfo } from '~/utils/toasty';
import { Spin } from 'antd';
const logo = [logoFacebook, logoGoogle, logoGithub];

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmitLogin = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            const response = await post('/user/login', {
                username: login.username,
                password: login.password,
            });
            response.status === 'info' && toastInfo(response.message);
            if (response?.status === 'ok') {
                const data = response.data;
                localStorage.username = data.name;
                localStorage.userId = data.user._id;
                localStorage.avatar = data.avatar;
                localStorage.profileId = data._id;
                localStorage.role = data.user.role;
                navigate('/');
            }
            response?.response?.data?.message && toastError(response?.response?.data?.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[100%] w-full bg-white flex justify-center top-0 absolute z-50">
            <div className="w-[70%] h-[100%]">
                <form onSubmit={handleSubmitLogin}>
                    <h2 className="text-center font-light pb-4 pt-[50px] text-black text-[2rem]">Đăng Nhập</h2>
                    <input
                        onChange={(e) => setLogin((props) => ({ ...props, username: e.target.value }))}
                        value={login.username}
                        placeholder="Email hoặc số điện thoại"
                        className="mb-[30px] bg-input text-black opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        onChange={(e) => setLogin((props) => ({ ...props, password: e.target.value }))}
                        value={login.password}
                        type="password"
                        placeholder="Mật khẩu ít nhất có 7 ký tự"
                        className="bg-input text-black opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <div className="flex items-center justify-between mt-[7px] mb-[10px]">
                        <div>
                            <input type="checkbox" className="m-0 scale-[120%] hover:cursor-pointer" />
                            <p className="text-black m-0 text-[0.9rem] pl-1 inline-block">Nhớ mật khẩu</p>
                        </div>
                        <Link to={'/forgot-password'} className="text-black m-0 text-[0.9rem]">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <Button styles="font-light text-[1rem] h-[35px] w-[190px] bg-button_green py-[5px] mt-[10px] ">
                            {loading ? <Spin /> : 'Đăng Nhập'}
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

export default Login;
