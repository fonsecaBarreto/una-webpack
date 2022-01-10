
import { ListingView, LabelView } from "./ListingView";

export interface Produto {
    id: string
    especificacao: string

    marca_id:string
    apresentacao_id:string
    subCategoria_id: string
  
    ncm: string
    ean: string
    sku:string
    image: null 

    marca: LabelView
    apresentacao: LabelView
    subCategoria: LabelView
}

export type ProductListView = ListingView<Produto>