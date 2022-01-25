import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_url}/companhias`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace CompanhiasServices {
     export type ListParams = {
          p?: number,
          n?: string
     }
}

export const companhiasService = {
     list: async (params: CompanhiasServices.ListParams) => {

          const { n="", p= 1 } = params

          var query = `?p=${p}&n=${n}`

          const { data } = await produtosApi.send({ method: "get", url: `/${query}` }) 
          return data 
     }
}