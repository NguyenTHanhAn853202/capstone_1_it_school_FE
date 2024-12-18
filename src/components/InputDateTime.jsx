import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function InputDateTime({ startDate, setStartDate, placeholder = '', width }) {
    const [defaultDate, setDefaultDate] = useState(null);

    useEffect(() => {
        if (startDate) {
            setDefaultDate(dayjs(startDate)); // Chuyển đổi startDate thành đối tượng dayjs
        } else {
            setDefaultDate(null); // Nếu không có startDate, đặt giá trị mặc định là null
        }
    }, [startDate]);

    return (
        <DatePicker
            width={width && ''}
            className="w-[370px] border border-solid border-dark px-sm rounded-md text-[1rem] h-[37px]"
            format="DD/MM/YYYY"
            disabledDate={(current) => current && current > dayjs()} // Chặn chọn ngày vượt quá hôm nay
            placeholder={placeholder}
            onChange={(date) => setStartDate(date ? date.toDate() : null)} // Chuyển đổi về Date khi thay đổi giá trị
            value={defaultDate} // Sử dụng value thay vì defaultValue để đồng bộ
        />
    );
}

export default InputDateTime;
