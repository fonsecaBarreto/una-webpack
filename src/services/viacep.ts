
export const searchCep = async (address_postalcode: string) => {
    const cep = address_postalcode.replace(/[^\d]+/g,'');
    if(!cep || cep.length < 8 || cep.length > 8) throw new Error("Insira um CEP válido")
    var res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { mode: 'cors'}).then((res) => res.json())
    if (res.hasOwnProperty("erro")) throw new Error("Cep inválido");
    return res 
}