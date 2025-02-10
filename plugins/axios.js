import axios from 'axios'
import {useToast} from 'vue-toastification'
// import {useMapping} from "~/store/mapping.js";
const requestList = ref(['/flight/baggage-map','/flight/meal-map','/flight/seat-map'])
const toast = useToast()
export default defineNuxtPlugin((nuxtApp) => {
    axios.interceptors.request.use(config => {
        let runtimeConfig = nuxtApp.$config;
        config.baseURL = runtimeConfig.public.apiBaseURL
        config.proxy = true
        config.timeout = 300000 // 5 minutes
        config.headers = {
            "authorization": `Bearer ${localStorage.getItem('ATA-token') !== null ? localStorage.getItem('ATA-token') : ''}`,
        }
        return config;
    })
    axios.interceptors.response.use(response => {
            return response
        },
        (error) => {
            // const $mapping = useMapping()
            if (error.response && error.response.status === 401) {
                const $router = useRouter()
                localStorage.removeItem('login-request-id')
                localStorage.removeItem('fly-token')
                toast.error(error.response.data.message)
                $router.push('/auth')
            } else if (error.response && error.response.status === 400) {
                let errors = ""
                for (let item in error.response.data.errors) {
                    errors += `${error.response.data.errors[item]} \n`
                }
                toast.error(errors)
            }else{
                toast.error(error.response.data.message)
            }

            return Promise.reject(error);
        })
    return {
        axios
    }

})
