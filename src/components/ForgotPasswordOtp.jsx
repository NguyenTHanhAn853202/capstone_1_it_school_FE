import React, { useState } from 'react';
import { post } from '~/database';
import logo from '~/public/media/images/logo.png';


function VerifyCode(){

  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const username = location.state?.username; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await post('http://localhost:8000/api/user/verify-forgot-password', {
        username,
        code: verificationCode,
      });
      setMessage('Xác minh thành công!');
      console.log('Xác minh thành công:', response.data);
    } catch (error) {
      setMessage('Xác minh thất bại, vui lòng thử lại.');
      console.error('Lỗi:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <img src={logo} className="mx-auto mb-4 w-12 h-12"/>
          <h2 className="text-2xl font-semibold text-gray-800">Xác minh mã</h2>
          <p className="text-gray-600 mt-2">
            Nhập mã xác nhận đã gửi đến {username} </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Mã xác nhận"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required/>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác minh'}
          </button>
        </form>
        {message && <div className="mt-4 text-center text-teal-600">{message}</div>}
      </div>
    </div>
  );
}

export default VerifyCode;
