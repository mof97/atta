import axios from "axios";
export const useAuth = defineStore('auth', () => {
    async function login(payload){
        const response= await axios.post('/login',payload)
        sessionStorage.setItem('MT-login-request-id',response.data.data.login_request_id)
        return response.data.data
    }
    async function resetPassword(payload){
        await axios.post('/reset-password',payload)
    }
    async function changePassword(payload){
        await axios.post('/change-password',payload)
    }
    async function sendNewPassword(payload){
        await axios.post('/reset-password/change',payload)
    }
    async function otp(payload){
        const response= await axios.post('/login',payload)
        localStorage.setItem('MT-token',response.data.data.token)
        localStorage.setItem('MT-user',JSON.stringify(response.data.data))
    }
    return {login ,resetPassword,sendNewPassword ,changePassword,otp}
})
