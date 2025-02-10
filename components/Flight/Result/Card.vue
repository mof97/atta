<template>
  <div id="result-card" class="p-5 grid grid-cols-12 rounded-lg bg-gray-light relative">
    <div class="segments grid grid-cols-1 col-span-8 gap-3 pr-5">
      <FlightResultSegment class="" :type="(index+1) % 2 === 0 ? 'left':'right'" v-for="(segment,index) in flight.directions" :segment="segment" />
    </div>
    <div class="price col-span-4 flex items-end justify-center text-center relative border-l-2 border-dashed">
      <div class="line w-10 h-10 bg-white absolute -top-10 -left-[20px] rounded-full"></div>
      <div class="line w-10 h-10 bg-white absolute -bottom-10 -left-[20px] rounded-full"></div>
<!--      <div class="tag absolute top-0 right-0">-->
<!--        <Button title="Private Fare" class="bg-primary" icon="mdi:dollar" />-->
<!--      </div>-->
<!--      <div class="bag-details">-->
<!--        <FlightResultBaggageModal :data="selectedBaggage" @update:active="baggageModal = false" :active="baggageModal" />-->
<!--      </div>-->
      <div>
        <span class="text-nive-light">Price</span>
        <div class="flex items-center gap-1 mb-2">
          <span class="text-xl font-bold">
            {{flight?.price?.total?.toLocaleString()}} {{ flight?.price?.currency }}
          </span>
          <p class="text-sm text-center" v-if="flight.private_fare === true">
            Include Privet Fare
          </p>
          <n-tooltip trigger="hover">
            <template #trigger>
                  <Icon class="text-2xl cursor-pointer" name="akar-icons:info" />
            </template>
            <ul>
              <li class="grid grid-cols-3 gap-3 py-1 border-b-[1px] border-gray-700 text-[12px]" v-for="item in ['ADT','CHD','INF']" :key="item">
                  <span class="w-20">
                    {{flight?.passengerCounts[item]}} {{ item }}
                  </span>
                <span>
                    {{flight?.passengerFares[item]?.total?.toLocaleString()}} {{flight?.passengerFares[item]?.currency}}
                  </span>
                <span>
                    {{(flight?.passengerCounts[item] * flight?.passengerFares[item]?.total).toLocaleString()}} {{flight?.passengerFares[item]?.currency}}
                  </span>
              </li>
            </ul>
          </n-tooltip>
        </div>
        <n-button type="primary" block @click="handelSelectPrice">
          Select
        </n-button>
        <span class="text-gray-light">
          {{flight.supply_provider}}
        </span>
      </div>
<!--      <ul class="flex items-center gap-1 text-third" v-if="flight?.baggage_allowance">-->
<!--        <li @click="selectBaggage" class="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded duration-500 cursor-pointer hover:bg-primary hover:text-white">-->
<!--          <Icon class="text-2xl" name="mdi:bag-suitcase-outline" />-->
<!--        </li>-->
<!--        <li v-if="!flight?.direct_issue" class="flex items-center hover:gap-1 group duration-300 px-3 py-1 bg-gray-100 rounded duration-500 cursor-pointer hover:bg-primary hover:text-white">-->
<!--          <Icon class="text-2xl" name="eos-icons:hourglass" />-->
<!--          <span class="w-[0px] text-white group-hover:w-[275px] duration-300 whitespace-nowrap block overflow-hidden">-->
<!--            Will be ticketed within 4 working hours-->
<!--          </span>-->
<!--        </li>-->
<!--        <li class="text-white">-->
<!--          {{flight.supply_provider}}-->
<!--        </li>-->
<!--      </ul>-->
    </div>
  </div>
</template>
<script setup lang="ts">
const Router = useRouter()
const baggageModal = ref(false)
const selectedBaggage = ref({})


const selectBaggage = ()=>{
  selectedBaggage.value = props.flight.baggage_allowance
  baggageModal.value = true
}
const props = defineProps({
  flight:{
    type:Object
  }
})


  const handelSelectPrice = ()=>{
    sessionStorage.setItem('ATA-selected-flight-info', JSON.stringify(props.flight))
    Router.push({
      path:"/Flights/details",
      query:{
        result_id:props.flight.result_id,
        trace_id:props.flight.trace_id,
      }
    })
  }

</script>
