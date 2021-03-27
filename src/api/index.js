import { get,post } from "@/api/http";



export const Login =(params) =>post("/login",params);
export const getAll = (data) => post("/mydata/all",data);
export const getSite=() =>get("/site/getsite")
//此处如果有参数传入给后端就需要写上参数 params/data 否则可以为空