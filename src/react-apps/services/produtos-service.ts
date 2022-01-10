import { global } from '@/global'
import store from '@/react-apps/store'
import { MakeApiSettings, errorHandler } from './helpers'
import { setProdutosFeed } from '../store/reducers/departaments/actions'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_url}/produtos`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const produtosService = {
     list: async (page:number = 1) => {
          const p = `?p=${page}` ;
          const url = `/${p}`
          const { data } = await produtosApi.send({ method: "get", url }) 
          store.dispatch(setProdutosFeed(data, page > 1 ? true : false));
          return data
     }
}