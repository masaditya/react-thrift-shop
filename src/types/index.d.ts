
export type TProduct = {
    id_product: string;
    prize: number;
    product_description: string;
    product_image: string;
    category: boolean;
    gender: boolean;
    product_name: string;
  };
  
export type TProductPost = Omit<TProduct, "id_product">;
  