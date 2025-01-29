<template>
  <div id="flight-fares">
    <PageHeader />
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <h2 class="text-xl mb-1 flex items-center gap-3 mb-3">
            <Icon name="cil:flight-takeoff"/>
            Baghdad International Airport - Sharjah International Airport
          </h2>
          <div class="flex items-center gap-2 overflow-x-auto">
            <FlightFaresCard class="flex-none w-80" v-for="item in 4" />
          </div>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <h2 class="text-xl mb-1 flex items-center gap-3 mb-3">
            <Icon name="cil:flight-takeoff"/>
            Sharjah International Airport -  Baghdad International Airport
          </h2>
          <div class="flex items-center gap-2 overflow-x-auto">
            <FlightFaresCard class="flex-none w-80" v-for="item in 4" />
          </div>
        </div>
      </div>
    </section>
    <section class="py-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button type="default" class="px-10">
          Back
        </n-button>
        <n-button @click="Router.push('/Flights/book')" type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const Router = useRouter()
</script>