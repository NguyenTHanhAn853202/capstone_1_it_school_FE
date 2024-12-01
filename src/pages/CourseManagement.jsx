import { Flex, Table, Tooltip } from 'antd';
import Container from '~/components/Container';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { faker } from '@faker-js/faker';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import customeSearch from '~/utils/customSearch';
import { pathname } from '~/routes/pathname';
import Dialog from '~/components/Dialog';
import { toastError, toastSuccess } from '~/utils/toasty';
import { get, post } from '~/database';

// const columns = [
//     {
//         title: 'STT',
//         dataIndex: 'id',
//         key: 'id',
//     },
//     {
//         title: 'Tên khóa học',
//         dataIndex: 'name',
//         key: 'name',
//         filterSearch: true,
//         // sortDirections: ['descend'],
//     },
//     {
//         title: 'Loại',
//         dataIndex: 'category',
//         key: 'category',
//     },
//     {
//         title: 'Giá',
//         dataIndex: 'price',
//         key: 'price',
//         sorter: (a, b) => a.price - b.price,
//     },
//     {
//         title: 'Số học viên',
//         dataIndex: 'numberStudents',
//         key: 'numberStudents',
//         sorter: (a, b) => a.numberStudents - b.numberStudents,
//     },
//     {
//         title: 'Mức độ',
//         dataIndex: 'level',
//         key: 'level',
//         filters: [
//             {
//                 text: 'Cao',
//                 value: 'Cao',
//             },
//             {
//                 text: 'Trung bình',
//                 value: 'Trung bình',
//             },
//             {
//                 text: 'Thấp',
//                 value: 'Thấp',
//             },
//         ],
//         onFilter: (value, record) => record.level.indexOf(value) === 0,
//     },
//     {
//         title: 'Thao tác',
//         key: 'action',
//         render: (record) => (
//             <div className="flex space-x-1">
//                 <Link>
//                     <CiEdit className="text-14 text-button_green" />
//                 </Link>
//                 <span>
//                     <RiDeleteBinLine className="text-14 text-button_green" />
//                 </span>
//             </div>
//         ),
//     },
// ];

const data = new Array(30).fill(null).map((item, index) => {
    return {
        key: index,
        name: faker.internet.userName(), // dùng internet.userName() để tạo tên người dùng
        category: faker.helpers.arrayElement(['Toán', 'Vật lý', 'Hóa', 'Sử', 'Lịch sử', 'Ngữ văn']),
        price: faker.finance.amount(100000, 1000000, 0), // finance.amount() tạo số trong khoảng
        numberStudents: faker.number.int({ min: 100, max: 1000 }), // dùng number.int() thay cho random.number()
        level: faker.helpers.arrayElement(['Cao', 'Trung bình', 'Thấp']),
        id: index + 1, // tạo STT dựa vào index của mảng data
    };
});

function CourseManagement() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmLoadings, setConfirmLoadings] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogs, setOpenDialogs] = useState(false);

    const [courseId, setCourseId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseIds, setCourseIds] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const listCourseIds = selectedRows.map((row) => row.id);
            setCourseIds(listCourseIds);
        },
    };

    const handleDeleteCourse = async () => {
        try {
            setConfirmLoading(true);
            // const response = await destroy(`/course/delete-course/${courseId}`);
            const response = await post('/course/delete-course/' + courseId);
            if (response.status === 'ok') {
                toastSuccess('Xóa thành công');
                setCourses((pre) => {
                    return pre.filter((item) => item.id !== courseId);
                });
            } else {
                toastError('Xóa thất bại');
            }
        } catch (error) {
            toastError('Xóa thất bại');
        } finally {
            setConfirmLoading(false);
            setOpenDialog(false);
            setCourseId(null);
        }
    };
    const handleDeleteCourses = async () => {
        try {
            setConfirmLoadings(true);
            // const response = await destroy(`/course/delete-course/${courseId}`);
            const response = await post('/course/delete-courses/', { courseIds: courseIds });
            if (response.status === 'ok') {
                toastSuccess('Xóa thành công');
                setCourses((pre) => {
                    return pre.filter((item) => !courseIds.includes(item.id));
                });
            } else {
                toastError('Xóa thất bại');
            }
        } catch (error) {
            toastError('Xóa thất bại');
        } finally {
            setConfirmLoadings(false);
            setOpenDialogs(false);
            setCourseIds([]);
        }
    };

    const handleShowDialog = (record) => {
        setCourseId(record.id);
        setOpenDialog(true);
    };
    const handleShowDialoglist = () => {
        if (courseIds.length <= 0) {
            toastError('Vui lòng chọn ít nhất một khóa học để xóa');
            return;
        }
        setOpenDialogs(true);
    };

    useEffect(() => {
        (async () => {
            const response = await get('/course/courses');
            if (response.status === 'ok') {
                const data = response.data.map((item, index) => ({
                    key: item._id,
                    name: item.title,
                    category: item.category.name,
                    price: item.price,
                    numberStudents: item.studentNumber,
                    level: item.level,
                    id: item._id,
                }));
                setCourses(data);
            }
        })();
    }, []);
    const columns = [
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
            key: 'name',
            filterSearch: true,
            ...customeSearch(setSearchText, setSearchedColumn, searchInput)('name'),
            width: '40%',
            // sortDirections: ['descend'],
        },
        {
            title: 'Loại',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            width: '15%',
        },
        {
            title: 'Số học viên',
            dataIndex: 'numberStudents',
            key: 'numberStudents',
            sorter: (a, b) => a.numberStudents - b.numberStudents,
            width: '10%',
        },
        {
            title: 'Mức độ',
            dataIndex: 'level',
            key: 'level',
            filters: [
                {
                    text: 'Cao',
                    value: 'ADVANCED',
                },
                {
                    text: 'Trung bình',
                    value: 'INTERMEDIATE',
                },
                {
                    text: 'Thấp',
                    value: 'ELEMENTARY',
                },
            ],
            onFilter: (value, record) => record.level.indexOf(value) === 0,
            width: '10%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',

            render: (record) => (
                <div className="flex space-x-1 justify-evenly">
                    <Tooltip title="Chỉnh sửa">
                        <Link to={pathname.EDITCOURSE + '/' + record.id}>
                            <CiEdit className="text-14 text-button_green" />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <button onClick={() => handleShowDialog(record)}>
                            <RiDeleteBinLine className="text-14 text-button_green" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];
    return (
        <Container>
            <Dialog
                title={'Xóa khóa học'}
                content={'Bạn có chắc chắn muốn xóa khóa học này'}
                open={openDialog}
                setOpen={setOpenDialog}
                handleOk={handleDeleteCourse}
                confirmLoading={confirmLoading}
            />
            <Dialog
                title={'Xóa nhiều khóa học'}
                content={'Bạn có chắc chắn muốn xóa các khóa học này'}
                open={openDialogs}
                setOpen={setOpenDialogs}
                handleOk={handleDeleteCourses}
                confirmLoading={confirmLoadings}
            />
            <h1>Danh sách khóa học</h1>
            <Flex gap="middle" className="my-3">
                <Button onClick={handleShowDialoglist} styles="!text-10 !w-[80px] !py-0 !h-[30px]">
                    Xóa
                </Button>
                <Link to={pathname.CREATECOURSE} className="bg-button_green text-white px-2 leading-[30px] rounded-2xl">
                    Thêm khóa học
                </Link>
            </Flex>
            <Table
                columns={columns}
                dataSource={courses}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
            />
        </Container>
    );
}

export default CourseManagement;
