import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { produtosService } from '@/services/api/produtos-service'
import GaleryContainer from './GaleryContainer'
import { Product } from '@/domain/views/Product'
import SubmitButton from '@/react-apps/components/una/inputs-control/SubmitButton'
import { pushToCart, removeFromCart } from '@/react-apps/store/reducers/cart/actions'
import { BsCart4 } from 'react-icons/bs'
import CounterControl from '@/react-apps/components/una/inputs-control/CounterControl'
import ProductBreadCrumbs from './ProductBreadCrumbs'

export const ProductPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { parsedParam, pushToHistory } = UseSearchAdapter({ param:"ean" })
    const [ product, setProduct ] = useState<Product|null>(null);
    const [ breadCrumbs, setBreadCrumbs] = useState(null);

    useEffect(()=>{ if(parsedParam){ handleLoad()} },[parsedParam])
    const handleLoad= () => {  
      produtosService.find({ ...parsedParam }).then(data=>{
        setProduct(data?.product ?? null)
        setBreadCrumbs(data?.breadCrumbs ?? null)
      }) 
    }

    const countProductQtd = (product_id:string) => {
      const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
      const item = cart[item_index];
      return item?.qtd ?? 0;
    }

    const handleClick = (n:number, product:any) =>{
      switch(n){
          case 1 : return  dispatch(pushToCart(product))
          case -1 : return dispatch(removeFromCart(product))
          default: break;
      }
  }

    return (
        <div id="product-page">
          <div className='app-container'>
            { !product ? (<span> Loading ... </span>) :
              <div className='prouct-page-container'>
                  <ProductBreadCrumbs breadCrumbs={breadCrumbs}/>
                  <section> <GaleryContainer/> </section>
                  <section>
                      <span className='product-page-specification'>{product.specification}</span>
                      <span className='product-page-brand'> <label>Marca:</label> {product.brand?.label}</span> 
                      <span className='product-page-presentation'><label> Apresentação:</label> {product.presentation?.label}</span>  
                      
                      <span className='product-page-code'>EAN: {product.ean}</span> 
                      <span className='product-page-code'>NCM: {product.ncm}</span> 
                      <span className='product-page-code'>SKU: {product.sku}</span> 

                      <div className='product-page-cart-option'>
                        { !countProductQtd(product.id) ? <SubmitButton  onClick={()=>handleClick(1, product)}> Adicionar <BsCart4/> </SubmitButton>
                        : <CounterControl altType onInput={(n)=>handleClick(n,product)} value={countProductQtd(product.id)}></CounterControl> } 
                      </div>
                  </section>
                  <section>
                    <span>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce scelerisque, erat a ullamcorper lacinia, felis risus ultrices enim, id tincidunt erat risus ac nisi. 
                        Quisque consequat magna aliquam lobortis elementum.
                        Donec eleifend congue sem, sed congue nunc venenatis vel. 
                        Cras sed mi eu mauris auctor dictum in quis justo. 
                        Phasellus tincidunt gravida purus, sit amet ultricies mi facilisis imperdiet. Mauris in blandit erat, sed fringilla est. 
                        Nunc scelerisque gravida mauris nec mattis. Aenean vehicula turpis et luctus gravida. Suspendisse ac vehicula felis. 
                        Vestibulum convallis sem eget neque suscipit, vel aliquam tortor aliquet. Maecenas aliquam posuere ligula. 
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                        Morbi justo nibh, interdum sed tempor ac, scelerisque in ante. Sed ut varius lorem, sit amet accumsan nibh. 
                    </span>
                   

                  </section>
              </div>
              }
          </div>

        </div>
    )
}

export default ProductPage