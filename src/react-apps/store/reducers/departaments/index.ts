import { Companhia } from "@/domain/views/Companhia";
import { ListingView, LabelView} from "@/domain/views/ListingView";
import { Produto } from "@/domain/views/Produto";


export namespace DepartamentosState {
     export type CategoryView = { value: string, label: string, parent_id?:string }
     export interface struct {
          departamentos: { value: string, label: string }[]
          categorias: CategoryView[]
          subCategorias:CategoryView[],
          marcas: { value: string, label: string}[]
     } 
}

export interface DepartamentosState {
     struct: DepartamentosState.struct,
     marcasAvaiable: string[]
     produtos: ListingView<Produto[]>,
     toSubmitQueries: boolean
}

const INITIAL_LIST_VIEW = {
     queries: {},
     total: 0,
     length: 0,
     data: [],                      
     pages: 0,                 
     pageIndex: 0
}

const INITIAL_DEPARTAMENTOS_STRUCT = {
     departamentos: [],
     categorias: [],
     subCategorias: [],
     marcas: []
}

const INITIAL_STATE = {
     struct: { ...INITIAL_DEPARTAMENTOS_STRUCT },
     marcasAvailables:[],
     produtos: { ...INITIAL_LIST_VIEW},
     toSubmitQueries: false
}
   
export const departamentosReducer = (state=INITIAL_STATE, action: any) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": return { ...state, struct: action.payload };
          case "SET_MARCAS_AVAILABLES": return { ...state, marcasAvailables: action.payload };
          case "SET_PRODUCTOS_FEED": { 
               const toAppend = action.payload.toAppend
               var data = toAppend ? [ ...state.produtos.data, ...action.payload.listView.data ] : [...action.payload.listView.data ];
               var { total, length, pages, pageIndex, queries } = action.payload.listView;
               let produtos :ListingView<Produto[]> = { queries, total, length, pages, pageIndex, data } ;
               return ({ ...state, produtos, toSubmitQueries: false }) ; 
          };
          case "SPLICE_PRODUCTOS_FEED_QUERIES": {
               let produtos :ListingView<Produto[]> = { ...state.produtos, queries: { ...state.produtos.queries, ...action.payload } } ;
               return ({ ...state, produtos, toSubmitQueries: true }) ; 
          };

          default: return state
     }
}