
import axios from "../lib/axios.js";
import { create } from "zustand";
import toast from "react-hot-toast";
import { useMembershipStore } from "./useMembershipStore";

export  const useUserStore=create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    signUp:async({name,email,password,confirmPassword})=>{
        set({loading:true})
        if(password!=confirmPassword){
            set({loading:false})
          toast.error("password Do not mach")
          return
        }
        try {
            const res=await axios.post("/auth/signup",{name,email,password})
            set({user:res.data.user,loading:false})

        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message||"An Error Occured")
        }


    },
    login:async({email,password})=>{
        set({loading:true})
        
        try {
            const res=await axios.post("/auth/login",{email,password})
            set({user:res.data.user,loading:false})

        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message||"An Error Occured")
        }

    },
    logout: async () => {
        try {
          await axios.post("/auth/logout");
          set({ user: null });
          useMembershipStore.setState({ membership: null });
          
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error.response?.data?.message || "Logout failed");
        }
      },
      checkAuth:async()=>{
         set({checkingAuth:true})
          try {
            const response=await axios.get("/auth/profile")
            console.log(response.data)
            set({user:response.data,checkingAuth:false})
            
          } catch (error) {
            set({checkingAuth:false,user:null})
            
          }

      },
      refreshToken:async()=>{
        if(get().checkingAuth)return;
        set({checkingAuth:true})
        try {
            const response=await axios.post("/auth/refresh-token")
            set({checkingAuth:false})
            return response.data
        } catch (error) {
            set({user:null,checkingAuth:false})
            
        }
      }

}))


let refreshPromise=null;
axios.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config; 
        if(error.response?.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
            try {
                if(refreshPromise){
                    await refreshPromise;
                    return axios (originalRequest);
                }   
                refreshPromise=useUserStore.getState().refreshToken();
                await refreshPromise;
                refreshPromise=null;
                return axios(originalRequest);
            } catch (error) {
                useUserStore.getState().logout()
                return Promise .reject(error)
                
            }
        }
        return Promise.reject(error)
    }
)