import React from "react";
import { useEffect } from 'react'
import BlueLagumLayout from '../../components/Layouts/BlueLagum' 
import DeparamentoPage from "./pages/Departamento";
export const MyApplication = () =>{
    return (
       <BlueLagumLayout> 
           <DeparamentoPage></DeparamentoPage>
       </BlueLagumLayout>
    )
}

export default MyApplication