
import { LabelView } from "./ListingView";

export interface Product {
    ncm: string
    ean: string
    sku:string
    brand_id:string
    presentation_id:string
    sub_category_id: string
    specification: string
    brand: LabelView
    presentation: any
    subCategory: LabelView
    image: string | null;
    weight: string | null;
    volume: string | null;
    quantity_per_unity: number | null;

}

export interface Brand {
    name: string,
    image: null
}


