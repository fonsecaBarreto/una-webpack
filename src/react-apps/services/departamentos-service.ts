import { global } from '@/global'
import store from '@/react-apps/store'
import { MakeApiSettings, errorHandler } from './helpers'
import { setDepartamentos  } from '../store/reducers/departaments/actions'

const departamentsApi = MakeApiSettings({
     base_url: `${global.base_url}/departamentos`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const departamentosService = {
     list:async () => {
          const { data } = await departamentsApi.send({ method: "get", url:"/" }) 
          store.dispatch(setDepartamentos(data));
          return data
     }
}