import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { post } from '~/database';
import logo from '~/public/media/images/logo.png';
import { toastError, toastSuccess } from '~/utils/toasty';
import { changePasswordValidation } from '~/utils/validation';

function ChangePassowrd() {
    const [{ confirmPassword, newPassword, currentPassword }, setChangePassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const value = await changePasswordValidation.validate({
                currentPassword: currentPassword,
                password: newPassword,
                confirmPassword: confirmPassword,
            });
            const response = await post('/user/change-password', {
                password: currentPassword,
                newPassword: newPassword,
                newRepeatPassword: confirmPassword,
            });
            if (response?.status === 'ok') {
                toastSuccess('Đổi mật khẩu thành công');
                navigate('/');
            }
            response?.response?.data?.message && toastError(response?.response?.data?.message);
        } catch (error) {
            toastError(error.message);
        }
    };
    return (
        <div className="flex justify-center">
            <div className="max-w-sm w-full mt-[80px]">
                <img src={logo} className="size-[50px] block m-auto" />
                <h1 className="text-center font-bold mt-lg mb-[30px]">Đổi mật khẩu</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-xl">
                    <input
                        onChange={(e) => setChangePassword((props) => ({ ...props, currentPassword: e.target.value }))}
                        value={currentPassword}
                        type="password"
                        className=" block w-full px-4 py-[10px] mb-4 text-black rounded-lg bg-ip_dark"
                        placeholder="Mật khẩu hiện tại"
                    />
                    <input
                        onChange={(e) => setChangePassword((props) => ({ ...props, newPassword: e.target.value }))}
                        value={newPassword}
                        type="password"
                        className=" block w-full px-4 py-[10px] mb-4 text-black rounded-lg bg-ip_dark"
                        placeholder="Mật khẩu mới"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setChangePassword((props) => ({ ...props, confirmPassword: e.target.value }))}
                        type="password"
                        className=" block w-full px-4 py-[10px] mb-4 text-black rounded-lg bg-ip_dark"
                        placeholder="Xác nhận mật khẩu"
                    />
                    <div className="flex justify-center">
                        <Button type="submit" styles="w-[170px] py-[5px]">
                            Xác nhận
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassowrd;
