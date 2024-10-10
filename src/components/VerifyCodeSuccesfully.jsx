import React, { useState } from 'react';
import { post } from '~/database';
import logo from '~/public/media/images/logo.png';
import Button from './Button';
import { toastError } from '~/utils/toasty';
import { Link, useNavigate } from 'react-router-dom';

function  VerifyCodeSuccesfully(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp!');
        return;
      }
      try {
        const response = await post('/user/change-forgot-password', {
          password: password
        });
        console.log(response.data);
        if (response.status === 200) {
          navigate('/login');
        }
        response?.response?.data?.message && toastError(response?.response?.data?.message);
      } catch (error) {
        toastError(error.message);
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <img src={logo} className="h-12 w-12" />
          </div>
          <h2 className="text-center text-2xl font-bold mb-6">Lấy lại mật khẩu</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Xác nhận lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>
            {/* {error && <p className="text-red-500 text-xs italic">{error}</p>} */}
            <div className="flex items-center justify-center">
                <Button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"> Đặt lại mật khẩu
                </Button>
            </div>
          </form>
        </div>
      </div>
    );

}
export default VerifyCodeSuccesfully;