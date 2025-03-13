import {useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url:string) => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("0")

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch(err:any) {
                setError(err.message);
            }
           setLoading(false);
        };
        fetchData();
    }, []);
const reFetch = async ()=>{
    setLoading(true)
    try {
        const res = await axios.get(url);
        setData(res.data);
    } catch(err:any) {
        setError(err.message);
    }
   setLoading(false);
};
    return {data, loading, error, reFetch}
};

export default useFetch;