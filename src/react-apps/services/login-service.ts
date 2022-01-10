import { global } from '@/global'
import { MakeApiSettings, errorHandler } from './helpers'

const loginApi = MakeApiSettings({
  base_url: `${global.base_url}/login`,
  errorHelper: errorHandler, 
  storage_key: global.user_storage_key
})

export const loginServices = {

  signup:async (data: any) => {
    const result = await loginApi.send({ method: "post", url:"/signup", data }) 
    return
  },

  signin:async (data: any) => {
    const result = await loginApi.send({ method: "post", url:"/signin", data }) 
    localStorage.setItem(global.user_storage_key, result.data['accessToken'])
  },
  
  verify:async () =>{
    const { data } = await loginApi.send({method: "post", url:"/verify"}) 
    return data
  }, 
  
  logout:() =>{
    localStorage.removeItem(global.user_storage_key)
    window.location.href="/login"
  } 
  
}