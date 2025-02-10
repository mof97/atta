<template>
  <div id="flight-details">
    <PageHeader label="Flight Details" img-path="../assets/images/headers/details.png" />
    <section class="pt-10">
      <div class="container max-w-screen-lg">
        <Card class="mb-5" :title="`${direct.from.name} - ${direct.to.name}`" :icon="index%2===0?'tdesign:flight-takeoff':'tdesign:flight-landing'" v-for="(direct,index) in getCombinedSegments(flightData.directions)">
          <template #body>
            <div class="bg-white px-5 grid grid-cols-2 py-20">
              <div>
                <n-timeline>
                  <n-timeline-item content="Oops">
                    <template #default>
                      <div class="h-40 -mt-8">
                        <h2 class="text-2xl font-bold">
                          {{ formatDate(direct?.departure?.formated_time, 'HH:mm') }}
                        </h2>
                        <p class="text-xl">
                          {{ formatDate(direct?.departure?.formated_time, 'ddd, DD MMM') }}
                        </p>
                        <span class="text-nive-light">
                        {{ direct?.from?.name }}
                      </span>
                      </div>

                    </template>
                  </n-timeline-item>
                  <n-timeline-item content="Oops">
                    <template #default>
                      <div class="-mt-8">
                        <h2 class="text-2xl font-bold">
                          {{ formatDate(direct?.arrival?.formated_time, 'HH:mm') }}
                        </h2>
                        <p class="text-xl">
                          {{ formatDate(direct?.arrival?.formated_time, 'ddd, DD MMM') }}
                        </p>
                        <span class="text-nive-light">
                        {{ direct?.to?.name }}
                      </span>
                      </div>
                    </template>
                  </n-timeline-item>
                </n-timeline>
              </div>
              <div class="flex items-end">
                <div class="airline">
                  <div class="logo w-12 rounded-md bg-opacity-10 h-12 bg-third flex-center">
                    <img class="w-28" :src="direct?.airline?.logo" alt="">
                  </div>
                  <div class="info">
                    <h2 class="text-lg flex items-center gap-2">
                      {{ direct?.airline?.name }}
                      <ul class="flex items-center gap-1 text-[12px] text-nive-light">
                        <li class="flex items-center gap-1">
                          <Icon name="subway:airplane-mode" />
                          {{direct.flight_number}}
                        </li>
                      </ul>
                    </h2>
                    <ul class="flex items-center gap-1 text-nive-light">
                      <li class="flex items-center gap-2">
                        <Icon class="text-xl" name="carbon:branch" />
                        {{ direct?.class?.service }} - {{ direct?.class?.booking }}
                      </li>
                      <li class="flex items-center gap-2">
                        <Icon class="text-xl" name="fluent-emoji-high-contrast:seat" />
                        {{ direct?.class?.seats_available }} Available set
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section class="">
      <div class="container max-w-screen-lg">
        <Card class="mb-5" title="Baggage Details ADT" icon="mdi:bag-suitcase-outline" >
          <template #body>
            <div class="px-5 py-10">
              <div v-for="passenger in flightData.baggage_allowance">
                <h2 class="text-lg text-primary mb-3">
                  {{passenger.passenger_type}}
                </h2>
                <n-timeline>
                  <n-timeline-item content="Oops" v-for="baggage in passenger.baggage_allowance">
                    <template #default>
                      <div class="  w-8/12">
                        <h2 class="text-2xl font-bold -mt-2 mb-3">
                          {{ baggage.from.name }}
                        </h2>
                        <ul class="list-unstyled text-nive-light">
                          <li class="mb-5">
                            <h2 class="text-xl flex items-center gap-2 font-bold">
                              <Icon name="mdi:bag-suitcase-outline"/>
                              {{ baggage.bag_details.amount }} {{ baggage.bag_details.unit }}
                            </h2>
                            <p>{{baggage.text_info}}</p>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </n-timeline-item>
                </n-timeline>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section>
      <div class="container max-w-screen-lg">
        <Card title="Price Details" icon="mdi:dollar">
          <template #body>
            <div class="p-5">
              <ul class="text-[14px] grid grid-cols-1 gap-2">
                <li class="flex items-center gap-10">
                <span>
                  Base Fare
                </span>
                  <span class="w-40 h-[1px] bg-gray-200"></span>
                  <span>
                  {{flightData?.price?.base}} {{flightData?.price?.currency}}
                </span>
                </li>
                <li class="flex items-center gap-8">
                <span>
                  Taxes and fees
                </span>
                  <span class="w-40 h-[1px] bg-gray-200"></span>
                  <span>
                  {{flightData?.price?.taxes}} {{flightData?.price?.currency}}
                </span>
                </li>
                <template v-for="type in ['ADT','CHD','INF']" >
                  <li class="flex items-center gap-8" v-if="flightData?.passengerFares[type]?.total">
                    <span>
                      {{ type }}
                    </span>
                      <span class="w-40 h-[1px] bg-gray-200"></span>
                      <span>
                      {{flightData?.passengerFares[type]?.total}} {{flightData?.passengerFares[type]?.currency}}
                    </span>
                  </li>
                </template>
              </ul>
              <div class="pt-3">
                <span class="text-nive-light">
                  Total Price
                </span>
                <h2 class="text-xl font-bold">{{flightData?.price?.total}} {{flightData?.price?.currency}}</h2>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section class="py-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button @click="Router.go(-1)" type="default" class="px-10">
          Back
        </n-button>
        <n-button @click="goNext()" type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {formatDate} from "~/utils/helpers";
const flightData = ref(JSON.parse(sessionStorage.getItem('ATA-selected-flight-info')))
const Router = useRouter()
const Route = useRoute()

function getCombinedSegments(flightDetails) {
  // Extract and combine all the segments from the provided flight details
  const combinedSegments = [];

  flightDetails.forEach(flight => {
    if (flight.segments && Array.isArray(flight.segments)) {
      combinedSegments.push(...flight.segments); // Combine segments into one array
    }
  });

  return combinedSegments;
}


const goNext = () => {
  Router.push({
    path:'/Flights/fares',
    query:Route.query
  })
}
</script>
<style>
#flight-details .n-timeline .n-timeline-item .n-timeline-item-timeline .n-timeline-item-timeline__circle{
  @apply bg-primary border-0
}
#flight-details .n-timeline .n-timeline-item .n-timeline-item-timeline .n-timeline-item-timeline__line{
  @apply bg-primary border-0
}

</style>