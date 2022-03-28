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
          v?: string
          departament_id?: string,
          category?: string[]
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

     list: async (params: Partial<produtosServices.ListParams>) => {
          const {  p= 1, v="", brand, departament_id, category, subCategory } = params
          var query = `?p=${p}&specification=${v}`;
          if(departament_id) query+=`&departament=${departament_id}`;
          if(category?.length) category.map(c=>{query+=`&category=${c}`});
          if(subCategory?.length) subCategory.map(c=>{query+=`&subCategory=${c}`});
          if(brand?.length) brand.map(b=>{query+=`&brand=${b}`});
          const { data } = await produtosApi.send({ method: "get", url: `/${query}` }) 
          return data 
     },
     find: async (params: any) => {
          const { ean } = params
          const { data } = await produtosApi.send({ method: "get", url: `/${ean}` }) 
          return data 
     }
}