import axios from "axios";
export const useMapping = defineStore('Mapping', () => {
    const NationalityOptions = ref([])
    async function getTranslate(){
        const {data} = await axios.get('/mapping/translations')
        return  data
    }
    async function getNationality(){
        const {data} = await axios.get(`/mapping/countries`)
        NationalityOptions.value = data?.data?.map(el=>{
            return {
                value: el.nationality,
                label: `${el.emoji} ${el.name}`,
            }
        }) || []
    }

    async function getTopDestinations(type){
        const {data} = await axios.get(`/page/${type}`)
        return data
    }
    async function getAirline(q){
        const {data} = await axios.get(`/mapping/airlines?query=${q}`)
        return data
    }

    return {
        NationalityOptions,
        getTranslate,
        getNationality,
        getTopDestinations,
        getAirline
    }
})
