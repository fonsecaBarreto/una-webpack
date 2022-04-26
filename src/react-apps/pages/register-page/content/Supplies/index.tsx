import React, { useContext, useEffect, useState } from 'react'
import TableForms from "fck-table-forms"
import CsvModal from '@/react-apps/components/ImportCsvModal'
import { UseSearchAdapter } from '@/react-apps/components/SearchAdapter'
import { ContextReplacementPlugin } from 'webpack'

import { MakeDialogConfig } from 'fck-react-dialog'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { parse } from 'path'

const SUPPLIES_HEADER = [
    { label: "EAN", value: "ean", columns: 3 },
    { label: "Preço", value: "price", columns: 3 },
    { label: "Validade", value: "expiration", columns: 3 }
]

const CSV_HEADER = [ "ean", "price", "expiration" ]

const HISTORY_HEADER = {
    search: [ "csv" ],
    params: [ "p" ]
}

export const SuppliesContent:React.FunctionComponent<any> = ({}) =>{
 

    const context: any = useContext(GlobalContext)
    const [ initialData, setInitialData ] = useState([])
    const [ errors, setErrors ] = useState({})
    const { parsedSearch, pushToHistory } = UseSearchAdapter({ header: HISTORY_HEADER })

   useEffect(()=>{
        if(parsedSearch){
            const { csv } = parsedSearch;
            if(csv.length > 0 && csv[0] == 1){ openCsvReader() }
        } 
    },[ parsedSearch]) 

    const openCsvReader = () =>{
        context.dialog.push(MakeDialogConfig(({onAction}: any)=><ImportCsvModal headers={CSV_HEADER} onAction={onAction}></ImportCsvModal>,(n:any)=> {
            if(n !== -1) { setInitialData(n); } 
            pushToHistory({ csv:null })
            return -1
        } ))
    }

    return (
        <div> 
            <TableForms errors={errors} entries={initialData} headers={SUPPLIES_HEADER} ></TableForms>
        </div>
    )
}

export default SuppliesContent
