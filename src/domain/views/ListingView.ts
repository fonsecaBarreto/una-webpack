export interface ListingView<View> {
    total: number,                  // Total de entidades existentes no sistemas
    length: number                  // Total de entidades encontradas na pesquisa
    data: View,                      // dados
    queries: Record<string, any>    // Filtros aplicados
    pages: number,                  // quantas paginas a pesquisa resultou
    pageIndex: number               // indice da pagina
}

export interface LabelView {
    label: string,
    value: string
}

export type CategoryView = { value: string, label: string, parent_id?:string }

