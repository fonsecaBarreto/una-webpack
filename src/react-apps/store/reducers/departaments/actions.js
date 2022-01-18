
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
 
 

