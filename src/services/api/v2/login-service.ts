import { global } from "@/services/global-keys";
import { MakeApiSettings, errorHandler } from "../helpers";

export type SignUpParams = {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    nomeFantasia: string;
    cnpj: string;
    telefoneComercial: string;
    isMart: boolean;
    isVendor: boolean;
    address: string;
    city: string;
    uf: string;
    postalCode: string;
    ibge: number;
}

const loginApi = MakeApiSettings({
    base_url: `${global.base_api}/v2/login`,
    errorHelper: errorHandler, 
    storage_key: global.user_storage_key
})

export const loginServicesV2 = {
    signup:async (data: SignUpParams) => {
        await loginApi.send({ method: "post", url:"/signup", data }) 
        return;
    }
}
