export interface Companhia {
    id: string
    endereco_id: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    emailFinanceiro: string;
    inscricaoEstadual: string;
    telefoneComercial: string | null;
    addresses: any[];
    staff: any[] ;
    ativo: boolean,
    documents: any,
    image: string | null;
}