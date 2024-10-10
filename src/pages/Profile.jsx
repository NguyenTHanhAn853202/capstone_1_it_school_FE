import Container from '~/components/Container';
import { GoArrowLeft } from 'react-icons/go';
// import avatar from '~/public/media/images/logo_node_react.png';
import { useEffect, useId, useRef, useState } from 'react';
import Input from '~/components/Input';
import InputDateTime from '~/components/InputDateTime';
import DatePicker from 'react-datepicker';
import Button from '~/components/Button';
import { get } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';

function Profile() {
    const idInput = useId();
    const [startDate, setStartDate] = useState('');
    const [{ username, address, phoneNumber, email, avatarUrl, avatar }, setInformation] = useState({
        username: '',
        address: '',
        phoneNumber: '',
        email: '',
        avatarUrl: '',
        avatar: '',
    });

    useEffect(() => {
        (async () => {
            const response = (await get('/user/profile')).data;
            console.log(response);

            setInformation({
                avatar: response.avatar,
                username: response.name,
                phoneNumber: response.phoneNumber,
                email: response.email,
                address: response.address,
            });
        })();
    }, []);

    // console.log(username, address, phoneNumber, email, avatarUrl);

    return (
        <Container>
            <div className="py-xl">
                <button className="text-normal text-black absolute">
                    <GoArrowLeft />
                </button>
                <form className="w-[600px] h-[500px] absolute left-[50%] -translate-x-[50%]">
                    <img
                        src={`${PATH_MEDIA}/${avatar}`}
                        className="size-[70px] rounded-3xl block m-auto border border-solid border-dark"
                    />
                    <input type="file" id={idInput} className="hidden" accept=".jpg, .jpeg, .png, .gif, .bmp, .webp" />
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
