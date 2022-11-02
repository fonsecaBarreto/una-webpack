import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { produtosService } from '@/services/api/produtos-service'
import GaleryContainer from './GaleryContainer'
import ProductBreadCrumbs from './ProductBreadCrumbs'
import LoadingComponent from '@/react-apps/components/una/Loading'
import ProductInfo from './ProductInfo'
import { getUfName } from '@/services/ibge'
import { ListTree } from './ListTree'
import { useSelector } from 'react-redux'
const SEARCH_HEADER = { params: [ "ean"] }
import LatestProductsCarousel from "@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts";
import { LabelView } from '@/domain/views/ListingView'
export type ProductView = {

  specification: string;
  ncm: string;
  ean: string;
  sku: string;
  /* novas colunas */
  weight: string | null;
  volume: string | null;
  quantity_per_unity: number | null;
  /* Compositions */
  brand: LabelView | null;
  subCategory: LabelView | null;
  images: string[];
  supplies: any[];
}
export const ProductPage: React.FunctionComponent<any> = ({ location, history }) => {
  const { user } = useSelector((state: any) => state.main)
  const { parsedParams } = UseSearchAdapter({ header : SEARCH_HEADER})
  const [ product, setProduct ] = useState<ProductView | null>(null);
  const [ breadCrumbs, setBreadCrumbs] = useState(null);
  useEffect(()=>{ if(parsedParams){ handleLoad()} },[parsedParams])
 
  const handleLoad= () => {
    setProduct(null)
    produtosService.find({ ...parsedParams }).then(data=>{
      setProduct(data?.product ?? null)
      setBreadCrumbs(data?.breadCrumbs ?? null)
    }) 
  }

  return (
    <div id="product-page">
      <div className='app-container'>
        { !product ? (<LoadingComponent fill={true}></LoadingComponent>) :
          <React.Fragment>
            <div className='product-page-container'>
              {/* BREAD CRUMBS */}
              <section className='span2'>
                <ProductBreadCrumbs breadCrumbs={breadCrumbs}/>
              </section>
              {/* IMAGE CONTAINER */}
              <section className='span1'> 
                <GaleryContainer images={product.images}/> 
              </section>
              {/* INFORMAÇÕES */}
              <section className='span1'>
                <ProductInfo product={product} supplies={product.supplies}></ProductInfo>
              </section> 
            </div>
          {/*   { (user && product.supplies.length > 0) && <div>
              <SupplyPanel supplies={product.supplies}></SupplyPanel>
            </div>} */}
          </React.Fragment>
        }
        <div>

        <LatestProductsCarousel/>

        </div>
      </div>
      
    </div>
  )
}




export const SupplyPanel: React.FunctionComponent<any> = ({supplies}) => {

  const today = new Date()

  const [ isLoading, setIsloading ] = useState(false)
  const [ coverage, setCoverage ] = useState<any>([])

  useEffect(()=>{mapCoverages()}, [supplies])

  const mapCoverages = async ( ) =>{
    setIsloading(true)
    var result: ListTree.Node[] = [];

    /* Agrupar Cidades e estados */
    if(supplies.length > 0 ){
      supplies.map((sup: any, i:number) =>{
        let { ufs } = sup.coverage;
        ufs.map((u:any)=> {
          let indexOf = result.findIndex((re) => re.value == u.id)
          if(indexOf == -1) result.push({ 
            value: u.id, 
            label: "",
          /*   childs: u.cidades.map((c: string)=>({value: c, label: "", childs: []}))  */
          })
          else{
            var existentes: any = result[indexOf].childs 
            var novos = u.cidades.map((c: string)=>({value: c, label: "", childs:[]}))
            /* result[indexOf].childs = [ ...existentes, ...novos ]   */
          } 
        })

      }) 
    }

    result = await Promise.all(result.map(async (uf) => {
      uf.label = await getUfName(uf.value) /* + ` ( ${uf.childs?.length ?? 0} cidades )` */
      return uf;
    }))

    setCoverage({ label: "Disponibilidade de entrega para: ", value: "", childs: result, initial:true })
    setIsloading(false)
  }

  return (
      <div className='product-supply-coverages-panel'>
        { isLoading ? <LoadingComponent></LoadingComponent>  :
          <ListTree node={coverage}></ListTree>
        }
      </div>
  )
}


  /* if(uf.childs){
    await Promise.all(uf.childs.map( async (cidade) => {
      cidade.label = await getMunicipioName(cidade.value)
      return cidade
    }))
  } */



export default ProductPage