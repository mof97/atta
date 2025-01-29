<template>
  <div id="flight-details">
    <PageHeader />
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <h2 class="text-xl mb-3 flex items-center gap-3">
            <Icon name="cil:flight-takeoff"/>
            Baghdad International Airport - Sharjah International Airport
          </h2>
          <div class="bg-white px-5 grid grid-cols-2 py-20">
            <div>
              <n-timeline>
                <n-timeline-item content="Oops">
                  <template #default>
                    <div class="h-40 -mt-8">
                      <h2 class="text-2xl font-bold">
                        12:20
                      </h2>
                      <p class="text-xl">
                        20th January 2025
                      </p>
                      <span class="text-nive-light">
                        Baghdad International Airport
                      </span>
                    </div>

                  </template>
                </n-timeline-item>
                <n-timeline-item content="Oops">
                  <template #default>
                    <div class="-mt-8">
                      <h2 class="text-2xl font-bold">
                        12:20
                      </h2>
                      <p class="text-xl">
                        20th January 2025
                      </p>
                      <span class="text-nive-light">
                        Baghdad International Airport
                      </span>
                    </div>
                  </template>
                </n-timeline-item>
              </n-timeline>
            </div>
            <div class="flex items-end">
              <div>
                <img class="w-16 mb-3" src="https://www.gstatic.com/flights/airline_logos/70px/TK.png" alt="">
                <h2 class="text-lg flex items-center gap-2">
                  Turkish Airlines
                  <ul class="flex items-center gap-1 text-[12px] text-nive-light">
                    <li class="flex items-center gap-1" >
                      <Icon name="subway:airplane-mode" />
                      TK423
                    </li>
                  </ul>
                </h2>
                <div class="cites flex font-[500] items-center gap-2 text-nive-light text-[14px] mb-1">
                  Baghdad
                  <Icon class="text-xl" :name="`mynaui:arrow-right`" />
                  Istanbul
                  <span class="text-[#68727D] font-[400] text-nive-light">
                    Monday, 20 Jan
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <Icon name="mdi:bag-suitcase-outline"/>
            Baggage Details ADT
          </h2>
          <div class="bg-white px-5 py-20">
            <div>
              <n-timeline>
                <n-timeline-item content="Oops" v-for="item in 2">
                  <template #default>
                    <div class="  w-8/12">
                      <h2 class="text-2xl font-bold -mt-2 mb-3">
                        Baghdad International Airport - Sharjah International Airport
                      </h2>
                      <ul class="list-unstyled text-nive-light">
                        <li class="mb-5" v-for="item in 2">
                          <h2 class="text-xl flex items-center gap-2 font-bold">
                            <Icon name="mdi:bag-suitcase-outline"/>
                            30 KG
                          </h2>
                          <p>Baggage 30 KG Baggage - 1 PIECE X 8 KG CABIN BAGGAGEMEAL SERVICESTANDARD SEAT SELECTIONCHANGEABLE TICKETREFUNDABLE TICKETFRONT SEAT SELECTIONONLINE MESSAGE RIGHT</p>
                        </li>
                      </ul>
                    </div>

                  </template>
                </n-timeline-item>
              </n-timeline>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-10">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <h2 class="text-xl mb-3 flex items-center gap-2">
            <Icon name="mdi:dollar"/>
            Price Details
          </h2>
          <div class="bg-white px-5 py-5">
            <ul class="text-[14px] grid grid-cols-1 gap-2">
              <li class="flex items-center gap-10">
                <span>
                  Base Fare
                </span>
                <span class="w-40 h-[1px] bg-gray-200"></span>
                <span>
                  200 $
                </span>
              </li>
              <li class="flex items-center gap-8">
                <span>
                  Taxes and fees
                </span>
                <span class="w-40 h-[1px] bg-gray-200"></span>
                <span>
                  20 $
                </span>
              </li>
              <li class="flex items-center gap-8">
                <span>
                  Adult
                </span>
                <span class="w-40 h-[1px] bg-gray-200"></span>
                <span>
                  100 $
                </span>
              </li>
              <li class="flex items-center gap-8">
                <span>
                  Child
                </span>
                <span class="w-40 h-[1px] bg-gray-200"></span>
                <span>
                  50 $
                </span>
              </li>
              <li class="flex items-center gap-8">
                <span>
                  Infant
                </span>
                <span class="w-40 h-[1px] bg-gray-200"></span>
                <span>
                  0 $
                </span>
              </li>
            </ul>
            <div class="pt-3">
              <span class="text-naive-light">
                Total Price
              </span>
              <h2 class="text-xl font-bold">1,000 USD</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button type="default" class="px-10">
          Back
        </n-button>
        <n-button @click="Router.push('/Flights/fares')" type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {formatDate} from "~/utils/helpers";
const Router = useRouter()
</script>
<style>
#flight-details .n-timeline .n-timeline-item .n-timeline-item-timeline .n-timeline-item-timeline__circle{
  @apply bg-primary border-0
}
#flight-details .n-timeline .n-timeline-item .n-timeline-item-timeline .n-timeline-item-timeline__line{
  @apply bg-primary border-0
}

</style>