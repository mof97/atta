import axios from "axios";
const filters = ref(null)
import {mainSearchPayload} from "~/utils/helpers.js";
export const useSearch = defineStore('Search', () => {
    const search_id=ref(null)
    const trace_id=ref(null)
    const result_id=ref(null)
    const result=ref(null)


    async function getAirPorts(query){
        const {data} = await axios.get(`/mapping/airports?query=${query}`)
        return data.data.items
    }

    async function getMainResult(payload){
        const {data} = await axios.post(`/flight/low-fare-search`,payload)
        result.value = data.data.search_flight
        filters.value = data.data.filters
        search_id.value = result?.value[0]?.search_id
        sessionStorage.setItem('ATA-Passenger', JSON.stringify({
            adt:payload.adt,
            chd:payload.chd,
            inf:payload.inf
        }))
    }

    async function filterResult(payload){
        await axios.post(`/flight/low-fare-search/${search_id.value}`,payload).then(({data})=>{
            result.value = data.data
        }).catch(()=>{
        })
    }

    return {
        getAirPorts,
        getMainResult,
        filterResult,
        trace_id,
        result_id,
        search_id,
        filters,
        result,
    }
})
