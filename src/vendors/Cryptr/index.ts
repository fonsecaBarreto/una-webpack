export function encrypt(value: string){
    const agora = Date.now()+""
    return (agora).substring(6, 12)+value+(agora).substring(0, 6)+"$";
}

export function decrypt(value: string){
    let result = value.split("$")[0];
    return value.substring(6,result.length-6)
}

