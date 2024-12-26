import Container from '~/components/Container';
import { GoArrowLeft } from 'react-icons/go';
import avatarDefault from '~/public/media/images/default_avatar.jpg';
import { useEffect, useId, useRef, useState } from 'react';
import Input from '~/components/Input';
import InputDateTime from '~/components/InputDateTime';
import Button from '~/components/Button';
import { get, post } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '~/utils/toasty';
import { useStore } from '~/hook/store';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function Profile() {
    const idInput = useId();
    const [startDate, setStartDate] = useState('');
    const imgRef = useRef();
    const navigate = useNavigate();
    const setAvatar = useStore((state) => state.setAvatar);
    console.log(setAvatar);

    const [{ username, address, phoneNumber, email, avatarUrl, avatar }, setInformation] = useState({
        username: '',
        address: '',
        phoneNumber: '',
        email: '',
        avatarUrl: '',
        avatar: avatarDefault,
    });
    console.log(username, address, phoneNumber, email, avatarUrl, avatar);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('name', username);
            formData.append('address', address);
            formData.append('phoneNumber', phoneNumber);
            formData.append('email', email);
            formData.append('birthday', startDate);
            const response = await post('/user/edit-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            response?.response?.data?.message && toastSuccess(response.response.data.message);

            if (response?.status === 'ok') {
                localStorage.avatar = response.data.avatar;
                toastSuccess(response.message);
                setAvatar(URL.createObjectURL(avatar));
            }
        } catch (error) {}
    };

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        imgRef.current.src = '';
        const url = URL.createObjectURL(file);

        imgRef.current.src = url;
        setInformation((props) => ({ ...props, avatar: file }));
    };

    const handleErrorImg = (e) => {
        // e.target.src = typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar);
    };

    useEffect(() => {
        (async () => {
            const response = await get('/user/profile');
            if (response?.status === 'ok') {
                const data = response.data;
                setInformation({
                    avatar: data.avatar,
                    username: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
                });
                imgRef.current.src = `${PATH_MEDIA}${data.avatar}`;
                setStartDate(data.birthday);
            }
        })();
    }, []);

    return (
        <Container>
            <div className="py-xl">
                <button onClick={(e) => navigate(-1)} className="text-normal text-black absolute">
                    <GoArrowLeft />
                </button>
                <form onSubmit={handleSubmit} className="w-[600px] h-[500px] absolute left-[50%] -translate-x-[50%]">
                    <img
                        // onError={handleErrorImg}
                        ref={imgRef}
                        // src={`${PATH_MEDIA}${avatar}`}
                        className="size-[70px] rounded-3xl block m-auto border border-solid border-dark"
                    />
                    <input
                        onChange={handleChangeAvatar}
                        type="file"
                        id={idInput}
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                    />
                    <div className="flex justify-center">
                        <label htmlFor={idInput} className="cursor-pointer mt-sm underline italic">
                            Đổi ảnh đại diện
                        </label>
                    </div>
                    <div className="space-y-md w-[370px] m-auto mt-lg">
                        <Input
                            placeholder="Nhập tên của bạn"
                            value={username}
                            onChange={(e) => {
                                setInformation((props) => ({ ...props, username: e.target.value }));
                            }}
                            name="name"
                            label="Tên người dùng:"
                        />
                        <Input
                            onChange={(e) => {
                                setInformation((props) => ({ ...props, address: e.target.value }));
                            }}
                            value={address}
                            placeholder="Nhập địa chỉ"
                            name="address"
                            label="Địa chỉ:"
                        />
                        <Input
                            onChange={(e) => {
                                setInformation((props) => ({ ...props, phoneNumber: e.target.value }));
                            }}
                            value={phoneNumber}
                            placeholder="Nhập số điện thoại"
                            label="Số điện thoại:"
                            name="phoneNumber"
                        />
                        <Input
                            label="Email:"
                            value={email}
                            onChange={(e) => {
                                setInformation((props) => ({ ...props, email: e.target.value }));
                            }}
                            name="email"
                            placeholder="Nhập email"
                        />
                        <div>
                            <label className="block">Ngày sinh:</label>
                            <InputDateTime
                                startDate={startDate}
                                setStartDate={setStartDate}
                                placeholder="Nhập ngày sinh"
                            />
                        </div>
                        <div className="flex justify-center pt-sm">
                            <Button type="submit" styles="py-[5px] font-light px-[40px]">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Profile;
