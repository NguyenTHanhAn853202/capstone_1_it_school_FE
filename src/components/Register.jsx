import { Link } from 'react-router-dom';
import Button from './Button';
import logoFacebook from '~/public/media/images/logo_facebook_black.png';
import logoGoogle from '~/public/media/images/logo_google_black.png';
import logoGithub from '~/public/media/images/logo_git.png';

const logo = [logoFacebook, logoGoogle, logoGithub];

function Register() {
    return (
        <div className="h-[100%] w-full bg-white flex justify-center top-0 absolute z-50">
            <div className="w-[70%] h-[100%]">
                <form>
                    <h2 className="text-center font-light pb-4 pt-[50px]">Đăng Ký</h2>
                    <input
                        placeholder="example@gmail.com"
                        className="mb-[25px] bg-input opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        placeholder="Mật khẩu ít nhất có 7 ký tự"
                        className="bg-input opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mr-auto px-[10px] my[5px]"
                    />
                    <input
                        placeholder="Nhập lại mật khẩu"
                        className="bg-input opacity-95 rounded-md w-[100%] h-[40px] block ml-auto mt-[25px] mr-auto px-[10px] my[5px]"
                    />

                    <div className="flex justify-center mt-2">
                        <Button styles="font-light text-[1rem] h-[35px] w-[190px] bg-button_green py-[5px] mt-[10px] ">
                            Đăng ký
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

export default Register;
