import { MdExpandLess } from 'react-icons/md';
function ShowMore({ title, more, style, ...props }) {
    return (
        <button {...props} className={`flex gap-[5px] justify-center items-center italic opacity-50 ${style}`}>
            {title}
            <MdExpandLess className={`text-normal ${more ? '' : 'rotate-180'} transition-transform`} />
        </button>
    );
}

export default ShowMore;
