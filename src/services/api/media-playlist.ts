import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const filesApi = MakeApiSettings({
     base_url: `${global.base_url}/media/playlist`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const mediaPlayListService = {

    save: async (images: string[], id?: string, ) => {
        const { data } = await filesApi.send({method: "post", url:`/`, data: { images } });
        return data
    },
    find: async (id: string ) => {
        const { data } = await filesApi.send({method: "get", url:`/${id}` });
        return data
    }
}