export const setDepartamentos = value => ({
     type: "SET_DEPARTMENTOS_STRUCT",
     payload: value
})

export const setProdutosFeed = (value, append) => ({
     type: "SET_PRODUCTOS_FEED",
     payload: { listView: value, toAppend: append}
})
 

export const setProdutosFeedQueries = (queries) => ({
     type: "SET_PRODUCTOS_FEED_QUERIES",
     payload: queries
})
 