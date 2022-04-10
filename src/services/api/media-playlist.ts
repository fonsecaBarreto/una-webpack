import { global } from '@/services/global-keys'
import { filesService } from './files-service'
import { MakeApiSettings, errorHandler } from './helpers'

const filesApi = MakeApiSettings({
     base_url: `${global.base_url}/media/playlist`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const mediaPlayListService = {

    save: async (images: string[], id?: string, ) => {
        const METHOD= !id ? "POST" : "PUT" 
        const URL = !id ? `/` : `/${id}`
        const { data } = await filesApi.send({method: METHOD, url:URL, data: { images } });
        return data
    },
    find: async (id: string ) => {
        const { data } = await filesApi.send({method: "get", url:`/${id}` });
        return data
    },
    getImageSrc: async(id: string) => {
        var playlist = await mediaPlayListService.find(id)
        if(!playlist) return null;
        var image = playlist.images[0];
        const src= image.name + "/" + image.src[1].width + ".jpeg"
        return filesService.get_public_images_url(src);
    }
}