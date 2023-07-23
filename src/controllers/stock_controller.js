import axios from "axios";
import { server_url } from "../utils/endpoint";

export const getStocks = async()=>{
    try {
      const response = await axios.get(`${server_url}/stock/`)
      return response.data.body
    } catch (error) {
      return error.response.data;
    }
   }
   export const outOfStocks = async()=>{
    try {
      const response = await axios.get(`${server_url}/product/out-of-stock`)
      return response.data.body
    } catch (error) {
      return error.response.data;
    }
   }

   export const exipiringProducts = async()=>{
    try {
      const response = await axios.get(`${server_url}/product/expiring`)
      return response.data.body
    } catch (error) {
      return error.response.data;
    }
   }


   export const createStock = async(data,uuid)=>{
    try {
     const response = await axios.post(`${server_url}/stock/${uuid}`,data)
     return response.data.status
    } catch (error) {
      return error.response.data;
    }
 }