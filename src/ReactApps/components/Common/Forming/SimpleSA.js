import React, { useState } from "react"

/* 
    Adaptador de Estado, simples para formularios
*/

export const SimpleSA = (initial_data) =>{
 
    const [ data, setData ] = useState({ ...initial_data })
    const [ errors, setErrors ]= useState({})
    const [ loading, setLoading ] = useState(false)

    const handleInputs = (key,value, capital) => {
        if(capital){
            value = value.replace(/\b\w/g, c => c.toUpperCase());
        }
        setData(prev => ({  ...prev,  [key]:value  }))
    }

    return {
        data: {
            get: data, set: setData, handleInputs, 
            clear: () => setData({ ...initial_data })
        },
        errors: { 
            get: errors, set: setErrors , clear: () => {setErrors({ })},
        },
        loading: { 
            get:loading, set: setLoading 
        },
    }
 
}

export default SimpleSA