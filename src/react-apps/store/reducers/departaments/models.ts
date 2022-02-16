import { ListingView, LabelView } from "@/domain/views/ListingView";

export namespace DepartamentosState {
    export type CategoriasLike = "departaments" | "categories" | "subCategories"
    export type FilterStruct = Record<CategoriasLike | "brands", LabelView[] >
}

export interface DepartamentsState {
    departaments_struct: DepartamentosState.FilterStruct
    departaments_struct_load_try: number,

    products_listingview: any,
    toSubmit: false
}
