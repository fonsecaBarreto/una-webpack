import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeNotification, NotificationType, OnActionFunction } from 'fck-react-dialog'
import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { SuppliesServices, suppliesServices } from '@/services/api/supplies-services'
import { CsvSupliesDTo_schema, suply_headers_schema } from '../schemas'

export namespace SuplyTable {
    export type Params = {
        override_data?: any[] | null
    }
}

export const SuplyTable: React.FunctionComponent<SuplyTable.Params> = ({override_data}) =>{
    const context = useContext(GlobalContext)
    const [ supliesData, setSupliesData ] = useState<any[]>([{}])
    const [ supliesConflicts, setSupliesConflicts] = useState<any>({})
    const [ supliesCheckList, setSupliesCheckList ] = useState<any>({})
    const [ submitData, setSubmitData ] = useState(false)

    useEffect(()=>{ setSupliesData( override_data ?? [{}]) },[override_data])

    const submitSaveSuplies = async (data: any) =>{

        var checkList = Object.keys(supliesCheckList);
        var splicedList = data.filter((d: any)=>!checkList.includes(d.ean))

        /* Caso seja preciso serailizar alguma informação */
        var supplies: SuppliesServices.SaveSupply_dto[] = splicedList.map((supply:any)=>{
            return { ...supply};
        })

        try{
            var { conflicts, results } = await suppliesServices.save_multiples({supplies})
            setSupliesCheckList((prev: any)=> ({ ...prev, ...results}) );
            if(Object.keys(conflicts).length > 0){
                context.dialog.push( MakeNotification(()=>-1,["Certifique conflitos","Certifique-se de que todos os dados são validos"],  "Atenção", NotificationType.FAILURE),)
                setSupliesConflicts(conflicts);
            }
        }catch(err){ console.log("err", err) }

        setSubmitData(false) 
    }

    return (<div>
        <MultiplesForms 
            conflicts={supliesConflicts}
            checkList={supliesCheckList}
            dataTrigger={submitData} 
            getData={submitSaveSuplies} 
            schema={CsvSupliesDTo_schema} 
            headers={suply_headers_schema} 
            entry={supliesData} 
            dialogContext={context.dialog}>
        </MultiplesForms>

        <button className="una-submit-button" onClick={()=>setSubmitData(true)}> Salvar </button>
               
    </div>)

}

export default SuplyTable