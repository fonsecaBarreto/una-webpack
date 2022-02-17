import { useEffect, useRef, useState } from "react";

export const useData = (initial_data:any)=>{
    const [ data, setData ] = useState<any>(initial_data)
    const dataRef = useRef(data)
    const set = (value:any) =>{
        dataRef.current = value;
        setData(value);
    }
    const get = () =>  dataRef.current

    return ({ get, set, hook: data })
}