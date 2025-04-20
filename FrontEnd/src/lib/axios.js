import axiosI from "axios"

const axios=axiosI.create({
    baseURL:"http://localhost:8800/api",
    withCredentials:true,
})
export default axios;