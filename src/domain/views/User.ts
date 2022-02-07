
export enum PapeisUsuario{
    LOGISTICA="LOGISTICA",              // Usuario a receber noções de logistica
    COMPRADOR="COMPRADOR",              // Comprador
    FORNECEDOR="FORNECEDOR",             // Fornecedor
    GESTOR="GESTOR",                  // Responsavel pelo menos um gerente
    ADMIN="ADMIN",
    NEGOCIADOR="NEGOCIADOR"
}

export interface Usuario {
    id: string
    company_id: string;
    image: string;
    email: string;
    cpf: string;
    nome: string;
    telefone: string;
    senha: string;
    ativo: boolean;
    roles: PapeisUsuario[];
}

