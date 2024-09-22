import axios from 'axios';

const configAxios = axios.create({
    baseURL: 'http://localhost:3100',
    timeout: 5000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export const get = async (url, option = {}) => {
    try {
        console.log(url);
        return await configAxios.get(url, option);
    } catch (error) {
        console.log(url);
        return error.message;
    }
};
export const post = async (url, body, option = {}) => {
    try {
        console.log(url);
        return await configAxios.get(url, body, option);
    } catch (error) {
        console.log(url);
        return error.message;
    }
};


const a = [
    {
        name: 'hello world'
    },
    {
        name: 'hello world1'
    }
]

const callback = ()=>{}

a.map((item,index)=>{
    console.log(item.name);
    
})
