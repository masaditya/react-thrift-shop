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

export const useProductStore = create<TProductStore>((set) => ({
  products: [],
  womenProduct : [],
  menProduct : [],
  setProducts : ( products : TProduct[] )=> set(state => ({ products : products })),
  setWomenProduct : ( products : TProduct[] )=> set(state => ({ womenProduct : products })),
  setMenProduct : ( products : TProduct[] )=> set(state => ({ menProduct : products }))
}));