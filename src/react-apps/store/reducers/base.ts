import { ListingView } from "@/domain/views/ListingView";

// initial data
export const INITIAL_LIST_VIEW = ( data: any ): ListingView<any, any> =>( {
    total: 0, length: 0, pageIndex: 0, pages: 0, sync:0, queries: {}, data,                     
})