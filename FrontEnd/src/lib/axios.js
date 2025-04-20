import axiosI from "axios"

const axios=axiosI.create({
    baseURL:"/api",
    withCredentials:true,
})
export default axios;