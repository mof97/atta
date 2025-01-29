import axios from "axios";
export const useFlights = defineStore('Flights', () => {
    const fares = ref([])
    const flightInfo = ref(JSON.parse(sessionStorage.getItem('MTN-flight-info')) || 'test')

    async function getFares(payload){
        const {data} = await axios.post(`/flight/get-brand-fares`,payload)
        fares.value = data.data
    }

    async function flightPrice(payload){
        const {data} = await axios.post(`/flight/get-price`,payload)
        flightInfo.value = data.data
        sessionStorage.setItem('MTN-flight-info', JSON.stringify(data.data))
        return data
    }

    async function bookFlight(payload){
        const {data} = await axios.post(`/flight/book`,payload)
        return data.data
    }

    async function getBookData(payload){
        const {data} = await axios.post('/flight/get-book',payload)
        return data.data
    }

    async function issueTicket(payload){
        const {data} = await axios.post(`/flight/ticket`,payload)
        return data.data
    }

    async function getFlightRule(payload){
        const {data} = await axios.post(`/flight/get-fare-rule`,payload)
        return data.data
    }

    async function cancelBook(payload){
        await axios.post(`/flight/cancel`,payload)
    }

    async function voidBook(payload){
        await axios.post(`/flight/void`,payload)
    }

    return {
        fares,
        flightInfo,
        getFares,
        flightPrice,
        bookFlight,
        getBookData,
        issueTicket,
        cancelBook,
        voidBook,
        getFlightRule
    }
})
