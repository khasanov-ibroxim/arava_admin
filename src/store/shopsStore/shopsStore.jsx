import {create} from "zustand";
import {$API} from "@/utils/https.jsx";



const ShopsState = {
    allShops: [],
    shop_by_id_products: [],
    allShopsMainCategory:[],
    single_shop_work:{}
}

export const shopsStore = create((set , get)=>({
    ...ShopsState,

    getAllShops: async ()=>{
        try {
            const res = await $API.get("/shop")
            set({allShops: res.data.shops})
        }catch (e){
            console.log(e)
        }
    },
    getAllShopsMainCategory: async ()=>{
        try {
            const res = await $API.get("/main-category")
            set({allShopsMainCategory:res.data})
        }catch (e){
            console.log(e)
        }
    },
    getSingleShopWork: async (shop_id)=>{
        try {
            const res = await $API.get("/work/from_shop" , {params:{shop_id}})
            console.log(res)
        }catch (e){
            console.log(e)
        }
    },


    searchShop: async (search)=>{
        try {
            const res = await $API.get("/shop/search" , {
               params:{
                   search:search
               }
            })
           return res.data.shops
        }catch (e){
            console.log(e)
        }
    }
}))