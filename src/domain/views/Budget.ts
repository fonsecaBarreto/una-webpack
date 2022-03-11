export interface Budget {
    id: string,
    user_id:string
    amount: number,
    created_at: Date,
    updated_at: Date
}

// FK [ budget_id, product_id ]
export interface BudgetItem {
    budget_id: string
    product_id: string,
    quantity: number,
    price: number
}