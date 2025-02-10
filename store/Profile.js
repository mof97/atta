import axios from "axios";
export const useProfile = defineStore('Profile', () => {
    const profile = ref([])
    async function getProfile(params){
        const res =  await axios.get('/profile',{
            params: params
        })
        profile.value = res.data.data
        return res.data.data
    }

    async function getVisaBook(params){
        return await axios.get('/visa/book-history',{
            params: params
        })
    }
    async function getGroupsBook(params){
        return await axios.get('/group/book-history',{
            params: params
        })
    }
    async function getFlightBook(params){
        return await axios.get('/flight/get-book-history',{
            params: params
        })
    }
    async function getTransactions(params){
        return await axios.get('/transactions',{
            params: params
        })
    }

    return {
        profile,
        getProfile,
        getVisaBook,
        getFlightBook,
        getGroupsBook,
        getTransactions

    }
})
