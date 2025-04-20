import axiosI from "axios"

const axios=axiosI.create({
    baseURL:"https://dormeats-backend.onrender.com/api",
    withCredentials:true,
})
export default axios;