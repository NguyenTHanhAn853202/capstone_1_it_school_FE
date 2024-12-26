import { Image, Spin, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Dialog from '~/components/Dialog';
import { get, post } from '~/database';
import { PATH_MEDIA } from '~/utils/secret';
import { toastSuccess } from '~/utils/toasty';

function AcceptInstructor() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [loadingAccepter, setLoadingAccepter] = useState(false);
    const loadData = async () => {
        try {
            const res = await get('/in-re/get-in-re');
            if (res.status === 'ok') {
                const data = res.data.map((item) => ({
                    id: item._id,
                    email: item.email,
                    fullName: item.fullName,
                    phoneNumber: item.phoneNumber,
                    dateOfBirth: dayjs(new Date(item.dateOfBirth)).format('DD/MM/YYYY'), // Chỉ lấy ngày
                    cccd: item.cccd,
                    degreeCertificates: item.degreeCertificates, // Dữ nguyên danh sách ảnh
                    expertiseAreas: item.expertiseAreas,
                }));
                setDataSource(data);
            }
        } catch (error) {}
    };
    const handleShowDialog = (record) => {
        setInfo(record);
        setOpen(true);
    };
    const handleDelete = async (item) => {
        try {
            setLoading(true);
            const res = await post('/in-re/non-accept', {
                _id: info.id,
                fullName: info.fullName,
                email: info.email,
            });
            if (res.status === 'ok') {
                toastSuccess('Thành công');
                loadData();
            }
        } catch (error) {
        } finally {
            setOpen(false);
            setLoading(false);
            setInfo(null);
        }
    };
    const handleAccept = async (record) => {
        try {
            setLoadingAccepter(true);

            const res = await post('/in-re/accept', {
                _id: record.id,
                email: record.email,
                fullName: record.fullName,
                phoneNumber: record.phoneNumber,
                dateOfBirth: record.dateOfBirth,
            });
            if (res.status == 'ok') {
                toastSuccess('Thành công');
                loadData();
            }
            setLoadingAccepter(false);
        } catch (error) {}
    };
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '18%', // Điều chỉnh tỷ lệ
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '15%', // Giảm tỷ lệ
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '10%',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (value) => new Date(value).toLocaleDateString(),
            width: '10%',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            width: '10%',
        },
        {
            title: 'Bằng cấp',
            dataIndex: 'degreeCertificates',
            key: 'degreeCertificates',
            render: (certificates) => (
                <>
                    {certificates.map((certificate, index) => (
                        <Image
                            key={index}
                            src={`${PATH_MEDIA}${certificate}`}
                            alt={`Certificate ${index + 1}`}
                            style={{ width: '50px', height: '50px', marginRight: '5px' }} // Thay đổi kích thước theo nhu cầu
                        />
                    ))}
                </>
            ),
            width: '15%',
        },
        {
            title: 'Lĩnh vực chuyên môn',
            dataIndex: 'expertiseAreas',
            key: 'expertiseAreas',
            render: (areas) => areas.join(', '),
            width: '10%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            render: (record) => (
                <div className="flex space-x-1 justify-evenly">
                    <Tooltip title="Xác nhận">
                        <button onClick={() => handleAccept(record)}>
                            <RiEdit2Line className="text-14 text-primary" />
                        </button>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <button onClick={() => handleShowDialog(record)}>
                            <RiDeleteBinLine className="text-14 text-danger" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="relative">
            <Dialog
                title={'Xóa'}
                content={'Bạn có chắc chắn muốn xóa'}
                handleOk={handleDelete}
                open={open}
                confirmLoading={loading}
                setOpen={setOpen}
            />
            {loadingAccepter && (
                <div className="absolute z-50 m-auto h-[calc(100vh-300px)] w-full flex justify-center items-center">
                    <Spin />
                </div>
            )}
            <Table
                columns={columns}
                dataSource={dataSource}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </div>
    );
}

export default AcceptInstructor;
