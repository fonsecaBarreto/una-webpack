import { builder } from 'fck-schema-validator'

export const CadastroCompanhia_schema = builder.create(b=>{
    b.string('nomeFantasia')
    b.string('razaoSocial')
    b.cnpj('cnpj')
    b.email('emailFinanceiro')
    b.string('inscricaoEstadual')
    b.phone('telefoneComercial').optional()
})

export const CadastroUsuario_schema =  builder.create(b=>{
    b.string('nome')
    b.email('email')
    b.phone('telefone')
    b.cpf('cpf')
    b.string('senha')
    b.string('senhaConfirmacao')
})

export const CadastroEndereco_schema =  builder.create(b=>{
    b.string('rua')
    b.string('numero')
    b.string('detalhes').optional()
    b.string('bairro')
    b.string('cidade')
    b.number('uf')
    b.number('ibge')
    b.string('cep')
})
