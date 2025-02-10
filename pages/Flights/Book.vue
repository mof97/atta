<template>
  <div id="flight-book">
    <PageHeader label="Book Your Flight" img-path="../assets/images/headers/book.jpg" />
    <section class="py-10">
      <div class="container">
        <n-form
            ref="formRef"
            :model="payload"
            :rules="BookRules"
        >
          <n-grid cols="12" x-gap="10">
            <n-grid-item span="8" class="">
              <div class="segments-container">
                <BookSegment v-for="(segment,index) in Flights?.flightInfo?.segments" :segment="segment" class="flex-grow mb-3"/>
              </div>
              <Card title="">
                <template #body>
                  <div class="passengers divide-y p-5">
                    <div class="passenger py-5" v-for="(passenger,index) in payload.passengers">
                      <div class="passenger-type flex items-center justify-between">
                        <h2 class="text-lg">
                          {{ index + 1 }}. {{ passenger.type }}
                        </h2>
                      </div>
                      <div class="passenger-form mt-5">
                        <n-grid cols="12" x-gap="10" y-gap="5">
                          <n-grid-item span="4">
                            <n-form-item class="mb-2" :show-require-mark="false" label="Title" :rule="BookRules.passengers.title" :path="`passengers[${index}].title`">
                              <n-select size="medium" v-model:value="passenger.title" placeholder="Select Title"
                                        :options="PassengersTitle"/>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item class="mb-2" :show-require-mark="false" label="First Name" :rule="BookRules.passengers.first"
                                         :path="`passengers[${index}].first`">
                              <n-input v-model:value="passenger.first" placeholder="Name"/>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item label="Last Name" :show-require-mark="false" :rule="BookRules.passengers.last"
                                         :path="`passengers[${index}].last`">
                              <n-input v-model:value="passenger.last" placeholder="Name"/>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item label="Birth Date" :show-require-mark="false" :rule="BookRules.passengers.dob"
                                         :path="`passengers[${index}].dob`">
                              <n-date-picker class="w-full" v-model:formatted-value="passenger.dob"
                                             value-format="yyyy-MM-dd" :keyboard="true" type="date" placeholder="Birth Date"/>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item class="mb-2" :show-require-mark="false" label="Nationality" :rule="BookRules.passengers.nationality"
                                         :path="`passengers[${index}].nationality`">
                              <n-select filterable size="medium" v-model:value="passenger.nationality"
                                        :options="Mapping.NationalityOptions"/>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item label="Passport Number" :show-require-mark="false" :rule="BookRules.passengers.document_no"
                                         :path="`passengers[${index}].document_no`">
                              <n-input placeholder="Passport" v-model:value="passenger.document_no"
                                       :show-button="false">
                                <template #suffix>
                                  <Icon name="mdi:passport"/>
                                </template>
                              </n-input>
                            </n-form-item>
                          </n-grid-item>
                          <n-grid-item span="4">
                            <n-form-item label="Expiry Date" :show-require-mark="false" :rule="BookRules.passengers.document_expiry"
                                         :path="`passengers[${index}].document_expiry`">
                              <n-date-picker type="date" class="w-full" v-model:formatted-value="passenger.document_expiry"
                                             value-format="yyyy-MM-dd"  placeholder="Date"/>
                            </n-form-item>
                          </n-grid-item>
                        </n-grid>
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
              <Card title="" class="mt-5">
                <template #body>
                  <div class="p-5">
                    <n-grid cols="12" x-gap="20" y-gap="10" class="py-5">
                      <n-grid-item span="6">
                        <n-form-item class="mb-2"  label="First Name" :rule="BookRules.passengers.first_name" :path="`contact.first_name`">
                          <n-input v-model:value="payload.contact.first_name" size="small" placeholder="Name"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="6">
                        <n-form-item class="mb-2" label="Last Name" :rule="BookRules.passengers.last_name" :path="`contact.last_name`">
                          <n-input v-model:value="payload.contact.last_name" size="small" placeholder="Name"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="6">
                        <n-form-item class="mb-2" label="Email" :rule="BookRules.passengers.email" :path="`contact.email`">
                          <n-input v-model:value="payload.contact.email" size="small" placeholder=""/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="6">
                        <n-form-item class="mb-2" label="Phone" :rule="BookRules.passengers.phone" :path="`contact.phone`">
                          <n-input v-model:value="payload.contact.phone" size="small" placeholder=""/>
                        </n-form-item>
                      </n-grid-item>
                    </n-grid>
                  </div>
                </template>
              </Card>
            </n-grid-item>
            <n-grid-item class="relative" span="4">
              <div class="sticky top-1">
              <Card title="" class="">
                <template #body>
                  <div class="p-5">
                    <h2 class="text-lg mb-5">Price Details</h2>
                    <ul class="text-[14px] grid grid-cols-1 gap-2">
                      <li class="flex items-center gap-10">
                        <span>
                          Base Fare
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                        <span>
                          {{Flights.flightInfo?.price?.base}} {{Flights.flightInfo?.price?.currency}}
                        </span>
                      </li>
                      <li class="flex items-center gap-8">
                        <span>
                          Taxes and fees
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                        <span>
                          {{Flights.flightInfo?.price?.taxes}} {{Flights.flightInfo?.price?.currency}}
                        </span>
                      </li>
                      <li class="flex items-center gap-8">
                        <span>
                          Commission
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                        <h2>
                          <span class="text-blue-500" v-if = "Flights?.flightInfo?.commission.type === 'Excluded'">
                            {{ Flights?.flightInfo?.commission?.amount }} {{ Flights?.flightInfo?.commission?.currency }}
                          </span>
                          <span class="text-green-500" v-if = "Flights?.flightInfo?.commission.type === 'Included'">
                            {{ Flights?.flightInfo?.commission?.amount }} {{ Flights?.flightInfo?.commission?.currency }}
                          </span>
                          <span class="" v-if = "Flights?.flightInfo?.commission.type === ''">
                            {{ Flights?.flightInfo?.commission?.amount }} {{ Flights?.flightInfo?.commission?.currency }}
                          </span>
                        </h2>
                      </li>
                    </ul>
                    <div class="pt-3">
                      <span class="text-nive-light">
                        Total Price
                      </span>
                      <h2 class="text-xl font-bold">{{Flights.flightInfo?.price?.total}} {{Flights.flightInfo?.price?.currency}}</h2>
                    </div>
                  </div>
                </template>
              </Card>
              <Card title="" class="mt-5">
                <template #body>
                  <div class="p-5 flex items-center justify-between">
                    <h2 class="font-bold text-lg">
                      Your balance
                    </h2>
                    <h3 class="text-xl font-bold">
                      {{ Profile?.profile?.wallet?.balance?.toLocaleString() }} {{ Profile?.profile?.wallet?.currency }}
                    </h3>
                  </div>
                </template>
              </Card>
              <section class="pt-5">
                <div class="container flex items-center justify-center gap-2">
                  <n-button @click="Router.go(-1)" type="default" class="px-10">
                    Back
                  </n-button>
                  <n-button @click="handelBookFlight" type="primary" class="px-10">
                    Back
                  </n-button>
                </div>
              </section>
              </div>
            </n-grid-item>
          </n-grid>
        </n-form>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import BookSegment from "~/components/Flight/Result/BookSegment.vue";
import {PassengersTitle} from "~/utils/helpers";
import {BookRules} from "~/validation/flight.book.validate";
import {useFlights} from "~/store/Flights/Flights";
import {useMapping} from "~/store/Flights/Mapping";
import {useProfile} from "~/store/Profile";
const Profile = useProfile()
const Router = useRouter()
const Route = useRoute()
const Mapping = useMapping()
const formRef = ref(null)
const Flights = useFlights()
const rulesData = ref({})
const is_loading = ref(false)
const payload = ref(
    {
      "trace_id": Route.query.trace_id,
      "result_id": Route.query.result_id,
      "payment_type": "wallet",
      "type": "book",
      additionalInfo: {
        travel_info: "",
        acc: "",
      },
      contact: {
        "email": "",
        "phone": "",
        "first_name": "",
        "last_name": ""
      },
      passengers: []
    }
)

const handelBookFlight = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      is_loading.value = true
      Flights.bookFlight({
            ...payload.value,
            // additional_info:reshapeAdditionalInfo(),
            passengers: payload.value.passengers.map(el => {
              return {
                ...el,
                "gender": el.title === 'Mr' ? 'M' : 'F',
              }
            }),
          },
      ).then(res=>{
        is_loading.value = true
        Router.push({
          path:'/flights/summery',
          query:{
            pnr:res.pnr,
            last_name:res?.passengers[0]?.lastName
          },
        })
      }).catch(error => {
        is_loading.value = false
      })
    }
  })
}

const getFareRuleData = ()=>{
  Flights.getFlightRule({
    result_id:Route.query.result_id,
    trace_id:Route.query.trace_id,
  }).then((res) => {
    rulesData.value = res.data
  })
}

const addPassenger = (type) => {
  payload.value.passengers.push(
      {
        "title": "",
        "first": "",
        "middle": "",
        "last": "",
        "dob": null,
        "type": type,
        "gender": "",
        "nationality": "IQ",
        "document_type": "passport",
        "document_no": "",
        "document_expiry": null,
      }
  )
}

onMounted(() => {
  Profile.getProfile().then(res => {
    payload.value.contact.email = res.actor.email
    payload.value.contact.phone = res.actor.phone
    payload.value.contact.first_name = res.actor.full_name.split(' ')[0]
    payload.value.contact.last_name = res.actor.full_name.split(' ')[1]
  })

  let passengersCount = JSON.parse(sessionStorage.getItem("ATA-Passenger"))
  for (let i = 0; i < passengersCount.adt; i++) {
    addPassenger('ADT')
  }
  for (let i = 0; i < passengersCount.chd; i++) {
    addPassenger('CHD')
  }
  for (let i = 0; i < passengersCount.inf; i++) {
    addPassenger('INF')
  }
  Mapping.getNationality()
})

</script>
<style>
#flight-book .n-tabs .n-tabs-rail,
#flight-book .n-input,
#flight-book .n-base-selection .n-base-selection-label
{
  @apply bg-blue-light rounded-md
}
#flight-book .n-form-item .n-form-item-blank {
  @apply block
}
#flight-book .n-input .n-input__border, .n-input .n-input__state-border,
#flight-book .n-base-selection .n-base-selection__border, .n-base-selection .n-base-selection__state-border
{
  @apply border-0
}
</style>