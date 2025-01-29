import axios from "axios";
export const useGroups = defineStore('Groups', () => {
    const groups = ref([])
    const item=ref({})
    async function getAll(filter){
        const {data} = await axios.get('/group?take=100&skip=0',)
        groups.value = data
    }
    async function show(id){
        const {data} = await axios.get(`/group/${id}`)
        item.value = data.data
    }

    async function book(payload){
        return await axios.post(`/group/book`,payload)
    }

    return {
        getAll,
        show,
        groups,
        item,
        book
    }
})
