import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeNotification, NotificationType, OnActionFunction } from 'fck-react-dialog'
import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { SuppliesServices, suppliesServices } from '@/services/api/supplies-services'
import { CsvSupliesDTo_schema, suply_headers_schema } from './schemas'
import UseTrigger from '@/react-apps/components/utils/UseTrigger'

export namespace SuplyTable {
    export type Params = {
        override_data?: any[] | null,
        trigger: any
    }
}

export const SuplyTable: React.FunctionComponent<SuplyTable.Params> = ({override_data, trigger}) =>{
    

    const saveTrigger = UseTrigger();
    const context = useContext(GlobalContext);
    const [ supplies, setSupplies ] = useState<any[]>([{}])
    const [ conflicts, setConflicts] = useState<any>({})
    const [ checkList, setCheckList ] = useState<string[]>([])

    useEffect(()=> trigger.setCallBack( () => saveTrigger.execute().then(submitSaveSuplies)), [])

    /* Ao perceber a entrada de dados */
    useEffect(()=>{ 
        if(!override_data) return setSupplies([{}]) // Um item vazio
        context.dialog.push(MakeNotification((v)=>{
            if(v == 0 ){ setSupplies(override_data) }
            else if(v == 1){ setSupplies((prev:any[])=>([ ...override_data, ...prev ])) }
            return -1
        },["Deseja sobrescrever os dados existentes?"], "Atenção", NotificationType.CONFIRMATION))
    },[ override_data ])

    /* Salvar Fornecimento */
    const submitSaveSuplies = async ({data, conflicts, checkList}:any) =>{
        console.log("data:", data,"\nconflitos: ", conflicts,"\n check:", checkList)
        var allowed_supplies = data.filter((d: any)=> !checkList.includes(d._id))
        
        /* Caso seja preciso serailizar alguma informação */
        var final_supplies: SuppliesServices.SaveSupply_dto[] = allowed_supplies.map((supply:any)=>{
            return { ...supply};
        })

        if(final_supplies.length > 0 ){
            try{
                var { conflicts, results } = await suppliesServices.save_multiples({supplies: final_supplies})
                
                if(Object.keys(conflicts).length > 0){
                    context.dialog.push( MakeNotification(()=>-1,["Certifique conflitos","Certifique-se de que todos os dados são validos"],  "Atenção", NotificationType.FAILURE),)
  
                }
                
                setConflicts(conflicts ?? {});
                setCheckList((prev: any)=> ([ ...prev, ...Object.keys(results)]) );

            }catch(err){ console.log("err", err) }
        } else{
            context.dialog.push( 
                MakeNotification( ()=> -1 , [ "Opa!", "Nenhum item encontrado", "Verifique as entradas" ], "Atenção", NotificationType.INFO)
            ) 
        }
    }

    return (
            <MultiplesForms 
                entries={supplies} 
                conflicts={conflicts}
                checkList={checkList}
                trigger={saveTrigger}
                schema={CsvSupliesDTo_schema} 
                headers={suply_headers_schema} >
            </MultiplesForms>
        )

}

export default SuplyTable