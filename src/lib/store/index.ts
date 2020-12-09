import create from 'zustand'
import { TProduct } from '../../types'

type TProductStore = {
  products : TProduct[],
  womenProduct : TProduct[]
  menProduct : TProduct[],
  setProducts : ( product : TProduct[] )=> void
  setWomenProduct : (product : TProduct[]) => void
  setMenProduct : (product : TProduct[])=> void
}

type TCartStore = {
  productCart : TProduct[]
  addCart : (product : TProduct) => void
  removeCart : (id : string) => void
  emptyCart : ()=> void
}

const getProductFormLocal = () : TProduct[] => {
  let tmp : any;
  tmp = localStorage.getItem("products")
  return (
    JSON.parse(tmp) 
  )
}

const getCartFormLocal = () : TProduct[] => {
  let tmp : any;
  tmp = localStorage.getItem("cart")
  return (
    JSON.parse(tmp) 
  )
}

export const useProductStore = create<TProductStore>((set) => ({
  products: getProductFormLocal() || [],
  womenProduct : [],
  menProduct : [],
  setProducts : ( products : TProduct[] )=> set(state => {
    localStorage.setItem("products", JSON.stringify([...products]))
    return({ products : products })}),  
  setWomenProduct : ( products : TProduct[] )=> set(state => ({ womenProduct : products })),
  setMenProduct : ( products : TProduct[] )=> set(state => ({ menProduct : products }))
}));

export const useCartStore = create<TCartStore>((set) => ({
  productCart : getCartFormLocal() || [],
  addCart : (data : TProduct)=> set(state => {
    if(!state.productCart.some(e => e.id_product === data.id_product)){
      localStorage.setItem("cart", JSON.stringify([...state.productCart, data]))
      return( {productCart : [...state.productCart, data]} )
    }else{
      return ( { productCart : [...state.productCart]} )
    }
  }),
  removeCart : (id : string) => set(state=> {
    let filtered = state.productCart.filter(e => e.id_product !== id)
    localStorage.setItem("cart", JSON.stringify(filtered))
    return({ productCart : filtered })}),
  emptyCart : ()=>  set(state => {
    localStorage.removeItem("cart")
    return ( {productCart : []} )
  })
}) )
