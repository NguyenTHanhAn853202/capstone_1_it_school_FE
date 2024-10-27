import { useId, useMemo } from 'react';

function InputNoBorder({ value, lable, type, placeholder, tagType, style, icon, ...props }) {
    const id = useId();
    const Tag = useMemo(() => {
        switch (tagType) {
            case 'textarea':
                return 'textarea';
            default:
                return 'input';
        }
    }, [tagType]);
    return (
        <div className="flex flex-col">
            {lable && (
                <label htmlFor={id} className="text-sm text-gray-600">
                    {lable}
                </label>
            )}
            <Tag
                {...props}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                className={`${style} bg-ip_dark rounded-lg h-[40px] px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md `}
            />
        </div>
    );
}

export default InputNoBorder;
