import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { produtosService, produtosServices } from '@/services/api/produtos-service'
import { departamentosService } from '@/services/api/departamentos-service'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { setDepartamentos } from '@/react-apps/store/reducers/departaments/actions'
import { CsvProdutosDTo_schema, product_headers_schema } from '../schemas'
import UseTrigger from '@/react-apps/components/utils/UseTrigger'

export namespace ProductsTable {
    export type Params = {
        override_data?: any[] | null,
        trigger: any
    }
}

/* Departamentos */
const loadDepartaments = () =>{
    const dispatch = useDispatch()
    const { departaments_struct, departaments_struct_loadtry } = useSelector((state: any) => state.departamentos)
    useEffect(()=>{
        if(departaments_struct_loadtry == 0){
            departamentosService.list().then(struct =>{dispatch(setDepartamentos(struct))});
            return;
        }
        product_headers_schema[2].list = departaments_struct.brands;
        product_headers_schema[3].list = departaments_struct.subCategories;
        product_headers_schema[4].list = departaments_struct.presentations;
    },[departaments_struct])

    return{ departaments_struct }
}

export const ProductsTable: React.FunctionComponent<ProductsTable.Params> = ({ override_data, trigger }) =>{

    const saveTrigger = UseTrigger();
    const context = useContext(GlobalContext)
    const [ products, setProducts ] = useState<any[]>([])
    const [ conflicts, setConflicts] = useState<any>({})
    const [ checkList, setCheckList ] = useState<any>({})
    loadDepartaments()

    /* Qual houver um gatilho deve executar a função de salvar */
    useEffect(()=> trigger.setCallBack( () => saveTrigger.execute().then(submitProducts)), [])

    /* Ao perceber a entrada de dados */
    useEffect(()=>{ 
        if(!override_data) return setProducts([{}]) // Um item vazio

        context.dialog.push(MakeNotification((v)=>{

            if(v == 0 ){ setProducts(override_data) }
            else if(v == 1){ setProducts((prev:any[])=>([ ...override_data, ...prev ])) }
            return -1

        },["Deseja sobrescrever os dados existentes?"], "Atenção", NotificationType.CONFIRMATION))

    },[ override_data ])

    /* Salvar Produtos */
    const submitProducts = async (data: any) =>{

        var _checkList_keys = Object.keys(checkList)

        var final_products = data.filter((d: any)=>!_checkList_keys.includes(d._id)).map((d:any)=>{
            const { _id, ean, ncm, sku, specification, brand, presentation, category } =d 
            var dto: produtosServices.AddProduct_dto = { 
                _id, ean, ncm, sku, specification, brand_id: brand.value, presentation_id: presentation.value, sub_category_id: category.value
            }
            return dto;
        })

        try{
            var { conflicts, results } = await produtosService.save_mutiples({products: final_products})

            setCheckList((prev: any)=> ({ ...prev, ...results}) );

            if(Object.keys(conflicts).length > 0){
                context.dialog.push( MakeNotification(()=>-1, ["Certifique conflitos","Certifique-se de que todos os dados são validos"],  "Atenção", NotificationType.FAILURE),)
                
                var flicts = { ...conflicts}
                
                Object.keys(flicts).map(f=>{
                    const c = flicts[f];
                    if(c.brand_id){ c.brand = c.brand_id; delete c.brand_id}
                    if(c.presentation_id){ c.presentation = c.presentation_id; delete c.presentation_id}
                    if(c.sub_category_id){ c.category = c.sub_category_id; delete c.sub_category_id}
                    return c
                })

                setConflicts(conflicts);
            }

        }catch(err){ console.log("err", err) } 
    }

    return (
        <div>
            <MultiplesForms 
                entries={products}
                conflicts={conflicts}
                checkList={checkList}
                trigger={saveTrigger}
                schema={CsvProdutosDTo_schema} 
                headers={product_headers_schema}>
            </MultiplesForms>    
        </div>
    )
}

export default ProductsTable