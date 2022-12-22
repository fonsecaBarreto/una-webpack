import { faker } from '@faker-js/faker';
export function encrypt(value: string){
    const agora = Date.now()+""
    const sufix=faker.finance.bitcoinAddress();
    return (agora).substring(6, 12)+value+(agora).substring(0, 6)+"$"+sufix;
}

export function decrypt(value: string){
    let result = value.split("$")[0];
    return value.substring(6,result.length-6)
}

