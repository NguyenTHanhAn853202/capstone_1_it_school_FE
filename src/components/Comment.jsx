import { useState } from 'react';
import Star from './Star';
import { BsSend } from 'react-icons/bs';

function Comment() {
    const [starNumber, setStarNumber] = useState(0);
    return (
        <div className="flex justify-center">
            <div className="w-[50%] border border-spacing-[1px] border-black rounded-xl pt-1 pb-3 px-3 space-y-1">
                <div className="flex gap-2 items-center">
                    <h4>Nội dung</h4>
                    <Star starNumber={starNumber} setStarNumber={setStarNumber} />
                </div>
                <div className="flex items-center border border-spacing-[1px] justify-evenly border-black rounded-lg overflow-hidden gap-2 px-4">
                    <input type="text" className="flex-1 h-[40px]" placeholder="Nhập nội dung" />
                    <button>
                        <BsSend className="text-14" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comment;
