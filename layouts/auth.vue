<template>
  <div id="auth-layout" class=" min-h-[100vh] flex items-center">
    <div class="container grid grid-cols-2 gap-10 items-center">
      <div class="form rounded-xl py-20 px-20 w-10/12">
        <div class="form-head flex items-center justify-center flex-col">
          <div class="logo p-1 rounded bg-white">
            <img class="w-16" src="@/assets/images/logo/logo.png" alt="">
          </div>
          <h2 class="text-white text-2xl pt-3">
            Atta Al Khair
          </h2>
        </div>
        <slot/>
        <div class="form-footer">
          <ul class="flex items-center justify-center text-2xl pt-5 gap-3 text-white">
            <li class="  flex items-center">
              <Icon name="tdesign:map-location"/>
            </li>
            <li class="  flex items-center">
              <Icon name="line-md:phone"/>
            </li>
            <li class=" flex items-center">
              <Icon name="ic:outline-email"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <span class="bg-primary px-2 text-sm text-white py-1 rounded-md">
          ATA’ Al KHAIR
        </span>
        <h2 class="text-6xl font-bold text-white">
          Your Dream <br> Destination Awaits
        </h2>
        <ul class="flex items-center gap-1 pt-3">
          <li class="h-2 w-7/12 rounded-full bg-white"></li>
          <li class="h-2 w-2 rounded-full bg-white"></li>
          <li class="h-2 w-2 rounded-full bg-white"></li>
          <li class="h-2 w-2 rounded-full bg-white"></li>
          <li class="text-4xl text-white flex items-center">
            <Icon name="famicons:airplane"/>
          </li>
        </ul>
        <ul class="flex items-center text-2xl pt-5 gap-3 text-white">
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
  </div>
</template>

<style>
  #auth-layout {
    background: url("@/assets/images/auth-bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  #auth-layout .form {
    background: rgba( 0, 0, 0, 0.25 );
    backdrop-filter: blur( 7px );
    -webkit-backdrop-filter: blur( 7px );
  }

  #auth-layout .n-input {
    @apply py-2 bg-transparent text-lg text-white
  }
  #auth-layout .n-input .n-input__placeholder,
  #auth-layout .n-input .n-input__input-el{
    @apply text-white
  }
  #auth-layout .n-input .n-input__border {
    @apply border-2
  }

</style>
<script setup lang="ts">
</script>