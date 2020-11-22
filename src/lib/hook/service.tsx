import Axios from "axios";
import { TProduct, TProductPost, TTranscationPost } from "../../types";

export const useProductService = () => {
  const baseUrl = "https://5fb13d76590189001644662d.mockapi.io/api/product";
  const getProducts = async () => await Axios.get(baseUrl);
  const postProduct = async (product: TProductPost) =>
    await Axios.post(baseUrl, product);
  const updateProduct = async (product: TProduct) =>
    await Axios.put(`${baseUrl}/${product.id_product}`, product);
  const deleteProduct = async (id: string) =>
    await Axios.put(`${baseUrl}/${id}`);
  const findProduct = async (id: string) => await Axios.get(`${baseUrl}/${id}`);
  return {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    findProduct,
  } as const;
};

export const useTransactionService = () => {
  const baseUrl = "https://5fb13d76590189001644662d.mockapi.io/api/transaction";
  const getTransaction = async () => await Axios.get(baseUrl);
  const postTransaction = async (data: TTranscationPost) =>
    await Axios.post(baseUrl, data);

  return {
    getTransaction,
    postTransaction,
  };
};
