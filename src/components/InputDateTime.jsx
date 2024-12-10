import DatePicker from 'react-datepicker';
import Input from './Input';
import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function InputDateTime({ children, startDate, setStartDate, placeholder = '' }) {
    const currentDate = dayjs().format('DD/MM/YYYY');
    console.log(currentDate);

    return (
        <DatePicker
            className="w-[370px] border border-solid border-dark px-sm rounded-md text-[1rem] h-[37px]"
            dateFormat="dd/MM/YYYY"
            maxDate={dayjs(currentDate, 'dd/MM/YYYY')}
            placeholderText={placeholder}
            onChange={(date) => setStartDate(date)}
            selected={startDate}
        />
    );
}

export default InputDateTime;
