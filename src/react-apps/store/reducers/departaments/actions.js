
export const spliceProdutosQueries = (value) => ({
     type: "SPLICE_PRODUCTS_LISTVIEW_QUERIES",
     payload: value
})

export const setDepartamentos = (value) => ({
     type: "SET_DEPARTMENTOS_STRUCT",
     payload: value
})

export const setProdutos = (value, append) => ({
     type: "SET_PRODUCTOS_LISTINGVIEW",
     payload: { content: value, toAppendData: append }
})