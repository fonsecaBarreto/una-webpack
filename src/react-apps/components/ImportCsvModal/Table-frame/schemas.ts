import { builder } from 'fck-schema-validator'

export const CsvProdutosDTo_schema = builder.create(b=>{
    b.string('ean')
    b.string('ncm').optional()
    b.string('sku').optional()
    b.string('especificacao')
    b.string('marca')
    b.string('categoria')
    b.string('apresentacao')
})
