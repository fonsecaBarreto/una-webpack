
const UNKNOWN_ERROR = "Erro inesperado."

function ResultError(message : string, error?: any){
    var params = null
    if(error){
        if(typeof error == "string"){
            message = error
        }else if(typeof error == "object"){
            const { message: erM, params: erP } = error
            message = erM
            params = erP
        }
    }
    return { message, params}
}

export function errorHandler(err: any) {
    if(!err.response) return ResultError(UNKNOWN_ERROR)
    var { error } = err.response.data
    return ResultError(UNKNOWN_ERROR, error)
}

