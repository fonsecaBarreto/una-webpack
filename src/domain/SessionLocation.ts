
export class SessionLocation {

    /* static */
    static readonly location_storage_key: string = "una-compas-localidade"

    static get(){
        const storageJSON: any = localStorage.getItem(SessionLocation.location_storage_key);
        if(!storageJSON) return null;
        const {cep, ibge, label} = JSON.parse(storageJSON)
        return new SessionLocation(cep, ibge, label)
    }

    /* domain */
    public cep: string
    public ibge: string
    public label : string

    constructor(cep:string, ibge: string, label: string){
        this.cep = cep;
        this.ibge = ibge;
        this.label = label;
    }

    store(){
        const json = JSON.stringify(this)
        localStorage.setItem(SessionLocation.location_storage_key,json);
    }

    getLabel(){
        return this.label  
    }
}