<template>
  <button id="custom-button" :class="size" class="">
    <span class="icon-container">
      <Icon :name="icon" />
    </span>
    {{ title }}
  </button>
</template>
<script setup>

  defineProps({
    title:String,
    icon:String,
    size: {
      type: String,
      default: ()=> 'default',
    },
  })
</script>
<style scoped>
  #custom-button {
    @apply bg-gray-light  flex items-center gap-3  rounded-full relative  justify-center duration-300
  }

  #custom-button.default {
    @apply py-2 pl-10 pr-5
  }


  #custom-button.medium{
    @apply py-2 pl-14 pr-14
  }

  #custom-button .icon-container {
    transition: all .5s;
    @apply w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ;
    box-shadow: 0px 0px 11px -7px rgba(0,0,0,.25);
  }

  #custom-button:hover {
    @apply bg-primary text-white
  }
</style>