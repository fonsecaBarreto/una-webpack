import MultiplesForms from '@/react-apps/components/MultiplesForms'
import { builder } from 'fck-schema-validator'

export const LabelDto_schema = builder.create(b=>{
    b.string("value")
    b.string("label")
})

/* Products Models */

export const CsvProdutosDTo_schema = builder.create(b=>{
    b.string('ean').description("EAN")
    b.string('ncm').optional().description("NCM")
    b.string('sku').optional().description("SKU")
    b.string('specification').description("Especificação")
    b.object('brand',LabelDto_schema).description("Marca")
    b.object('category', LabelDto_schema).description("Categoria")
    b.object('presentation', LabelDto_schema).description("Apresentação")
})

export const product_headers_schema: MultiplesForms.Header[] = [   
    { label: "EAN *", value: "ean", type: "text", columns: 2}, 
    { label: "Especificação *", value: "specification", columns: 6 },
    { label: "Marca *", value: "brand", type:"select",  columns: 3 ,list:[ ] },
    { label: "Categoria *", value: "category",   columns: 3 , type:"select", list:[]  },
    { label: "Apresentaçao *", value: "presentation",  columns: 3, type:"select", list:[ ] },
    { label: "NCM", value: "ncm",   columns: 2 },
    { label: "SKU", value: "sku",   columns: 2 }
]

