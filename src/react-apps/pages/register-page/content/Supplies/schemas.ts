import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { builder } from 'fck-schema-validator'

export const CsvSupliesDTo_schema = builder.create(b=>{
    b.string('ean').description("EAN")
    b.number('suggested_price').description("Preço")
    b.number('stock').description("Quantidade em estoque").optional()
})

export const suply_headers_schema: MultiplesForms.Header[] = [   
    { label: "EAN *", value: "ean", type: "text" }, 
    { label: "Preço sugerido *", value: "suggested_price" },
    { label: "Estoque *", value: "stock" },
]
