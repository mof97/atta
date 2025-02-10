<template>
  <NuxtLink :to="`/visa/book?id=${Route.params.id}&visa_type=${type.type}`">
    <div id="visa-card" class="bg-gray-light rounded-xl">
      <img class="h-60 w-full object-cover rounded-xl" :src="bg" alt="">
      <div class="p-5 flex items-center justify-between">
        <h2 class="text-lg">
          {{ type.type }}
        </h2>
        <div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="flex items-center gap-1 text-lg cursor-pointer">
                {{ type?.adult_price?.toLocaleString() }} {{type.currency}}
                <Icon class="text-xl" name="akar-icons:info" />
              </div>
            </template>
            <ul>
              <li class="flex mb-2 items-center justify-between">
                <span class="flex items-center gap-1 w-20">
                  <icon class="text-xl mb-1" name="fa-solid:child" />
                  Child
                </span>
                <span>
                  {{ type?.child_price?.toLocaleString() }} {{type.currency}}
                </span>
              </li>
              <li class="flex items-center justify-between">
                <span class="flex items-center gap-1 w-20">
                  <icon class="text-xl mb-1" name="material-symbols:child-care" />
                  Infant
                </span>
                <span>
                  {{ type?.infant_price?.toLocaleString() }} {{type.currency}}
                </span>
              </li>
            </ul>
          </n-tooltip>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
#visa-card .overlay{
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}
</style>
<script setup>
const Route = useRoute()
defineProps({
  type:{
    type:Object,
  },
  bg:{
    string:Object,
  },
})
</script>
