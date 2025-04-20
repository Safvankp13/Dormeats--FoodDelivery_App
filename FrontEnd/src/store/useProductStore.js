import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  getProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("product/allProducts");
      set({ products: res.data, loading: false });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An Error Occured");
    }
  },
  createProduct:async(product)=>{
    set({loading:true})
    try {
        const res= await axios.post("product/createproduct",product);
        set({products:[...get().products,res.data]})
        set({loading:false})
    } catch (error) {
        set({loading:false})
        toast.error(error.response.data.message || "An Error Occured");
        
    }
  },
  updateProduct:async(id,product)=>{
    set({loading:false})
    try{
      const res=await axios.patch(`product/updateProduct/${id}`,product)
      set({products:get().products.map((item)=>item.id===id?{...item,...res.data}:item)})
      set({loading:false})
    }
    catch(error){
      set({loading:false})
      toast.error(error.response.data.message || "An Error Occured");
    }
  },
  deleteProduct:async(id)=>{
    set({loading:true})
    try {
        set({products:get().products.filter((item)=>item.id!==id)})
        await axios.delete(`product/deleteProduct/${id}`)
        
        set({loading:false})
    } catch (error) {
        set({loading:false})
        toast.error(error.response.data.message || "An Error Occured");
        
    }
  }
}
    

));
