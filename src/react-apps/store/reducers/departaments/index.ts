import { ListingView, LabelView} from "@/domain/views/ListingView";
import { Produto } from "@/domain/views/Produto";

export interface DepartamentosState {
     struct: {
          departamentos: {id: string,nome: string,descricao: string}[],
          categorias: {id: string,nome: string, departamento_id: string}[],
          subCategorias:  {id: string,nome: string, categoria_id: string}[]
          marcas: LabelView[],
     };
     produtos: ListingView<Produto[]>
}

const INITIAL_STATE = {
     struct: {
          departamentos: [],
          categorias: [],
          subCategorias: [],
          marcas: []
     },
     produtos: {
          total: 0,
          length: 0,
          data: [],                      
          queries: {},
          pages: 0,                 
          pageIndex: 0
     }
}
   
export const departamentosReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": return { ...state, struct: action.payload };
          case "SET_DEPARTMENTOS_STRUCT_MARCAS": return { ...state, struct: { ...state.struct, marcas: action.payload} };
          case "SET_PRODUCTOS_FEED": { 
               var data = action.payload.toAppend ? [ ...state.produtos.data, ...action.payload.listView.data ] : [...action.payload.listView.data ]
               var produtos :any = { ...action.payload.listView, data } ;
               return ({ ...state, produtos }) ; 
          };
          default: return state
     }
}