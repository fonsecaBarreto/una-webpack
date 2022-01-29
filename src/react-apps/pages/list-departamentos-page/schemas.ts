import { builder } from 'fck-schema-validator'

export const LabelDto_schema = builder.create(b=>{
    b.string("value")
    b.string("label")
})

export const CsvProdutosDTo_schema = builder.create(b=>{
    b.string('ean')
    b.string('ncm').optional()
    b.string('sku').optional()
    b.string('specification').description("Especificação")
    b.object('brand',LabelDto_schema)
    b.object('category', LabelDto_schema)
    b.object('presentation', LabelDto_schema)
})