import Axios from "axios";
import { TProduct, TProductPost } from "../../types";

export const useProductService = () => {
  const baseUrl = "https://5fb13d76590189001644662d.mockapi.io/api/product";
  const getProducts = async () => await Axios.get(baseUrl);
  const postProduct = async (product: TProductPost) =>
    await Axios.post(baseUrl, product);
  const updateProduct = async (product: TProduct) =>
    await Axios.put(`${baseUrl}/${product.id_product}`, product);
  const deleteProduct = async (id: string) =>
    await Axios.put(`${baseUrl}/${id}`);
  return { getProducts, postProduct, updateProduct, deleteProduct } as const;
};
