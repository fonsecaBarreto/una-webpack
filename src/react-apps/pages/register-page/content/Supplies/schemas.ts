export const SUPPLIES_TABLE_HEADER: any = [
    { label: "EAN", value: "ean", columns: 3 },
    { label: "Preço", value: "price", columns: 3 },
    { label: "Validade", value: "expiration", columns: 3, convert: "date" }
]

export const CSV_HEADER = [ "ean", "price", "expiration" ]