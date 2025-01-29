<template>
  <div id="seat">
    <n-tooltip trigger="hover">
    <template #trigger>
      <img v-if="status === 'available'" class="w-10 -rotate-90"
           src="@/assets/imgs/seat-map/availabel.webp" alt="">
      <img v-if="status === 'unavailable'" class="w-10 -rotate-90"
           src="@/assets/imgs/seat-map/not-available.webp" alt="">
      <img v-if="status === 'reserved'"
           class="w-10 -rotate-90 clear-start opacity-30"
           src="@/assets/imgs/seat-map/availabel.webp" alt="">
      <img v-if="status === 'selected'" class="w-10 -rotate-90"
           src="@/assets/imgs/seat-map/selected.webp" alt="">
    </template>
    <ul>
      <li>
        <span>
          ADT :
        </span>
        <span>
          {{ row?.adult.price.total }} {{ row?.adult.price.currency }}
        </span>
      </li>
      <li>
        <span>
          CHD :
        </span>
        <span>
          {{ row?.child.price.total }} {{ row?.adult.price.currency }}
        </span>
      </li>
      <li class="flex items-center gap-1 justify-center pt-1" v-if="row.can_select_for_chd">
        <span class="p-1 rounded text-red-500" >
          Child
        </span>
      </li>
    </ul>
  </n-tooltip>
  </div>
</template>
<script setup>
defineProps({
  row:Object,
  status:String,
})
</script>
<style scoped>



</style>