<template>
  <div id="filters">
    <ContentCard title="Filters">
      <template #actions>
        <span class="text-primary">
          Reset
        </span>
      </template>
      <template #content>
        <div id="stops" class="py-5 border-b">
          <h2 class="text-lg mb-3">
            Stops
          </h2>
          <ul>
            <li v-for="(item,index) in  Search.filters?.stops?.value" class="flex items-center gap-2 mb-2">
              <input :id="`step-${index}`" type="checkbox" @change="handelSearchResult" :value="item.value" v-model="payload.stops"  />
              <label :for="`step-${index}`" class="text-sm text-gray-500">{{item.name}}</label>
            </li>
          </ul>
        </div>
        <div class="py-5 border-b">
          <h2 class="text-2xl mb-5">
            Outbound
          </h2>
          <div id="airlines" class="px-3">
            <h2 class="text-lg">
              Departure Airport
            </h2>
            <ul>
              <li v-for="(item,index) in  Search.filters?.outbound_airports?.out_departure_airport?.value" class="flex items-center gap-2 mb-2">
                <input :id="`outbound-departure-${index}`" type="checkbox" @change="handelSearchResult" :value="item.code" v-model="payload.out_departure_airport"  />
                <label :for="`outbound-departure-${index}`" class="text-sm text-gray-500">{{item.name}} ({{item.number}})</label>
              </li>
            </ul>
          </div>
          <div id="airlines" class="px-3">
            <h2 class="text-lg mb-3">
              Arrival Airport
            </h2>
            <ul>
              <li v-for="(item,index) in  Search.filters?.outbound_airports?.out_arrival_airport?.value" class="flex items-center gap-2 mb-2">
                <input :id="`outbound-arrival-${index}`" type="checkbox" @change="handelSearchResult" :value="item.code" v-model="payload.out_arrival_airport"  />
                <label :for="`outbound-arrival-${index}`" class="text-sm text-gray-500">{{item.name}} ({{item.number}})</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="py-5 border-b">
          <h2 class="text-2xl mb-5">
            Inbound
          </h2>
          <div id="airlines" class="px-5 mb-5">
            <h2 class="text-lg mb-3">
              Departure Airport
            </h2>
            <ul>
              <li v-for="(item,index) in  Search.filters?.inbound_airports?.in_departure_airport?.value" class="flex items-center gap-2 mb-2">
                <input :id="`inbound-departure-${index}`" type="checkbox" @change="handelSearchResult" :value="item.code" v-model="payload.in_departure_airport"  />
                <label :for="`inbound-departure-${index}`" class="text-sm text-gray-500">{{item.name}} ({{item.number}})</label>
              </li>
            </ul>
          </div>
          <div id="airlines" class="px-5">
            <h2 class="text-lg mb-3">
              Arrival Airport
            </h2>
            <ul>
              <li v-for="(item,index) in  Search.filters?.inbound_airports?.in_arrival_airport?.value" class="flex items-center gap-2 mb-2">
                <input :id="`inbound-arrival-${index}`" type="checkbox" @change="handelSearchResult" :value="item.code" v-model="payload.in_arrival_airport"  />
                <label :for="`inbound-arrival-${index}`" class="text-sm text-gray-500">{{item.name}} ({{item.number}})</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="py-5 border-b">
          <h2 class="text-lg mb-3">
            Airlines
          </h2>
          <div class="arrival-list">
            <ul>
              <li v-for="(item,index) in  Search.filters?.airlines?.value" class="flex items-center gap-2 mb-2">
                <input :id="`airlines-${index}`" type="checkbox" @change="handelSearchResult" :value="item.code" v-model="payload.airlines"  />
                <label :for="`airlines-${index}`" class="text-sm text-gray-500 flex items-center gap-3">
                  <img :src="item.logo" class="w-5 h-5 rounded-full" alt="">
                  {{item.name}} ({{item.number}})
                </label>
              </li>
            </ul>
          </div>
        </div>
<!--        <div id="price" class="py-5 border-b">-->
<!--          <h2 class="text-lg mb-3">-->
<!--            Price Range-->
<!--          </h2>-->
<!--          <ul class="grid grid-cols-2 gap-5">-->
<!--            <li>-->
<!--              <n-input size="large" type="text" v-model:value="payload.price_range[0]" placeholder="Start Price" >-->
<!--                <template #suffix>-->
<!--                 <Icon class="text-xl" name="mdi:dollar"/>-->
<!--                </template>-->
<!--              </n-input>-->
<!--            </li>-->
<!--            <li>-->
<!--              <n-input size="large" v-model:value="payload.price_range[1]" type="text" placeholder="End Price" >-->
<!--                <template #suffix>-->
<!--                  <Icon class="text-xl" name="mdi:dollar"/>-->
<!--                </template>-->
<!--              </n-input>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
        <div id="departure" class="py-5 border-b">
          <h2 class="text-lg mb-3">
            Departure Time
          </h2>
          <div class="form-content grid grid-cols-2 gap-1">
            <div class="border p-2 px-2 rounded flex items-center justify-center flex-col text-center text-sm cursor-pointer"
                 :class="payload.departure_time.includes(item.value) ? 'bg-primary text-white':''"
                 v-for="(item) in  Search.filters?.departure_time?.value"
                 @click="setTime(item.value,'departure_time')"
            >
              <Icon class="text-2xl" v-if="item.name === 'Morning'" name="vaadin:morning" />
              <Icon class="text-2xl" v-if="item.name === 'Afternoon'" name="iconoir:sun-light" />
              <Icon class="text-2xl" v-if="item.name === 'Evening'" name="ion:cloudy-night-outline" />
              <Icon class="text-2xl" v-if="item.name === 'Night'" name="icon-park-outline:moon" />
              {{ item.name }}
            </div>
          </div>
        </div>
        <div id="arrival" class="py-5">
          <h2 class="text-lg mb-3">
            Arrival Time
          </h2>
          <div class="form-content grid grid-cols-2 gap-1">
            <div class="border p-2 px-2 rounded flex items-center justify-center flex-col text-center text-sm cursor-pointer"
                 :class="payload.arrival_time.includes(item.value) ? 'bg-primary text-white':''"
                 v-for="(item) in  Search.filters?.arrival_time?.value"
                 @click="setTime(item.value,'arrival_time')"
            >
              <Icon class="text-2xl" v-if="item.name === 'Morning'" name="vaadin:morning" />
              <Icon class="text-2xl" v-if="item.name === 'Afternoon'" name="iconoir:sun-light" />
              <Icon class="text-2xl" v-if="item.name === 'Evening'" name="ion:cloudy-night-outline" />
              <Icon class="text-2xl" v-if="item.name === 'Night'" name="icon-park-outline:moon" />
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </ContentCard>
  </div>
</template>
<script setup lang="ts">
  import {reshapeFilterKey} from "~/utils/helpers";
  import {useSearch} from "~/store/Flights/Search";
  const Search = useSearch()
  const payload = ref({
    isDirect:false,
    "price_range": [null , null],
    "commission_range": [],
    "stops": [],
    baggage:[],
    "airlines": [],
    "departure_time": [],
    "arrival_time": [],
    "flight_duration": [],
    "transiting_time": [],
    "departure_airport": [],
    "arrival_airport": [],
    "in_departure_airport": [],
    "in_arrival_airport": [],
    "out_departure_airport": [],
    "out_arrival_airport": []
  })


  const setTime = (code,key) =>{
    if(payload.value[key].includes(code)){
      payload.value[key].splice(payload.value[key].findIndex(el=>el===code) , 1)
    }else{
      payload.value[key].push(code)
    }
    handelSearchResult()
  }

  const handelSearchResult = () => {
    // is_loading.value = true
    Search.filterResult({
      filters:{
        "stops": reshapeFilterKey(payload.value.stops),
        "airlines": reshapeFilterKey(payload.value.airlines),
        "departure_time":reshapeFilterKey(payload.value.departure_time),
        "arrival_time": reshapeFilterKey(payload.value.arrival_time),
        "flight_duration": reshapeFilterKey(payload.value.flight_duration),
        "transiting_time": reshapeFilterKey(payload.value.transiting_time),
        "baggage": reshapeFilterKey(payload.value.baggage),
        "in_departure_airport": reshapeFilterKey(payload.value.in_departure_airport),
        "in_arrival_airport": reshapeFilterKey(payload.value.in_arrival_airport),
        "out_departure_airport": reshapeFilterKey(payload.value.out_departure_airport),
        "out_arrival_airport": reshapeFilterKey(payload.value.out_arrival_airport),
      }
    }).then((res)=>{})
    .catch(err=>{})
  }



</script>
<style>
.n-checkbox {
  @apply mb-3 mr-3
}

#filters input[type='checkbox'] {
  @apply rounded w-[16px] h-[16px]  appearance-none border border-gray-300 flex-none relative
}

#filters input[type='checkbox']:checked {
  @apply bg-primary
}

#filters input[type='checkbox']:checked::before {
  content: '\2714'; /* Unicode for checkmark */
  color: white;
  font-size: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

</style>
