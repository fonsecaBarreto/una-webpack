import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeNotification, NotificationType, OnActionFunction } from 'fck-react-dialog'
import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { produtosService, produtosServices } from '@/services/api/produtos-service'
import { departamentosService } from '@/services/api/departamentos-service'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setDepartamentos } from '@/react-apps/store/reducers/departaments/actions'
import { CsvSupliesDTo_schema, suply_headers_schema } from '../schemas'

export namespace SuplyTable {
    export type Params = {
        override_data?: any[] | null
    }
}

export const SuplyTable: React.FunctionComponent<SuplyTable.Params> = ({override_data}) =>{
    const context = useContext(GlobalContext)
    const dispatch = useDispatch()
    const [ supliesData, setSupliesData ] = useState<any[]>([{}])
    const [ supliesConflicts, setSupliesConflicts] = useState<any>({})
    const [ supliesCheckList, setSupliesCheckList ] = useState<any>({})
    const [ submitData, setSubmitData ] = useState(false)

    useEffect(()=>{ setSupliesData( override_data ?? [{}]) },[override_data])

    const submitSaveSuplies = async (data: any) =>{

      /*   var checkList = Object.keys(productsCheckList)
        var raw_list = data.filter((d: any)=>!checkList.includes(d._id))
        var productDtos: produtosServices.AddProduct_dto[] = raw_list.map((d:any)=>{
            const { _id, ean, ncm, sku, specification } =d 
            const brand_id = d.brand.value
            const presentation_id = d.presentation.value
            const sub_category_id = d.category.value
            var dto: produtosServices.AddProduct_dto = { _id, ean, ncm, sku, specification, brand_id, presentation_id, sub_category_id }
            return dto;
        })

        try{
            var { conflicts, results }= await produtosService.save_mutiples({products: productDtos})
            setProductsCheckList((prev: any)=> ({ ...prev, ...results}) );
            if(Object.keys(conflicts).length > 0){
                context.dialog.push( MakeNotification(()=>-1,["Certifique conflitos","Certifique-se de que todos os dados são validos"],  "Atenção", NotificationType.FAILURE),)
                var flicts = { ...conflicts}
             
                Object.keys(flicts).map(f=>{
                    const c = flicts[f];
                    if(c.brand_id){ c.brand = c.brand_id; delete c.brand_id}
                    if(c.presentation_id){ c.presentation = c.presentation_id; delete c.presentation_id}
                    if(c.sub_category_id){ c.category = c.sub_category_id; delete c.sub_category_id}
                    return c
                })
                setProductsConflicts(conflicts);
            }
        }catch(err){ console.log("err", err) }
        setSubmitData(false) */
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