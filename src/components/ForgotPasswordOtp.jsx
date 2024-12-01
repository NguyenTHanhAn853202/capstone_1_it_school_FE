import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { post } from '~/database';
import logo from '~/public/media/images/logo.png';
import Button from './Button';
import { toastError } from '~/utils/toasty';
import { Spin } from 'antd';

const numberRegex = /^\d+$/;
function VerifyCode() {
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const username = location.state?.username;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await post('/user/verify-forgot-password', {
                username,
                code: verificationCode * 1,
            });
            response?.status === 'ok' && navigate('/verify-code-succesfully');
            response?.response?.data?.status === 'error' && toastError(response.response.data?.message);
        } catch (error) {
            toastError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCode = (e) => {
        const value = e.target.value;
        if ((value.length === 0 || numberRegex.test(value)) && value.length < 11) setVerificationCode(e.target.value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-[30px] py-[50px]">
                <div className="text-center mb-6">
                    <img src={logo} className="mx-auto mb-4 size-[50px]" />
                    <h2 className="text-2xl font-semibold text-gray-800">Xác minh mã</h2>
                    <p className="text-gray-600 mt-2">Nhập mã xác nhận đã gửi đến {username} </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mb-4 text-black border border-gray-300 rounded-lg  ring-2 ring-teal-500"
                        placeholder="Mã xác nhận"
                        value={verificationCode}
                        onChange={handleChangeCode}
                        required
                    />
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {loading ? <Spin /> : ' Xác nhận'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyCode;
