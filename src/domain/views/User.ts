
export enum UserProfileRole{
    LOGISTICA="LOGISTICA",              // Usuario a receber noções de logistica
    COMPRADOR="COMPRADOR",              // Comprador
    FORNECEDOR="FORNECEDOR",             // Fornecedor
    GESTOR="GESTOR",                  // Responsavel pelo menos um gerente
    ADMIN="ADMIN",
    NEGOCIADOR="NEGOCIADOR"
}

export const USER_PROFILE_ROLES = [ 
    { value: "LOGISTICA", label: "Logistica" },
    { value: "COMPRADOR", label: "Comprador" },
    { value: "FORNECEDOR", label: "Fornecedor" },
    { value: "GESTOR", label:"Gestor" },
    { value: "ADMIN", label:"Admin" },
    { value: "NEGOCIADOR", label:"Negociador" } ]

export interface User {
    id: string
    company_id: string;
    image: string;
    email: string;
    cpf: string;
    nome: string;
    telefone: string;
    senha: string;
    ativo: boolean;
    roles: UserProfileRole[];
}

export interface UserFile{
    user_id:string,
    name: string,
    alt: string,
    mimeType: string,
    size: number
}

