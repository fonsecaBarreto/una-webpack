import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from '../helpers'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_api}/v2/products`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})


export const produtosServiceV2 = {

     findLatest: async () => {
          const { data } = await produtosApi.send({ method: "get", url: `/latests` }) 
          return data 
     }

}