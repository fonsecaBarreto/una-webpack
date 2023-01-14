
import { LabelView } from "./ListingView";


export type ProductSupply = { 
    index: number,
    company_id: string,
    expiration: Date,
    price: number,
    company_name: string,
    company_minimum_order: number
    minimum_order: number;
  }

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
    subCategory: {value: string, label: string, presentation_unity: string }
    image: string | null;
    weight: number | null;
    volume: number | null;
    quantity_per_unity: number | null;
      supplies: ProductSupply[];

}

export interface Brand {
    name: string,
    image: null
}


