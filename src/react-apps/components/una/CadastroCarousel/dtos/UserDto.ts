import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty({ message:'Informe o nome do Responsável'})
    nome: string ="";

    @IsString()
    @IsNotEmpty({ message:'CPF do responsável é obrigatório!'})
    cpf: string = "";

    @IsString()
    @IsNotEmpty({ message:'Telefone do responsável é obrigatório!'})
    telefone: string ="";

    @IsString()
    @IsNotEmpty({ message:'Email do responsável é obrigatório!'})
    email: string ="";


    @IsString()
    @IsNotEmpty({ message:'Senha é obrigatório!'})
    senha: string ="";


    @IsString()
    @IsNotEmpty({ message:'Confirme a senha'})
    senhaConfirmacao: string ="";

    constructor(fields?: Partial<UserDto>){
        Object.assign(this, fields)
    }
 
}