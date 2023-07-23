import axios from "axios";
import { server_url } from "../utils/endpoint";
import { storeUser } from "../utils/local_storage";

export const login = async(data)=>{
    try {
     const response = await axios.post(`${server_url}/user/login`,data)
     console.log("Response",response)
     storeUser(response.data.body)
     return response.data
    } catch (error) {
      return error.response.data;
    }
 }
 export const registerUser = async(data)=>{
  try {
   const response = await axios.post(`${server_url}/user/register`,data)
   console.log("Response",response)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
export const updateUser = async(data,uuid)=>{
  try {
   const response = await axios.patch(`${server_url}/user/${uuid}`,data)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
export const deleteUser = async(uuid)=>{
  try {
   const response = await axios.delete(`${server_url}/user/${uuid}`)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
 export const getUsers = async()=>{
  try {
    const response = await axios.get(`${server_url}/user/`)
    console.log(response.data.body)
    return response.data.body
  } catch (error) {
    return error.response;
  }
 }