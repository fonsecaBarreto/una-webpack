/* departamentos struct */
export const setDepartamentos = value => ({
     type: "SET_DEPARTMENTOS_STRUCT",
     payload: value
})

export const setMarcasAvailables = value => ({
     type: "SET_MARCAS_AVAILABLES",
     payload: value
})

/* produtos */

export const setProdutosFeed = (value, append) => ({
     type: "SET_PRODUCTOS_FEED",
     payload: { listView: value, toAppend: append}
})
 
 

