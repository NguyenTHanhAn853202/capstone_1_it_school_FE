import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import logoFacebook from '~/public/media/images/logo_facebook_black.png';
import logoGoogle from '~/public/media/images/logo_google_black.png';
import logoGithub from '~/public/media/images/logo_git.png';
import { get, post } from '~/database';
import { useState } from 'react';

const logo = [logoFacebook, logoGoogle, logoGithub];

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        let data = await post('/user/login', {
            username: username,
            password: password,
        });
      
    };

    return (
        <div className="h-[100%] w-full bg-white flex justify-center top-0 absolute z-50">
            <div className="w-[70%] h-[100%]">
                <form onSubmit={handleSubmitLogin}>
                    <h2 className="text-center font-light pb-4 pt-[50px]">Đăng Nhập</h2>
                    <input
                        onChange={handleChangeUsername}
                        value={username}
                        placeholder="example@gmail.com"
                        className="mb-[30px] bg-input opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        value={password}
                        placeholder="Mật khẩu ít nhất có 7 ký tự"
                        className="bg-input opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <div className="flex items-center justify-between mt-[7px] mb-[10px]">
                        <div>
                            <input type="checkbox" className="m-0 scale-[120%] hover:cursor-pointer" />
                            <p className="text-black m-0 text-[0.9rem] pl-1 inline-block">Nhớ mật khẩu</p>
                        </div>
                        <Link className="text-black m-0 text-[0.9rem] ">Quên mật khẩu?</Link>
                    </div>
                    <div className="flex justify-center">
                        <Button styles="font-light text-[1rem] h-[35px] w-[190px] bg-button_green py-[5px] mt-[10px] ">
                            Đăng Nhập
                        </Button>
                    </div>
                </form>
                <span className="block text-center mt-3">Hoặc sử dụng cách khác</span>
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
