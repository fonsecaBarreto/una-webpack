
import { LabelView } from "./ListingView";

export interface Product {
    id: string
    ncm: string
    ean: string
    sku:string
    image: null 
    brand_id:string
    presentation_id:string
    sub_category_id: string
    specification: string
    brand: LabelView
    presentation: LabelView
    subCategory: LabelView
}

export interface Brand {
    name: string,
    image: null
}