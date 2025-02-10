// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt',],
  tailwindcss: {
    cssPath: ['~/assets/styles/main.css', { injectPosition: "first" }],
    config: {
      theme:{
        container:{
          center:true,
          padding:"2rem"
        },
        extend:{
          colors:{
            primary:'#009EE2',
            "gray-light":"#F6F6F6",
            "blue-light":"#F5F7FE",
            "dark-light":"#4D4D4D",
            "nive-light":"#96A0B5"
          }
        }

      }
    },
    viewer: true,
    exposeConfig: false,
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || "http://api-uat.pro-traveling.com/api/b2b/v1",
    }
  },
  pinia: {
    autoImports: [
      "defineStore",
    ],
  },
})