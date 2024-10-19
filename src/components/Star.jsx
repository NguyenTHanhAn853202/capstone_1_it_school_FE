import { FaStar } from 'react-icons/fa';

const listStar = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
function Star({ starNumber = 0, style, setStarNumber }) {
    const handleClickStar = (id) => {
        setStarNumber && setStarNumber((preNumber) => (preNumber === id ? 0 : id));
    };
    return (
        <ul className={`flex gap-[2px] ${style}`}>
            {listStar.map((item, index) => (
                <li className="h-[16px] flex items-center">
                    <button onClick={() => handleClickStar(item.id)}>
                        <FaStar className={`${starNumber < item.id ? 'text-silver' : 'text-gold'}`} />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Star;
