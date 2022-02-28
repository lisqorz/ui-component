import {useEffect, useState} from "react";

function useDebounce(value: any, delay = 300) {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
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