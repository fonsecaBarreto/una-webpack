import { useEffect } from 'react'
import './app.css'

export const MyApplication = () =>{

    const myPromise = () =>{
        return new Promise((res)=>{
            setTimeout(() => {
                console.log("done?")
                return res(true);
            }, 2000);
        })
    }

    const test = async () => {
        console.log("this will wait for the execution of a promise")
        await myPromise();
    }

    useEffect(()=>{
        test();
        console.log("I will try to use a async function")
    },[])


    return (
        <div> Testando aqui </div>
    )
}

export default MyApplication