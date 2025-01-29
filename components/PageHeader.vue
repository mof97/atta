<template>
  <header id="page-header-component" class="">
    <div class="container">
      <div class="relative">
        <div class="overlay rounded-xl"></div>
        <img class="h-68 w-full object-cover rounded-xl" src="@/assets/images/header-test.png" alt="">
        <div class="content py-5 px-10  z-10 absolute bottom-0 left-0 text-white">
          <span class="text-primary">
            - ATA’ Al Khair Travel -
          </span>
          <h2 class="text-4xl font-bold">
            Flight Details
          </h2>
          <div class="mt-8 flex items-center gap-3 cursor-pointer">
            <span class="w-9 h-9 rounded-full p-1 inline-block bg-gray-light">
              <span class="w-full h-full text-black bg-white flex items-center justify-center rounded-full shadow">
                <Icon class="text-xl" name="weui:back-filled"/>
              </span>
            </span>
            <span class="text-2xl">
              Back
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
</script>