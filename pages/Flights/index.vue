<template>
  <div id="flights-home">
    <Loader v-if="is_loading" />
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
            <Button class="w-40" @click="goToDist" title="Explore" icon="solar:mouse-outline" size="medium"></Button>
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
        <DistCard  v-for="(dist,index) in topDist" class="col-span-4" :class="[index === 0 || index === 3  ? 'col-span-8' :'']" :dist="dist"/>
      </div>
    </section>
    <section id="top-dist" class="mt-10 relative">
      <div class="overlay"></div>
      <video autoplay loop class="h-[500px] w-full object-cover" src="@/assets/video/main.mp4"></video>
    </section>
    <section id="airlines" class="mt-10 relative">
       <n-marquee loop auto-fill :speed="20">
         <div class="flex items-center gap-16">
           <img class="w-32"  src="@/assets/images/airlines/0.png" alt="">
           <img class="w-32" src="@/assets/images/airlines/01.png" alt="">
           <img class="w-32" src="@/assets/images/airlines/02.png" alt="">
           <img class="w-32" src="@/assets/images/airlines/03.png" alt="">
           <img class="w-32" src="@/assets/images/airlines/04.png" alt="">
         </div>
       </n-marquee>
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

import {useMapping} from "~/store/Flights/Mapping";
const Mapping = useMapping()
const is_loading = ref(true)
const topDist = ref([])

const goToDist = ()=>{
  window.scrollTo({
    top: document.querySelector('#top-dist').getBoundingClientRect().y,
    behavior: 'smooth',
  })
}

onMounted(()=>{
  Mapping.getTopDestinations('flight').then((data) => {
    topDist.value = data.data.items
    is_loading.value = false
  })
})
</script>
<style>

#topDist #top-dist-component{
  @apply col-span-4;
}

#topDist #top-dist-component:nth-of-type(1){
  @apply col-span-8;
}
#topDist #top-dist-component:nth-of-type(2){
  @apply col-span-4;
}
#topDist #top-dist-component:nth-of-type(3){
  @apply col-span-8;
}
#topDist #top-dist-component:nth-of-type(4){
  @apply col-span-4;
}

</style>