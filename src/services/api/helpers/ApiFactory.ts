import axios from 'axios'

export interface MakeApiParams {
  base_url: string, 
  errorHelper: any, 
  storage_key: string
}

export interface SendParams {
  method: any,
  url: string, 
  data?: any, 
  headers?: any
}

export function MakeApiSettings({base_url, errorHelper, storage_key}: MakeApiParams){
  const axiosApi = axios.create({  baseURL: base_url })
  return ({
    send: async ({ method, url, data, headers }: SendParams) => {

      if(storage_key){
        const token = localStorage.getItem(storage_key)
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      //await new Promise(res=> setTimeout(()=>{return res(true)},2000)) 
      try{ 
        const result = await axiosApi({ method, url: `${base_url}${url}`, data, headers })
        return result;
      } catch(err) { 
          throw errorHelper(err) 
      } 
    }
  })
}



