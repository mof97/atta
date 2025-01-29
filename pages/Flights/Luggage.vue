<template>
  <div id="flight-luggage">
    <PageHeader />
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <n-tabs type="line" animated>
            <n-tab-pane name="BGW - IST" tab="BGW - IST">
              <div class="grid grid-cols-4 gap-x-5 py-2">
                <h2 class="col-span-full text-xl mb-3">
                  1. ADT
                </h2>
                <div class="rounded-xl  bg-white " v-for="item in 4">
                  <div class="card-head rounded-t-xl bg-primary flex items-center justify-center py-5">
                <span class="w-12 h-12 rounded-full p-1 inline-block bg-gray-light">
                  <span class="w-full h-full text-black bg-white flex items-center justify-center rounded-full shadow">
                    <Icon class="text-3xl" name="mdi:bag-suitcase-outline"/>
                  </span>
                </span>
                  </div>
                  <div class="px-5 py-5">
                    <h2 class="text-xl mb-1 text-center ">
                      20 Kg 1 Piece
                    </h2>
                    <p class="text-nive-light text-center">625,000 IQD</p>
                    <button class="bg-gray-light w-full  flex items-center gap-3 py-2 mt-3 rounded-full relative  justify-center duration-300">
                <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ">
                  <Icon name="iconamoon:check-bold" />
                </span>
                      Select
                    </button>
                  </div>

                </div>
              </div>
            </n-tab-pane>
            <n-tab-pane name="IST - BGW" tab="IST - BGW">
              <div class="grid grid-cols-4 gap-x-5 py-2">
                <h2 class="col-span-full text-xl mb-3">
                  1. ADT
                </h2>
                <div class="rounded-xl  bg-white " v-for="item in 4">
                  <div class="card-head rounded-t-xl bg-primary flex items-center justify-center py-5">
                <span class="w-12 h-12 rounded-full p-1 inline-block bg-gray-light">
                  <span class="w-full h-full text-black bg-white flex items-center justify-center rounded-full shadow">
                    <Icon class="text-3xl" name="mdi:bag-suitcase-outline"/>
                  </span>
                </span>
                  </div>
                  <div class="px-5 py-5">
                    <h2 class="text-xl mb-1 text-center ">
                      20 Kg 1 Piece
                    </h2>
                    <p class="text-nive-light text-center">625,000 IQD</p>
                    <button class="bg-gray-light w-full  flex items-center gap-3 py-2 mt-3 rounded-full relative  justify-center duration-300">
                <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ">
                  <Icon name="iconamoon:check-bold" />
                </span>
                      Select
                    </button>
                  </div>

                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <n-tabs type="line" animated>
            <n-tab-pane name="BGW - IST" tab="BGW - IST">
              <div class="py-5 grid gap-5 grid-cols-4">
                <div v-for="item in 4">
                  <h2 class="mb-2">
                    1.Adult Meal
                  </h2>
                  <n-select :options="[]" bordered placeholder="No Meal Selected" />
                </div>
              </div>
            </n-tab-pane>
            <n-tab-pane name="IST - BGW" tab="IST - BGW">
              <div class="py-5 grid gap-5 grid-cols-4">
                <div v-for="item in 4">
                  <h2 class="mb-2">
                    1.Adult Meal
                  </h2>
                  <n-select :options="[]" bordered placeholder="No Meal Selected" />
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <n-tabs type="line" animated>
            <n-tab-pane name="BGW - IST" tab="BGW - IST">
              <div class="py-5">
                <h2 class="text-lg mb-2">1. Select Seat Map For Adult</h2>
                <div class="bg-white p-3">
                  <img src="@/assets/images/seat.png">
                </div>
              </div>

            </n-tab-pane>
            <n-tab-pane name="IST - BGW" tab="IST - BGW">
              <div class="py-5">
                <h2 class="text-lg mb-2">1. Select Seat Map For Adult</h2>
                <div class="bg-white p-3">
                  <img src="@/assets/images/seat.png">
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
    <section class="py-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button type="default" class="px-10">
          Back
        </n-button>
        <n-button type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import Button from "~/components/Button.vue";
</script>