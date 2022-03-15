export interface ListingView<View, Queries> {
    total: number,                  // Total de entidades existentes no sistemas
    length: number                  // Total de entidades encontradas na pesquisa
    data: View,                      // dados
    queries: Queries    // Filtros aplicados
    pages: number,                  // quantas paginas a pesquisa resultou
    pageIndex: number               // indice da pagina,
    sync:number
}

export interface LabelView {
    label: string,
    value: string,
    parent_id?:string
}
