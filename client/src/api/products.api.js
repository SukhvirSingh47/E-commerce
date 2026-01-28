import { http } from "./http";

export const getproducts = () =>
    http("/auth/products",
        {
            auth: false
        }
    );

export const getproductList = (search) =>

    http(`/auth/query?search=${search}`,
        {
            auth: false
        }
    )  

export const getproductInfo =(id)=>
    
    http(`/auth/productInfo?id=${id}`,
        {
            auth:false
        }
    )