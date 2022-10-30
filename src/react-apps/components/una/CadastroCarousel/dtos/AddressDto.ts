import { IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";


export class AddressDto {

    @IsString()
    @IsNotEmpty({ message:'Informe o Endereço para o estabelecimento'})
    address: string ="";

    @IsString()
    @IsNotEmpty({ message:'Informe o Cidade!'})
    city: string = "";

    @IsString()
    @IsNotEmpty({ message:'Informe o UF!'})
    uf: string = "";

    @IsString()
    @IsNotEmpty({ message: "informe o CEP!"})
    postalCode: string ="";

    constructor(fields?: Partial<AddressDto>){
        Object.assign(this, fields)
    }
}