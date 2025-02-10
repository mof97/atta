
import VueSplide from '@splidejs/vue-splide';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueSplide)
    nuxtApp.vueApp.component('splide', Splide)
    nuxtApp.vueApp.component('SplideSlide', SplideSlide)
})
