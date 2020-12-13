import Axios from "axios";
import { TProduct, TProductPost, TTranscationPost } from "../../types";

export const useProductService = () => {
  const baseUrl = process.env.REACT_APP_URL_PRODUCT || "";
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
  const baseUrl = process.env.REACT_APP_URL_TRANSACTION || "";
  const getTransaction = async () => await Axios.get(baseUrl);
  const postTransaction = async (data: TTranscationPost) =>
    await Axios.post(baseUrl, data);
  const doneTransaction = async (id: string, imgUrl: string) =>
    await Axios.put(`${baseUrl}/${id}`, {
      status: true,
      payment_image: imgUrl,
    });

  return {
    getTransaction,
    postTransaction,
    doneTransaction,
  } as const;
};
