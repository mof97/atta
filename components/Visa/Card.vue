<template>
  <NuxtLink  :to="`visa/${data.id}`">
    <div id="visa-card-component" class="rounded-xl bg-gray-light">
      <img class="h-60 rounded-xl w-full shadow" :src="data?.image || 'https://plus.unsplash.com/premium_photo-1701104011406-b8352e13833e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="">
      <div class="p-5 ">
        <div class="info flex items-center justify-between">
          <h2 class="text-lg">
            {{ data.name }}
          </h2>
          <p class="text-lg">
            {{data.adult_price}} {{data.currency}}
          </p>

        </div>
        <span class="flex items-center gap-1 text-nive-light">
            <Icon class="text-xl" name="mingcute:time-duration-line"></Icon>
            {{data.duration}}
          </span>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
defineProps({
  data:{
    type:Object,
  }
})
</script>