<template>
  <div id="navbar" class="py-5">
    <div class="container flex items-center justify-between">
      <ul class="flex items-center text-sm text-dark-light gap-3">
        <li class="logo">
          <img class="w-14" src="@/assets/images/logo/logo.png" alt="">
        </li>
        <li class="logo">
          <NuxtLink to="/">
            Privacy Policy
          </NuxtLink>
        </li>
        <li class="logo">
          <NuxtLink to="/">
            Contact
          </NuxtLink>
        </li>
        <li class="logo">
          <NuxtLink to="/">
            About
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center gap-3">
        <li class="" v-for ="item in navbarList">
          <NuxtLink :to="item.to">
            <Button :title="item.name" :icon="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

</template>
<script setup lang="ts">

const navbarList = ref([
  {
    name:"Flight",
    to:"/Flights",
    icon:"ph:airplane-tilt",
    show:computed(()=>Profile?.profile?.has_flight)
  },
  {
    name:"Hotels",
    to:"/Hotels",
    icon:"lucide:hotel",
    show:computed(()=>Profile?.profile?.has_hotels)
  },
  {
    name:"Visa",
    to:"/Visa",
    icon:"stash:user-id",
    show:computed(()=>Profile?.profile?.has_visa)
  },
  {
    name:"Groups",
    to:"/groups",
    icon:"ph:beach-ball",
    show:computed(()=>Profile?.profile?.has_group)
  },
  {
    name:"Profile",
    to:"/profile",
    icon:"solar:user-broken",
    show:true
  }
])

</script>