<template>
  <div id="fares-card" class="bg-white flex flex-col justify-between border-primary rounded-xl p-10">
    <div>
      <div class="card-head mb-3 flex items-center justify-between">
        <h2 class="text-secondary text-xl ">
          {{ fare?.title }}
        </h2>
        <p class="text-nive-light">
          {{ fare?.price?.total.toLocaleString() }} {{ fare?.price?.currency }}
        </p>
      </div>
      <ul class="mb-3 grid grid-cols-1 gap-2 text-nive-light">
        <li class="text-secondary" v-for="service in fare.fare_services">
          <div class="flex items-center gap-1">
            <Icon class="text-xl" name="lets-icons:check-fill" />
            {{ service.Title }}
          </div>
<!--          <p class="text-sm text-third pl-6">-->
<!--             {{ service.Description }}-->
<!--          </p>-->
        </li>
      </ul>
    </div>
    <button class="bg-gray-light  flex items-center gap-3 py-2 mt-3 rounded-full relative  justify-center duration-300">
      <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ">
        <Icon name="iconamoon:check-bold" />
      </span>
      Select
    </button>
  </div>
</template>
<script setup lang="ts">

  import Button from "~/components/Button.vue";

  const emits = defineEmits(['selectBrand'])


  const props = defineProps({
    fare:{
      type:Object,
      default:()=>{
        return {
          "brand_id": "640fd079-1563-415c-a339-a5432132b38d",
          "universal_key": [
            "640fd079-1563-415c-a339-a5432132b38d",
            "iVAXlb3jcYzwWmmk"
          ],
          "title": "Economy",
          "service_keys": [
            "1G5IAZ_3I733PK2OY19RSQ8WWJG1D129QON"
          ],
          "brand_images": null,
          "price": {
            "total": "625,000",
            "base": 0,
            "taxes": 0,
            "currency": "USD"
          },
          "commission": {
            "type": "",
            "amount": 0,
            "currency": "",
            "ref": 0,
            "ref_value": ""
          },
          "ancillary_service": {
            "available_baggage": false,
            "available_meal": false,
            "available_seat": false
          },
          "service_charge": null,
          "fare_services": [
            {
              "Title": "Baggage",
              "Description": "30 KG",
              "InclusionType": "1"
            },
            {
              "Title": "Cancellation",
              "Description": "Cancel permitted Prior To Departure",
              "InclusionType": "1"
            },
            {
              "Title": "Change",
              "Description": "Reissue permitted Prior To Departure",
              "InclusionType": "1"
            }
          ],
          "fare_segments": null,
          "brand_tier": ""
        }
      }
    },
    isActive:{
      type:Boolean,
    }
  })

  const handelSelectBrand = ()=>{
    emits('selectBrand')
  }

</script>
