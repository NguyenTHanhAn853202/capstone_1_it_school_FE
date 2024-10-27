import { CiFileOn } from 'react-icons/ci';
function UplaoadedFileCard({ fileName, perLoad, size }) {
    const wSize = `w-[${perLoad}%]`;
    return (
        <div className="relative w-full flex bg-ip_dark rounded-lg px-2 font-extralight py-2 border border-ip_dark outline-none  shadow-shadow shadow-md ">
            <span className="block w-[10%]">
                <CiFileOn className="text-14" />
            </span>
            <div className="w-[90%] ">
                <p className="text-ellipsis truncate">{fileName}</p>
                <span className="block text-[0.8rem] opacity-60">{size}</span>
                <div className="flex items-center h-[10px]">
                    <div className="relative w-[80%] mr-3">
                        <div className="bg-silver h-[5px] rounded-sm absolute w-full"></div>
                        <div className={`bg-button_green h-[5px] rounded-sm absolute ${wSize}`}></div>
                    </div>
                    <span className="text-[0.7rem] opacity-60">{perLoad + '%'}</span>
                </div>
            </div>
        </div>
    );
}

export default UplaoadedFileCard;
