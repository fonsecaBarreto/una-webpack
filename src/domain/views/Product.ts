
import { LabelView } from "./ListingView";

export interface Product {
    ncm: string
    ean: string
    sku:string
    image: null 
    brand_id:string
    presentation_id:string
    sub_category_id: string
    specification: string
    brand: LabelView
    presentation: any
    subCategory: LabelView
    media_playlist_id: string
}

export interface Brand {
    name: string,
    image: null
}


