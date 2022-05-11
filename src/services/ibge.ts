

export const getUfName = async  (cod: any) => {
    var res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cod}`, { mode: 'cors'}).then((res) => res.json())
    if (res.hasOwnProperty("erro")) throw new Error("Sistema do IBGE fora do ar");
    return res.nome
}


export const getMunicipioName = async (cod: any) => {
    var res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cod}`, { mode: 'cors'}).then((res) => res.json())
    if (res.hasOwnProperty("erro")) throw new Error("Sistema do IBGE fora do ar");
    return res.nome
    
}

export const getUfs = async () => {
    var res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`, { mode: 'cors'}).then((res) => res.json())
    if (res.hasOwnProperty("erro")) throw new Error("Sistema do IBGE fora do ar");
    return res 
}

export const getCitiesByUf = async ( ufId: number) => {
    var res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`, { mode: 'cors'}).then((res) => res.json())
    if (res.hasOwnProperty("erro")) throw new Error("Sistema do IBGE fora do ar");
    return res 
}