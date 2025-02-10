<template>
  <div id="main-filters" class="py-10 bg-white rounded-xl w-9/12 p-3 mx-auto shadow relative z-10">
<!--    <MiltyCiteModal :active="activeMiltyCity" @update:active="activeMiltyCity = $event" />-->
    <n-form>
      <n-grid cols="24" x-gap="10" y-gap="15" class="" responsive="screen">
        <n-grid-item span="24" class="mb-3">
          <n-tabs v-model:value="payload.search_type" type="segment" animated>
            <n-tab-pane  v-for="flight in FlightTypes" :name="flight.value" :tab="flight.label"></n-tab-pane>
          </n-tabs>
        </n-grid-item>
        <n-grid-item span="11" >
          <Airport v-model="payload.from" label="From" :inital-value="payload.from" />
        </n-grid-item>
        <n-grid-item class="bg-white hidden md:block" span="2" id="from-container">
          <div class="flex items-end justify-center h-full  text-nive-light text-xl pb-2">
            <Icon class="flex-center flex-none text-xl px-1" name="heroicons:arrows-right-left-20-solid" />
          </div>
        </n-grid-item>
        <n-grid-item span="11" id="from-container">
          <Airport v-model="payload.to" label="To" :inital-value="payload.to" />
        </n-grid-item>
        <n-grid-item :span="payload.search_type === '0' ? '24':'11'" id="from-container">
          <n-form-item class="flex-col" :show-label="false" :show-feedback="false" label="Depurator">
            <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
              <icon class="text-xl" name="stash:data-date"/>
              Departure
            </label>
            <div>
              <n-date-picker
                  v-model:formatted-value="payload.date[0]"
                  type="date"
                  id="flight-date"
                  :default-value="payload.date[0]"
                  :is-date-disabled="disablePreviousDate"
                  formatted-value="yyyy-mm-dd"
                  :actions="null"
                  :close-on-select="true"
              />
            </div>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="2" v-if="payload.search_type !== '0'" class="bg-white hidden md:block" id="from-container">
          <div class="flex items-end  justify-center h-full text-nive-light text-xl pb-2">
            <Icon class="flex-center flex-none" name="heroicons:arrows-right-left-20-solid" />
          </div>
        </n-grid-item>
        <n-grid-item span="11" v-if="payload.search_type !== '0'" id="from-container">
          <n-form-item  :show-label="false" class="flex-col"  :show-feedback="false" label="Arrival">
            <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
              <icon class="text-xl" name="stash:data-date"/>
              Arrival
            </label>
            <div>
              <n-date-picker
                  v-model:formatted-value="payload.date[1]"
                  id="flight-date"
                  :default-value="payload.date[1]"
                  :is-date-disabled="disablePreviousDate"
                  formatted-value="yyyy-mm-dd"
                  :actions="null"
                  :close-on-select="true"
              />
            </div>
          </n-form-item>
        </n-grid-item>
        <n-grid-item  span="12" id="from-container">
          <n-form-item class="" :show-label="false" :show-feedback="false" label="Cabin">
            <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
              <icon class="text-xl" name="mingcute:seat-line"/>
              Cabin
            </label>
            <n-select :show-arrow="false" v-model:value="payload.cabin" default-value ='Economy' :options="CabinTypes" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12" id="from-container">
          <n-form-item :show-label="false" class="" :show-feedback="false" label="Airline">
            <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
              <icon class="text-xl" name="ic:round-airlines"/>
              Airline
            </label>
            <n-select default-value="All" remote  filterable :on-search="getAirlineData" :options="airlines" label-field="code" value-field="code" v-model:value="payload.allowed_airlines" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="8" v-for="passenger in PassengersTypes">
          <n-form-item   :show-label="false" :show-feedback="false" label="Adult">
            <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
              <icon class="text-xl" :name="passenger.icon"/>
              {{passenger.type}}
            </label>
            <n-input-number  class="text-center" :max="9" :min="passenger.min" :default-value="passenger.defaultValue" v-model:value="payload[passenger.value]" button-placement="both" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="24"  id="from-container">
          <button @click="handelSearch" class="bg-gray-light hover:bg-primary hover:text-white w-full  flex items-center gap-3 py-3 mt-3 rounded-full relative  justify-center duration-300">
              <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-2 duration-300 ">
                <Icon name="mynaui:search" />
              </span>
            Select
          </button>
        </n-grid-item>
      </n-grid>
    </n-form>
  </div>
</template>
<script setup lang="ts">
  import {FlightTypes , disablePreviousDate , activeSelect ,formatDate , CabinTypes , PassengersTypes , mainSearchPayload , debounce} from "~/utils/helpers";
  import MiltyCiteModal from "~/components/Flight/Search/MiltyCiteModal.vue";
  import Airport from "~/components/Flight/Search/Airport.vue";
  import {useToast} from "vue-toastification";
  import {useMapping} from "~/store/Flights/Mapping";
  import Button from "~/components/Button.vue";
  const Router = useRouter()
  const route = useRoute()
  const tab = ref(null)
  const Mapping = useMapping()
  const activeMiltyCity = ref(false)
  const airlines = ref([])
  const toast = useToast()
  const payload = ref( route.query.q ? {
    ...JSON.parse(route.query.q),
    date:[
      JSON.parse(route.query.q).legs[0].date,
      JSON.parse(route.query.q)?.legs[1]?.date || JSON.parse(route.query.q).legs[0].date,
    ],
  } : {
        from:null,
        to:null,
        date:[
          new Date().toISOString().slice(0, 10),
          new Date().toISOString().slice(0, 10),
        ],
        "search_type": "1",
        "allowed_airlines": "all",
        "disallowed_airlines": "none",
        "adt": 1,
        "chd": 0,
        "inf": 0,
        "class": "all",
        "cabin": "Economy",
        "trace_id": "Th39PaWZzdj",
        "mark_up": null
  })
  console.log('payload.value',payload.value)


  const getAirlineData = debounce((q)=>{
    if (q.length !== 0){
      Mapping.getAirline(q).then((res)=>{
        airlines.value = [
          ...res.data,
          {
            "name": "All",
            "code": "All",
          }
        ]
      })
    }

  },500)

  const handelSearch=()=>{
    console.log(payload.value)
    if(payload.value.from === null || payload.value.to === null){
      toast.error('Please select airport')
    }else{
      if(payload.value.allowed_airlines === ''){
        toast.error('Please select airline')
        return
      }
      const url = Router.resolve({
        path:'/flights/search',
        query:{q:mainSearchPayload(payload.value).q}
      }).href;
      window.open(url, '_self');
    }

  }
</script>
<style>
#main-filters .n-tabs .n-tabs-rail,
#main-filters .n-input,
#main-filters .n-base-selection .n-base-selection-label
{
  @apply bg-blue-light rounded-md
}
#main-filters .n-form-item .n-form-item-blank {
  @apply block
}
#main-filters .n-input .n-input__border, .n-input .n-input__state-border,
#main-filters .n-base-selection .n-base-selection__border, .n-base-selection .n-base-selection__state-border
{
  @apply border-0
}
</style>
