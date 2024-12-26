import { Button, DatePicker, Input, Upload } from 'antd';
import { useRef, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import InputDateTime from '~/components/InputDateTime';
import { post } from '~/database';
import { toastError, toastInfo, toastSuccess } from '~/utils/toasty';
import { validateInstructor } from '~/utils/validation';

function InstructorRegister({ setInstructor }) {
    const layoutRef = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const [image, setImage] = useState([]);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [cccd, setCccd] = useState('');
    const [phone, setPhone] = useState('');
    const [field, setField] = useState('');

    const handleClickClose = (e) => {
        e.target === layoutRef.current && setInstructor(false);
    };
    const handleBeforeUpload = (e) => {
        setImage((pre) => [...pre, e]);
        return false;
    };
    const handleRemove = (file) => {
        const index = image.indexOf(file);
        const newFileList = image.slice();
        newFileList.splice(index, 1);
        setImage(newFileList);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const value = await validateInstructor.validate({
                email,
                fullName,
                cccd,
                phone,
                field,
                startDate,
            });
            if (image.length === 0) {
                toastInfo('Vui lòng chọn hình ảnh bằng chứng');
                return;
            }
            const formData = new FormData();
            formData.append('email', value.email);
            formData.append('fullName', value.fullName);
            formData.append('cccd', value.cccd);
            formData.append('phoneNumber', value.phone);
            formData.append('dateOfBirth', value.startDate);
            formData.append('expertiseAreas', field);
            for (const i of image) {
                formData.append('degreeCertificates', i);
            }
            const response = await post('/in-re/create-in-re', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 500) {
                toastError('Email đã tồn tại');
                return;
            }
            if (response.status === 403) {
                toastInfo(response.response.data.message);
                return;
            }
            if (response?.status === 'ok') {
                toastSuccess('Đăng ký thành công, đang chờ duyệt');
                setInstructor(false);
            }
            console.log(response);
        } catch (error) {
            toastInfo(error.message);
        }
    };
    return (
        <div
            onClick={handleClickClose}
            ref={layoutRef}
            className="w-full h-[100vh] absolute top-0 right-0 left-0 flex justify-center items-center bg-mark "
        >
            <div className="w-[60%] h-[500px] bg-white rounded-[20px]  bg-no-repeat bg-cover p-6 ">
                <h1 className="text-center text-14 mb-4">Đăng ký tài khoản giảng viên</h1>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="flex space-x-2">
                        <label className="flex-1">
                            Email
                            <Input placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="flex-1">
                            Họ và tên
                            <Input
                                placeholder="Nhập họ và tên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex space-x-2">
                        <label className="flex-1">
                            CCCD
                            <Input placeholder="Nhập CCCD" value={cccd} onChange={(e) => setCccd(e.target.value)} />
                        </label>
                        <label className="flex-1">
                            Số điện thoại
                            <Input placeholder="Nhập SĐT" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label>
                            Lĩnh vực
                            <Input
                                placeholder="Nhập lĩnh vực"
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                            />
                        </label>
                        <label>
                            <span className="block">Ngày sinh</span>
                            <InputDateTime
                                width={'100px'}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                placeholder="Nhập ngày sinh"
                            />
                        </label>
                    </div>
                    <label className="max-h-[100px] max-w-[300px] block overflow-y-scroll overflow-x-hidden">
                        <span className="block">Hình ảnh chứng nhận</span>
                        <Upload
                            style={{
                                width: '300px',
                                minWidth: '300px',
                                overflow: 'hidden',
                            }}
                            onRemove={handleRemove}
                            multiple={true}
                            accept="image/*"
                            fileList={image}
                            beforeUpload={handleBeforeUpload}
                        >
                            <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
                        </Upload>
                    </label>
                    <Input
                        type="submit"
                        value={'Xác nhận'}
                        className="!bg-button_green !w-[150px] text-white mt-4 hover:!bg-button_green"
                    />
                </form>
            </div>
        </div>
    );
}

export default InstructorRegister;
