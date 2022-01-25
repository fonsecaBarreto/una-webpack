export interface Companhia {
    id: string
    endereco_id: string;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    emailFinanceiro: string;
    inscricaoEstadual: string;
    telefoneComercial: string | null;
    enderecos: any[];
    pessoal: any[] ;
}