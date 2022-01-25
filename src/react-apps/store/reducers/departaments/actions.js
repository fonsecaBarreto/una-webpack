
export const setDepartamentos = value => ({
     type: "SET_DEPARTMENTOS_STRUCT",
     payload: value
})

export const setMarcasAvailables = value => ({
     type: "SET_MARCAS_AVAILABLES",
     payload: value
})

export const setProdutos = (value, append) => ({
     type: "SET_PRODUCTOS_FEED",
     payload: { listView: value, toAppend: append}
})

export const spliceProdutosQueries = (value) => ({
     type: "SPLICE_PRODUCTOS_FEED_QUERIES",
     payload: value
})

