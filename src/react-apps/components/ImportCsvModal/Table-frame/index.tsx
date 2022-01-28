import { Validator, ValidationSchema } from 'fck-schema-validator'
import React, { useEffect, useState } from 'react'
import './style.css'
import { CsvProdutosDTo_schema } from './schemas'


import TableFrameRow from './TableFrameRow'

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
    }

    useEffect(()=>{
        if(!dto) return
        setProdutos(dto)
    },[dto])

    useEffect(()=>{
        vaidate(produtos)
    },[produtos])


    const lineHaError =(errors: any, line: number) =>{
        
        if(errors.length > 0 ){
            const hadError = errors.find( (e: TableFrame.Error) =>e.line === line);
            if(hadError) return hadError?.params ?? []
        }

        return []
    }

    return (
        <div className='csv-reader-table-frame'>
            
            <table >

                <tr>
                    <th>EAN *</th>
                    <th>Especificação *</th>
                    <th>Marca *</th>
                    <th>Categoria *</th>
                    <th>Apresentacao *</th>
                    <th>NCM</th>
                    <th>SKU</th>
                </tr>
                {
                    produtos.length > 0 && produtos.map((product_dto: any, i :number)=>{
                        var doeslineHasError = lineHaError(errors, i)
                        return (
                            <TableFrameRow key={i} line={i} dto={product_dto} errors={doeslineHasError} onInput={handleInputs} ></TableFrameRow>
                        )
                    })
                }

            </table>


        </div>
    )
}






export default TableFrame