import axios from "axios";

export const useBaggage = defineStore('baggage', () => {
    async function getBaggage(payload){
        const response= await axios.post('/flight/baggage-map',payload)
        return response.data.data
    }

    async function getMeals(payload){
        const response= await axios.post('/flight/meal-map',payload)
        return response.data.data
    }
    async function getSeatMap(payload){
        const response= await axios.post('/flight/seat-map',payload)
        return response.data.data
    }
    return {getBaggage,getMeals,getSeatMap}
})