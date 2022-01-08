import { global } from '../global'
import { MakeApiSettings, errorHandler } from './helpers'

const loginApi = MakeApiSettings(`${global.base_url}/login`, errorHandler, global.user_storage_key)

export const loginServices = {

  signup:async (data) => {
    const result = await loginApi.send({ method: "post", url:"/signup", data }) 
    return
  },

  signin:async (data) => {
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