import React, { useState } from 'react';
import { post } from '~/database';
import logo from '~/public/media/images/logo.png';
import Button from './Button';
import { toastError, toastSuccess } from '~/utils/toasty';
import { Link, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { pathname } from '~/routes/pathname';

function VerifyCodeSuccesfully() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }
        try {
            const response = await post('/user/change-forgot-password', {
                password: password,
            });
            if (response.status === 'ok') {
                toastSuccess(response.message);
                navigate(pathname.EXPERIENCE);
            }
            response?.response?.data?.message && toastError(response?.response?.data?.message);
        } catch (error) {
            toastError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white shadow-md rounded px-[30px] py-[50px] w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={logo} className="mx-auto size-[50px]" />
                </div>
                <h2 className="text-center text-2xl font-bold mb-4">Lấy lại mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <input
                            type="password"
                            className="w-full px-4 py-2 mb-4 text-black border border-gray-300 rounded-lg  ring-2 ring-teal-500"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            className="w-full px-4 py-2 mb-4 text-black border border-gray-300 rounded-lg  ring-2 ring-teal-500"
                            placeholder="Xác nhận lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* {error && <p className="text-red-500 text-xs italic">{error}</p>} */}
                    <div className="flex items-center justify-center mb-2">
                        <Button
                            className=" w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-teal-500"
                            type="submit"
                        >
                            {loading ? <Spin /> : 'Đặt lại mật khẩu'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default VerifyCodeSuccesfully;
