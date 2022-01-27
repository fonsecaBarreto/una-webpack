import { Validator, ValidationSchema } from 'fck-schema-validator'
import React, { useEffect, useState } from 'react'
import './style.css'
import { CsvProdutosDTo_schema } from './schemas'
export namespace  TableFrame {
    export type ProdutoDto = {
        ean: string, 
        ncm: string, 
        sku: string, 
        especificacao: string, 
        marca: string, 
        categoria: string, 
        apresentacao: string 
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

    const handleInputs =(key: string, line: number, value: any) =>{

        setProdutos((prev: any)=>{
            var prev_produtos: any[] = [ ...prev];
            prev_produtos[line][key]=value
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


    return (
        <div className='csv-reader-table-frame'>
            
            <table >
                {JSON.stringify(errors)}
                <tr>
                    <th> EAN *</th>
                    <th>Especificação *</th>
                    <th>Marca *</th>
                    <th>Categoria *</th>
                    <th>Apresentacao *</th>
                    <th>NCM</th>
                    <th>SKU</th>
                </tr>
                {
                    produtos.length > 0 && produtos.map((d: any, i :number)=>{
                        return (
                            <tr>
                                {
                                    Object.keys(d).map((key: any) =>{
                                            return (
                                            <td>                
                                                <input value={d[key]} onInput={(e: any)=>{
                                                    handleInputs(key,i,e.target.value)
                                                }}></input>
                                            </td>
                                            )
                                    })
                                }
                            </tr>
                        )
                    })
                }

            </table>


        </div>
    )
}


export default TableFrame