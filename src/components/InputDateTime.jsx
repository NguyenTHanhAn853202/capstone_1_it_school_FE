import DatePicker from 'react-datepicker';
import Input from './Input';
import { useState } from 'react';

function InputDateTime({ children, startDate, setStartDate, placeholder = '' }) {
    return (
        <DatePicker
            className="w-[370px] border border-solid border-dark px-sm rounded-md text-[1rem] h-[37px]"
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            placeholderText={placeholder}
            onChange={(date) => setStartDate(date)}
            selected={startDate}
        />
    );
}

export default InputDateTime;
