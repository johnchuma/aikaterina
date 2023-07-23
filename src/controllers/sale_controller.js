import axios from "axios";
import { server_url } from "../utils/endpoint";


export const createSale = async(data,uuid)=>{
    try {
    
     const response = await axios.post(`${server_url}/sale/${uuid}`,data)
     console.log(response)
     return response.data.body
    } catch (error) {
        console.log(error.response.data)
      return error.response.data;
    }
 }

 export const getSales = async ()=>{
    try {
        const response = await axios.get(`${server_url}/sale/`)
        console.log(response)
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}

export const getTodaySales = async ()=>{
    try {
        const response = await axios.get(`${server_url}/sale/today`)
        return response.data.body;
    } catch (error) {
        return error.response.data;
    }
}

export const totalTodaySales = async ()=>{
    let sales = await getTodaySales();
    let total = 0;
    sales.map((item)=>total = total+item.amount*item.Stock.sellingPrice)
    return total;
}