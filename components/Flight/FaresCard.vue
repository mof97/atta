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
    <button @click="handelSelectBrand" :class="isActive ? 'bg-primary text-white':'bg-gray-light'" class="flex items-center gap-3 py-2 mt-3 rounded-full relative  justify-center duration-300">
      <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ">
        <Icon name="iconamoon:check-bold" />
      </span>
      Select
    </button>
  </div>
</template>
<script setup lang="ts">
  const emits = defineEmits(['selectBrand'])
  const props = defineProps({
    fare:{
      type:Object,
    },
    isActive:{
      type:Boolean,
    }
  })

  const handelSelectBrand = ()=>{
    emits('selectBrand')
  }

</script>
