import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_url}/produtos`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace produtosServices {
     export type ListParams = {
          p?: number,
          specification?: string
          category?: string[]
          departament?: string[],
          subCategory?: string[],
          brand?: string[]
     }
}

export const produtosService = {
     list: async (params: produtosServices.ListParams) => {

          const {  p= 1, specification="" } = params
          var query = `?p=${p}&specification=${specification}`;

          (["category", "departament", "subCategory", "brand"]).map( (v:string)=>{
               var filter :any = { ...params }[v];
               if( filter.length > 0){
                    filter.map((f:any)=>{ query+=`&${v}=${f}` });
               }
          })

          const { data } = await produtosApi.send({ method: "get", url: `/${query}` }) 
          return data 
     }
}