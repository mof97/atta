import axios from "axios";
export const useVisa = defineStore('Visa', () => {
    const visa = ref([])
    const item=ref({})
    async function getAll(filter){
        const {data} = await axios.get('/visa',)
        visa.value = data
    }
    async function show(id){
        const {data} = await axios.get(`/visa/${id}`)
        item.value = data.data
    }

    async function book(payload){
        return await axios.post(`/visa/book`,payload)
    }

    return {
        getAll,
        show,
        visa,
        item,
        book
    }
})
