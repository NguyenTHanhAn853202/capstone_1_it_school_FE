import { useEffect, useRef, useState } from 'react';
import { get, post } from '~/database';

function Home() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState(0);
    const ipRef = useRef();
    useEffect(() => {
        (async () => {
            try {
                const data = await get('/product/get-products');
                if (data?.data) {
                    setData(data.data);
                    console.log(data.data);
                    // ref.current.value = data.data[0].number; // set initial value
                }
            } catch (error) {
                console.log(error);
            }
        })();

        // (async()=>{

        // })()


    }, []);
    const handleChangeValue = (e) => {
        // console.log(e.target.value);
        // const inputValue = e.target.value;
        // // setValue(inputValue)
        // console.log(ref.current.value);
        // ref.current.value = inputValue;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;
        const data = await post('/create-user', {
            name: name,
            number: number,
        });
        setName('');
        setNumber('');
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    return (
        <div>
            {/* {data.map((item, index) => {
                return (
                    <div key={index}>
                        <h1>{item?.name}</h1>
                        <input ref={ipRef} onChange={handleChangeValue} className="outline" value={item.number} />
                    </div>
                );
            })} */}
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input onChange={handleChangeName} value={name} className="outline" />
                <label>Number</label>
                <input onChange={(e) => setNumber(e.target.value)} value={number} className="outline" type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Home;

/*

    {
        "_id": "66c586d89d221f2f545b2820",
        "billId": "HL02",
        "itemId": "SP02",
        "name": "ca canh",
        
    },
    {
        "_id": "66c5874f9d221f2f545b2833",
        "billId": "KH02",
        "itemId": "KH100",
        "name": "ca canh",
        
    },


*/
