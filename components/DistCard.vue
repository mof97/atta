<template>
  <NuxtLink id="top-dist-component" class="relative" :to="dist.link" >
  <img class="rounded-md h-60 object-cover w-full" :src="dist.image" alt="">
    <div class="overlay rounded-md"></div>
  <div class="content absolute bottom-0 absolute z-10 text-white px-5 py-5">
    <h2 class="text-2xl mb-1">
      {{dist.name}}
    </h2>
    <p>
      {{dist.description}}
    </p>
  </div>
  </NuxtLink>
</template>
<script setup>
  defineProps({
    dist:{
      type: Object,
      default: () => {
        return {
          name:"Name",
          link:"/test",
          image:"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:"test",
        }
      }
    }
  })
</script>