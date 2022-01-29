import { builder } from 'fck-schema-validator'

export const CsvProdutosDTo_schema = builder.create(b=>{
    b.string('ean')
    b.string('ncm').optional()
    b.string('sku').optional()
    b.string('specification').description("Especificação")
    b.string('brand_name')
    b.string('category_name')
    b.string('presentation_name')
})