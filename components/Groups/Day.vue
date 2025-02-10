<template>
  <div id="group-day-component" class="relative bg-gray-light rounded-xl">
    <img class="h-[100px] object-cover rounded-t-xl w-full" :src="day.image" alt="">
    <div class="content px-5 pt-10 pb-5">
      <h2 class="text-lg">
        {{ day.name }}
      </h2>
      <div class="text-nive-light" v-html="day.description"></div>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  day:Object
})

</script>