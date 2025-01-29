import axios from "axios";
export const useAttachments = defineStore('Attachments', () => {
    async function upload(payload){
        return await axios.post('/attachment/upload',payload)
    }
    return {upload}
})
