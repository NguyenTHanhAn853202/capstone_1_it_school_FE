import classnames from 'classnames/bind';
import logo from '~/public/media/images/logo.png';
import { useState } from 'react';
import { post } from '~/database';
import { useNavigate } from 'react-router-dom';

const cx = classnames.bind(style);

function ForgotPassword(){

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await post('http://localhost:8000/api/user/forgot-password', {
        username
      });
      setMessage('Yêu cầu thành công, vui lòng kiểm tra email hoặc số điện thoại của bạn.');
      console.log('Thành công:', response.data);

      navigate('/verify-code', { state: { username } });
    } catch (error) {
      setMessage('Yêu cầu thất bại. Vui lòng thử lại.');
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
          <h2 className="text-2xl font-semibold text-gray-800">Quên mật khẩu</h2>
          <p className="text-gray-600 mt-2">
            Nhập email hoặc số điện thoại của bạn để nhận mã xác nhận lấy lại mật khẩu
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Email hoặc số điện thoại"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Tiếp tục'}
          </button>
        </form>
        {message && <div className="mt-4 text-center text-teal-600">{message}</div>}
        <div className="text-center mt-4">
          <span className="text-gray-500">Hoặc</span>
        </div>
        <div className="text-center mt-4">
          <a href="/login" className="text-teal-500 hover:underline">
            Quay lại đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;