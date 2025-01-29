<template>
  <div id="milty-cite-modal">
    <n-modal v-model:show="activeModal">
      <n-card
          style="width: 1000px"
          title="Milty Cite Search"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >

          <div class="grid grid-cols-12 mb-3">
            <ul class="flex items-center gap-5 grid-cols-8">
              <li class="flex" v-for="passenger in PassengersTypes">
                <span class="bg-primary flex-center w-16 rounded-l text-2xl text-white">
                  <Icon :name="passenger.icon"/>
                </span>
                <span>
                  <n-input-number  :max="9" :min="passenger.value" :default-value="passenger.defaultValue" v-model:value="payload[passenger.value]" button-placement="both" />
                </span>
              </li>
              <li class="flex">
                <n-select  :show-arrow="false" default-value ='Economy' v-model:value="payload.cabin" :options="CabinTypes" />
              </li>
            </ul>
            <div >
            </div>
          </div>
        <n-form>
          <div class="bg-gray-50 py-5 px-10 rounded">
              <n-grid cols="12" class="divide-x mb-3" v-for="(leg,index) in payload.legs" responsive="screen">
                <n-grid-item span="4">
                  <div class="relative">
                    <Icon v-if="index" @click="payload.legs.splice(index,1)" class="text-red-700 text-xl absolute top-1/2 cursor-pointer -left-7 -translate-y-1/2 z-10" name="pajamas:remove" />
                    <Airport label="From" v-model="leg.from" :inital-value="leg.from"  />
                  </div>
                </n-grid-item>
                <n-grid-item span="4">
                  <Airport label="To" v-model="leg.to" :inital-value="leg.to"  />
                </n-grid-item>
                <n-grid-item span="4"  id="from-container">
                  <n-form-item class="flex-col rounded-r-lg" @click="activeSelect(`flight-date-${index}`)" :show-feedback="false" label="Depurator">
                    <div>
                      <p class="text-xl w-full">
                        {{ formatDate(leg.date, 'Do MMM YYYY') }}
                      </p>
                      <n-date-picker
                          v-model:formatted-value="leg.date"
                          type="date"
                          :id="`flight-date-${index}`"
                          :is-date-disabled="disablePreviousDate"
                          formatted-value="yyyy-mm-dd"
                          :actions="null"
                          :close-on-select="true"
                      />
                    </div>
                  </n-form-item>
                </n-grid-item>
              </n-grid>
          </div>
          <div class="controller">
            <ul class="flex items-center justify-end gap-3 mt-3">
              <li>
                <n-button quaternary type="warning" size="large" @click="addLeg">
                  <span class="flex items-center gap-3">
                  Add Route <Icon class="flex-center text-xl" name="ph:plus-fill" />
                  </span>
                </n-button>
              </li>
              <li>
                <n-button type="primary" :loading="is_loading" @click="handelSearch" size="large">
                  <span class="flex items-center gap-3">
                  Search <Icon class="flex-center text-xl" name="hugeicons:search-02" />
                  </span>
                </n-button>
              </li>
            </ul>
          </div>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import {
  activeSelect,
  CabinTypes,
  disablePreviousDate,
  formatDate,
  mainSearchPayload,
  PassengersTypes
} from "~/utils/helpers.js";
import {useSearch} from "~/store/Flights/Search.js";
import Airport from "~/components/Flight/Search/Airport.vue";
const Search = useSearch()
const Router = useRouter()
const Route = useRoute()
const is_loading = ref(false)
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
})
const activeModal = ref(props.active);
const emit = defineEmits(['update:active']);
watch(() => props.active, (newValue) => {
  activeModal.value = newValue;
});
watch(activeModal, (newValue) => {
  if (newValue !== props.active) {
    emit('update:active', newValue); // Notify parent when modal state changes
  }
});
const payload = ref(
    Route.query.q ? {...JSON.parse(Route.query.q) , "search_type": "2",} : {
  "search_type": "2",
  "allowed_airlines": "all",
  "disallowed_airlines": "none",
  "adt": 1,
  "chd": 0,
  "inf": 0,
  "class": "all",
  "cabin": "Economy",
  "trace_id": "",
  "mark_up": null,
  legs:[
    {
      from:null,
      to:null,
      date:new Date().toISOString().slice(0, 10),
    }
  ]
})

const renderOptionLabel = (option)=>{
  return [h(
      'div',
      {},
      [option?.is_sub ? `- ${option?.name} (${option?.code})` : `${option?.name} (${option?.code})`]
  )]
}

const addLeg = ()=>{
  payload.value.legs.push({
    from:null,
    to:null,
    date:new Date().toISOString().slice(0, 10),
  })
}

const handelSearch=()=>{
  const url = Router.resolve({
    path:'/flights/search',
    query:{q:mainSearchPayload(payload.value).q}
  }).href;
  window.open(url, '_self');
}

</script>
