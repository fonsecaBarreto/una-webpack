import { global } from '@/global'
import store from '@/react-apps/store'
import { MakeApiSettings, errorHandler } from './helpers'
import { setMarcas, setProdutosFeed } from '../react-apps/store/reducers/departaments/actions'

const produtosApi = MakeApiSettings({
     base_url: `${global.base_url}/produtos`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace produtosServices {
     export type Params = {
          p?: number,
          c?: string[]
          d?: string[],
          s?: string[],
          e?: string
     }
}

export const produtosService = {
     list: async (params: produtosServices.Params) => {

          const { e="", p= 1, c=[], d=[], s=[] } = params

          var query = `?p=${p}&e=${e}`

          if(d.length > 0 )
               d.map(d=>{ query+=`&d=${d}` });

          if(s.length > 0)
               s.map(s=> { query+=`&s=${s}` });
   
          if(c.length > 0)
               c.map(c=>{ query+=`&c=${c}` });  

          const { data } = await produtosApi.send({ method: "get", url: `/${query}` }) 
          var produtosListView = { ...data, data: [ ...data.data.produtos ]}
          store.dispatch(setProdutosFeed(produtosListView, p > 1 ? true : false));
          store.dispatch(setMarcas(data.data.martcas))
          return data 
     }
}