import { LabelView } from "./ListingView";

export enum BudgetStatus{
    NEW="NEW",             
    IN_PROGRESS="IN_PROGRESS",              
    CANCELED="CANCELED",           
    SUCCEEDED="SUCCEEDED",                    
    CLOSED="CLOSED"             
}
export interface Budget {
    id: number;
    user_id: string;
    company_id: string;
    amount: number;
    status: BudgetStatus;
    created_at: Date;
    updated_at: Date;
}

// FK [ budget_id, product_id ]
export interface BudgetItem {
    budget_id: number;
    ean: string;
    quantity: number;
    price: number;
    supply_supplier_id: string | null;
    supply_index: number | null;
    order: number;
    // primary = budget_id + order
}


