import { useRef, useState, useEffect } from "react";

const UseTrigger =() =>{

    const [ trigger, setTrigger ] = useState(false);
    const triggerRef = useRef(trigger);
    const data = useRef<any>(null);
    const callback = useRef<any>(null)

    useEffect(()=>{
        if(trigger === true){
            new Promise(async res=>{
                data.current = (callback?.current) && await callback.current()
                setTrigger(false)
                triggerRef.current = false;
                return res(true)
            })
        }
    },[trigger])

    const execute = async () =>{
        var trigger = triggerRef.current = true
        setTrigger(trigger);

        while(triggerRef.current == true){
            await new Promise(res=>{ setTimeout(()=>res(true),300)})
        }

        var trigger = triggerRef.current = false
        setTrigger(trigger);
        return data.current
    }
    
    const setCallBack = (cb: any) =>{
        callback.current = () => cb()
    }
    
    return { execute, setCallBack }
}

export default UseTrigger