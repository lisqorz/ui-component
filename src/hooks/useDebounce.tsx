import {useEffect, useState} from "react";

function useDebounce(value: any, delay = 300) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        console.log('触发3');
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounce
}


export default useDebounce