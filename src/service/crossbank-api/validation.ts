// import type { ProductType } from '../features/types/productType';
// import {axiosInstanceProduct} from'../lib/constants/axiosInstance';
// import { API_ENDPOINT } from '../lib/constants/apiEndpoints';

// export const fetchProducts = async () => {
//   const { data } = await axiosInstanceProduct.get(API_ENDPOINT.GET_ALL_PRODUCTS);
//   return data.products;
// };

// export const createProduct = async (payload: Partial<ProductType>) => { 
//   const { data } = await axiosInstanceProduct.post(API_ENDPOINT.CREATE_PRODUCT, payload);
//   return data;
// };

// export const updateProduct = async ({ id, payload }: { id: number; : Partial<ProductType> }) => {
//   const { data } = await axiosInstanceProduct.put(API_ENDPOINT.UPDATE_PRODUCT(id), payload);
//   return data;
// };

// export const deleteProduct = async (id: number) => {
//   const { data } = await axiosInstanceProduct.delete(API_ENDPOINT.DELETE_PRODUCT(id));
//   return data;
// };
