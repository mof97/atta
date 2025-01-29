<template>
  <div id="flights-home">
    <header>
      <div class="container ">
        <div class="content rounded-xl items-center relative grid grid-cols-2 py-20 px-10">
          <div class="overlay rounded-xl"></div>
          <div class="info relative z-20">
            <span class="text-primary">
              - ATA’ Al Khair Travel -
            </span>
            <h2 class="text-5xl mb-14 text-white  font-bold">Where You Get Trapped in the Beauty of the World and Unforgettable
              Happiness!</h2>
            <Button class="w-40" title="Explore" icon="solar:mouse-outline" size="medium"></Button>
          </div>
          <div>
            <FlightSearchMain />
          </div>
        </div>
      </div>
    </header>
    <section id="top-dist" class="pt-10">
      <div class="container grid grid-cols-12 gap-3 max-w-screen-lg">
        <h2 class="col-span-full text-2xl mb-3">
          Top Destination
        </h2>
        <DistCard class="col-span-8"/>
        <DistCard class="col-span-4"/>
        <DistCard class="col-span-4"/>
        <DistCard class="col-span-8"/>
      </div>
    </section>
    <section id="top-dist" class="mt-10 relative">
      <div class="overlay"></div>
      <video autoplay loop class="h-[500px] w-full object-cover" src="@/assets/video/main.mp4"></video>
    </section>
    <section id="airlines" class="mt-10 relative">
     <div class="container">
       <marquee loop auto-fill>
         <div class="flex items-center gap-16">
           <img  src="@/assets/images/airlines/0.png" alt="">
           <img  src="@/assets/images/airlines/01.png" alt="">
           <img  src="@/assets/images/airlines/02.png" alt="">
           <img  src="@/assets/images/airlines/03.png" alt="">
           <img  src="@/assets/images/airlines/04.png" alt="">
         </div>
       </marquee>
     </div>
    </section>
  </div>
</template>
<style>
  #flights-home header .content,
  #search-page header .content{
    background: url("@/assets/images/flight/home-header.jpg");
    background-size: cover;
  }
</style>
<script setup lang="ts">
</script>