import { useRef, useState } from "react";

export const UseCounter = ()=>{
    const [ syncCount, setSyncCount ] = useState(0)
    const syncCountRef = useRef(syncCount)

    const setCount = (value:number) =>{
        syncCountRef.current = value;
        setSyncCount(value);
    }

    const getCount = () =>{
        return syncCountRef.current
    }
    
    return ({ getCount, setCount, hook:syncCount })
}

export default UseCounter

