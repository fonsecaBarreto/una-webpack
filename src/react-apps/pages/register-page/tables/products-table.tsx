import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { produtosService, produtosServices } from '@/services/api/produtos-service'
import { departamentosService } from '@/services/api/departamentos-service'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setDepartamentos } from '@/react-apps/store/reducers/departaments/actions'
import { CsvProdutosDTo_schema, product_headers_schema } from '../schemas'

export namespace ProductsTable {
    export type Params = {
        override_data?: any[] | null
    }
}

export const ProductsTable: React.FunctionComponent<ProductsTable.Params> = ({override_data}) =>{
    
    const dispatch = useDispatch()
    const [ productData, setProductData ] = useState<any[]>([])
    const { departaments_struct, departaments_struct_loadtry } = useSelector((state: any) => state.departamentos)
    const [ productsConflicts, setProductsConflicts] = useState<any>({})
    const [ productsCheckList, setProductsCheckList ] = useState<any>({})
    const [ submitData, setSubmitData ] = useState(false)
    const context = useContext(GlobalContext)

    /* hooks */

    /* Deve checar se ja foi baixado os departamnetos no redux, do contratio sera baixo asincronamente */
    useEffect(()=>{
        if(departaments_struct_loadtry == 0){
            departamentosService.list().then(struct =>{dispatch(setDepartamentos(struct))});
            return;
        }
        product_headers_schema[2].list = departaments_struct.brands;
        product_headers_schema[3].list = departaments_struct.subCategories;
        product_headers_schema[4].list = departaments_struct.presentations;
    },[departaments_struct])

    /* Todas Vez que houver uma nova inserção sera questionado se os dados devem ser sobrescrito ou concatenado */
    useEffect(()=>{ 
        if(!override_data) return setProductData([{}]) // Um item vazio
        context.dialog.push(MakeNotification((v)=>{
            if(v == 0 ){ setProductData(override_data) }
            else if(v == 1){ setProductData((prev:any[])=>([ ...override_data, ...prev ])) }
            return -1
        },["Deseja sobrescrever os dados existentes?"], "Atenção", NotificationType.CONFIRMATION))
    },[ override_data ])

    /* Salvar Produtos */
    const submitSaveProducts = async (data: any) =>{

        console.log(data);
       
        return setSubmitData(false)

        var checkList = Object.keys(productsCheckList)
        var raw_list = data.filter((d: any)=>!checkList.includes(d._id))
        var productDtos: produtosServices.AddProduct_dto[] = raw_list.map((d:any)=>{
            const { _id, ean, ncm, sku, specification } =d 
            const brand_id = d.brand.value
            const presentation_id = d.presentation.value
            const sub_category_id = d.category.value
            var dto: produtosServices.AddProduct_dto = { _id, ean, ncm, sku, specification, brand_id, presentation_id, sub_category_id }
            return dto;
        })

        // Serializar a data e tranformar o labelView em brand_id, presenda se etc...
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
            setSubmitData(false)
    }

    return (
        <div>

            <MultiplesForms 
                conflicts={productsConflicts}
                checkList={productsCheckList}
                trigger_data={submitData} 
                emitData={submitSaveProducts} 
                schema={CsvProdutosDTo_schema} 
                headers={product_headers_schema} 
                entries={productData} 
                dialogContext={context.dialog}>
            </MultiplesForms>

            <button className="una-submit-button" onClick={()=>setSubmitData(true)}> 
                Salvar 
            </button>
                
        </div>
    )

}

export default ProductsTable