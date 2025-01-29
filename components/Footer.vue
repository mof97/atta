<template>
  <footer class="footer bg-black mt-20 relative py-20 ">
    <img class="-mt-[132px]" src="@/assets/images/banner.png">

    <div class="container text-white grid grid-cols-4 pt-20 overflow-hidden">
<!--      <img class="absolute -bottom-20 -right-40" src="@/assets/images/bat.png">-->
      <div class="services ">
        <h2 class="text-2xl mb-10">
          Services
        </h2>
        <ul class=" grid gap-5 text-sm">
          <li>
            <NuxtLink to="/">
              Flights
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Hotels
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Visa
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Groups
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="support">
        <h2 class="text-2xl  mb-10">
          Support
        </h2>
        <ul class=" grid text-sm gap-5">
          <li>
            <NuxtLink to="/">
              Contact
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Privacy policy
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              About Us
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="contact">
        <h2 class="text-2xl mb-10">
          Contact
        </h2>
        <ul class=" grid text-sm gap-5">
          <li>
            <NuxtLink to="/">
              +964 772 000 0000
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              ataa@info.com
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Baghdad - Iraq
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="support">
        <h2 class="text-2xl mb-10">
          Social Media
        </h2>
        <ul class="flex items-center text-2xl gap-3 text-white">
          <li class="  flex items-center">
            <Icon name="ri:instagram-fill"/>
          </li>
          <li class="  flex items-center">
            <Icon name="entypo-social:facebook"/>
          </li>
          <li class=" flex items-center">
            <Icon name="mdi:linkedin"/>
          </li>
          <li class="  flex items-center">
            <Icon name="prime:twitter"/>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
</script>