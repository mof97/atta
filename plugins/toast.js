
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.use(Toast , {
        transition: "Vue-Toastification__bounce",
        maxToasts: 5,
        newestOnTop: true,
        position: "top-center",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      })
      nuxtApp.provide('useToast',Toast)
})