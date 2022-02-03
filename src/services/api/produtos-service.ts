import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_url}/products`,
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

     export type AddProduct_dto = {
          _id: string,
          brand_id:string
          presentation_id:string
          sub_category_id: string
          specification: string
          ncm: string
          ean: string
          sku:string
      }

}

export const produtosService = {

     save_mutiples: async ( params: { products: produtosServices.AddProduct_dto[]}) => {
          const { products } = params
          const { data } = await produtosApi.send({ method: "post", url: `/`, data: { products } }) 
          return data 
     },

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