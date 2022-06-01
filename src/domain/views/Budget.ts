import { LabelView } from "./ListingView";

export enum BudgetStatus{
    NEW="NEW",             
    IN_PROGRESS="IN_PROGRESS",              
    CANCELED="CANCELED",           
    SUCCEEDED="SUCCEEDED",                    
    CLOSED="CLOSED"             
}
export interface Budget {
    id: number,
    user_id:string
    amount: number,
    created_at: Date,
    updated_at: Date
}

// FK [ budget_id, product_id ]
export interface BudgetItem {
    budget_id: number
    product_id: string,
    quantity: number,
    price: number
}


