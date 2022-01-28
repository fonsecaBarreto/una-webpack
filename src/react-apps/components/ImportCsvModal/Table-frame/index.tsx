import React, { ReactNode, useEffect, useState, useContext} from 'react'
import { Validator, ValidationSchema } from 'fck-schema-validator'
import './style.css'
import { CsvProdutosDTo_schema } from './schemas'
import FrameColumn from './FrameColumn'
import { RiErrorWarningFill } from 'react-icons/ri'
import globalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import NewProductModal from '../NewProductModal'
import { MdOpenInNew } from 'react-icons/md'

export namespace  TableFrame {
    export type ProdutoDto = {
        ean: string, 
        ncm: string, 
        sku: string, 
        specification: string, 
        brand_name: string, 
        category_name: string, 
        presentation_name: string 
    }
    export type Params = {
        dto: ProdutoDto[]
    }
    export type Error ={
        line: number,
        params: any[]
    }
}

const validator = new Validator()

const renderRows = ( rows:number, contents: ReactNode[], errors: any[] =[]) => {   

    const context = useContext(globalContext)

    const openNewProductModal = () =>{
        return context.dialog.push(MakeDialogConfig( () =><NewProductModal dto={{sdad: "asdasd"}}/>, ()=>{
            console.log("done")
        }))
    }

    return(
        <React.Fragment>
            <button className={`csv-reader-table-frame-action-btn ${errors.length > 0 ? "table-warning": ""}` }onClick={()=>openNewProductModal()}> 
                { errors.length > 0 ?   <RiErrorWarningFill/> : <MdOpenInNew/>  }
            </button>
    
            {    [...Array(rows)].map((h: any, i: number)=>{
                return (
                    <div className='csv-reader-table-frame-content-cell' key={i}>
                        {contents[i]}
                    </div>
                )
            })}
        </React.Fragment>)
}

/* Ao clicar no erro ele vai abrir um modal pra editar as linhas separadamente */

export const TableFrame: React.FunctionComponent<TableFrame.Params> = ({ dto }) =>{
  
    const [ produtos, setProdutos ] = useState<TableFrame.ProdutoDto[]>([])
    const [ errors, setErrors ] = useState<TableFrame.Error[]>([])

   

    const handleInputs =(name: string, line: number, value: any) =>{
         setProdutos((prev: any)=>{
            var prev_produtos: any[] = [ ...prev];
            prev_produtos[line][name]=value 
            return (prev_produtos )
        })
    }

    const vaidate = async (produtos: TableFrame.ProdutoDto[]) => {
        await Promise.all( (produtos).map( async (p: TableFrame.ProdutoDto, i :number)=>{
            const errs = await validator.validate(CsvProdutosDTo_schema, p)
            if(errs){
                setErrors( (prev: any ) => [ ...prev, { line: i, params: errs } ] )
            }
        }))
        /* O produto sera sanitizado por referencia mas o UseState precisa ser atualicado */
       setProdutos(produtos)
    }

    useEffect(()=>{
        if(!dto) return;
        vaidate(dto)
    },[dto])
/* 
    useEffect(()=>{ console.log("produto atualizado", produtos)},[produtos]) */

    const lineHaError =(errors: any, line: number) =>{
        
        if(errors.length > 0 ){
            const hadError = errors.find( (e: TableFrame.Error) =>e.line === line);
            if(hadError) return hadError?.params ?? []
        }

        return []
    }

    const headers = [ "EAN *", "Especificação *", "Marca *", "Categoria *", "Apresentaçao *", "NCM", "SKU"]
    return (
        <div className='csv-reader-table-frame'>
           <section className='csv-reader-table-frame-content' style={{ gridTemplateColumns: `auto repeat(${headers.length}, 1fr)`}}>
                { renderRows(headers.length, headers.map(h=><span>{h}</span>))}
                {produtos.map((p: any, i: number)=>{
                    let lineErrors = lineHaError(errors, i)
                    return ( renderRows(headers.length,Object.keys(p).map((name: string, j: number)=>{ 
                        return (
                        <FrameColumn key={j} line={i} error={lineErrors[name]} value={ p[name]} name={name} onInput={handleInputs}></FrameColumn>)
                    }), lineErrors))
                })}
           </section>
        </div>
    )
}
export default TableFrame