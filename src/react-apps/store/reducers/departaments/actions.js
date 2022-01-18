/* departamentos struct */
export const setDepartamentos = value => ({
     type: "SET_DEPARTMENTOS_STRUCT",
     payload: value
})

export const setMarcas = value => ({
     type: "SET_DEPARTMENTOS_STRUCT_MARCAS",
     payload: value
})

/* produtos */

export const setProdutosFeed = (value, append) => ({
     type: "SET_PRODUCTOS_FEED",
     payload: { listView: value, toAppend: append}
})
 
 

