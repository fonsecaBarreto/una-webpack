import { IsNumber, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CompanyDto {

    @IsString()
    @IsNotEmpty({ message:'Informe o nome do estabelecimento'})
    nomeFantasia: string ="";

    @IsString()
    @IsNotEmpty({ message:'CNPJ do responsável é obrigatório!'})
    cnpj: string = "";

    @IsString()
    @IsNotEmpty({ message:'Telefone comercial é obrigatório!'})
    telefoneComercial: string ="";

    constructor(fields?: Partial<CompanyDto>){
        Object.assign(this, fields)
    }
 
}