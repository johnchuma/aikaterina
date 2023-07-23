import axios from "axios";
import { server_url } from "../utils/endpoint";

export const getProducts = async()=>{
    try {
      const response = await axios.get(`${server_url}/product/`)
      console.log(response)
      return response.data.body
    } catch (error) {
      return error.response;
    }
   }

   export const createProduct = async(data)=>{
    try {
     const response = await axios.post(`${server_url}/product/`,data)
     return response.data.status
    } catch (error) {
      return error.response.data;
    }
 }
 export const updateProduct = async(data,uuid)=>{
  try {
   const response = await axios.patch(`${server_url}/product/${uuid}`,data)
   return response.data.status
  } catch (error) {
    return error.response.data;
  }
}
export const getProductSales = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/sale/${uuid}`)
   return response.data.body
  } catch (error) {
    return error.response.data;
  }
}
export const getProductStock = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/stock/${uuid}`)
   return response.data.body
  } catch (error) {
    return error.response.data;
  }
}
export const deleteProduct = async(uuid)=>{
  try {
   const response = await axios.delete(`${server_url}/product/${uuid}`)
   return response.data.status
  } catch (error) {
    return error.response.data;
  }
}