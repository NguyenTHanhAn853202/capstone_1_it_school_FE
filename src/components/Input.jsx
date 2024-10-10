import { forwardRef } from 'react';

function Input({ label = '', placeholder = '', value = '', type = 'text', style, ...props }, ref) {
    return (
        <div>
            {label && <label className="block">{label}</label>}
            <input
                type={type}
                className={`border border-solid border-dark px-sm rounded-md w-[370px] h-[37px] text-[1rem] ${style}`}
                value={value}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />
        </div>
    );
}

export default forwardRef(Input);
