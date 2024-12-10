import { Table, Tooltip } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function AcceptInstructor() {
    const handleShowDialog = () => {};
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
            render: (certificates) => certificates.join(', '),
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
                    {/* <Tooltip title="Chỉnh sửa">
                        <button onClick={() => handleEdit(record)}>
                            <RiEdit2Line className="text-14 text-primary" />
                        </button>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <button onClick={() => handleShowDialog(record)}>
                            <RiDeleteBinLine className="text-14 text-danger" />
                        </button>
                    </Tooltip> */}
                </div>
            ),
        },
    ];
    const dataSource = [
        {
            email: 'nguyenvana@example.com',
            fullName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            dateOfBirth: '1990-01-01',
            cccd: '123456789012',
            degreeCertificates: ['Cử nhân Công nghệ Thông tin', 'Thạc sĩ AI'],
            expertiseAreas: ['Lập trình Web', 'Machine Learning'],
        },
        {
            email: 'tranthib@example.com',
            fullName: 'Trần Thị B',
            phoneNumber: '0987654321',
            dateOfBirth: '1992-02-15',
            cccd: '098765432109',
            degreeCertificates: ['Cử nhân Kinh tế', 'Chứng chỉ Digital Marketing'],
            expertiseAreas: ['SEO', 'Marketing Online'],
        },
        {
            email: 'phamc@example.com',
            fullName: 'Phạm C',
            phoneNumber: '0345678912',
            dateOfBirth: '1985-03-10',
            cccd: '567890123456',
            degreeCertificates: ['Cử nhân Kế toán'],
            expertiseAreas: ['Kế toán tài chính'],
        },
    ];

    return (
        <div>
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
