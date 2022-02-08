import { global } from '@/services/global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const filesApi = MakeApiSettings({
     base_url: `${global.base_url}/files`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const filesService = {


    get_url: (name: string) => {
        const token = localStorage.getItem(global.user_storage_key)
        return (`${global.base_url}/files?v=${name}&a=${token}`)
    },

    get: async (name: string) => {
        var query = `?v=${name}`;
        const { data } = await filesApi.send({ method: "get", url: `/${query}` }) 
        return data 
    },

    uploadCompanyDocument: async (file: File, document_type: "contrato_social"|"inscricao_estadual") => {
        const formData = new FormData();
        formData.append('document', file)
        const { data } = await filesApi.send({method: "post", url:`/comapanies-documents?v=${document_type}`, data: formData });
        return data
    }
}