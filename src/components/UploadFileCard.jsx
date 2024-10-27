import { useId } from 'react';

function UploadFileCard({ title, icon, description, multiple = false, accept = 'all', ...props }) {
    const id = useId();
    return (
        <div>
            <h2>{title}</h2>
            <label htmlFor={id} className="border border-dashed h-[100px] rounded-lg flex items-center ">
                <div className="w-full">
                    <p className="flex justify-center">{icon}</p>
                    <p className="text-center">{description}</p>
                </div>
            </label>
            <input id={id} {...props} type="file" multiple={multiple} accept={accept} className="hidden" />
        </div>
    );
}

export default UploadFileCard;
