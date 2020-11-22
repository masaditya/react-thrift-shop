
export type TProduct = {
    id_product: string;
    prize: number;
    product_description: string;
    product_image: string;
    category: boolean;
    gender: boolean;
    product_name: string;
  };

export type TTransaction = {
  id : string;
  name : string;
  address : string;
  shipping_method : string;
  city : string;
  district : string;
  postal : string;
  phone : string;
  email : string;
  notes : string;
  status : boolean;
  prize : number;
  cart : TProduct[];
  payment_method : string;
  province : string;
}

export type TTranscationPost = Omit<TTransaction, "id">
  
export type TProductPost = Omit<TProduct, "id_product">;
  