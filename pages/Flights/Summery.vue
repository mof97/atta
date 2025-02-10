<template>
  <div id="flight-summery" class="pb-10">
    <Loader v-if="is_loading" />
    <PageHeader label="Book Summery" img-path="../assets/images/headers/book.jpg" />
    <section class="mt-5">
      <div class="container flex items-center justify-end">
        <div class="button-container">
          <button class="button" @click="handelIssueTicket">
            <n-tooltip trigger="hover">
              <template #trigger>
                <Icon class="text-2xl" name="proicons:airplane-takeoff" />
              </template>
              Issue Ticket
            </n-tooltip>
          </button>
          <button class="button" @click="Router.push('/flights')">
            <n-tooltip trigger="hover">
              <template #trigger>
                <Icon class="text-2xl" name="majesticons:home-line" />
              </template>
              Go Home
            </n-tooltip>
          </button>
          <button class="button">
            <n-popconfirm>
              <template #trigger>
                <n-tooltip trigger="hover">
                  <template #trigger>
                      <Icon class="text-2xl" name="material-symbols:cancel" />
                  </template>
                  Cancel Ticket
                </n-tooltip>
              </template>
              <template #action>
                <n-button type="error" size="small" @click="handelCancelTicket">
                  Confirm
                </n-button>
              </template>
              Are You Sure You Want To Cancel Your Booking ?
            </n-popconfirm>
          </button>
        </div>








<!--        <ul class="actions-list flex items-center justify-end gap-2">-->
<!--          <li>-->
<!--          </li>-->
<!--          <li>-->

<!--          </li>-->
<!--          <li>-->


<!--          </li>-->
<!--        </ul>-->
      </div>
    </section>
    <section class="py-5">
      <div class="container">
        <Card title="">
          <template #body>
            <div class="p-5">
              <h2 class="text-xl mb-5">
                Book Details
              </h2>
              <div class="info grid grid-cols-4 gap-5">
                <div class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded-xl text-primary">
                  <span class="font-bold">
                     Book Date
                  </span>
                    <h2 class="font-bold">
                      {{ formatDate(bookData?.book_date,'D/M/YYYY') }}
                    </h2>
                </div>
                <div class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded-xl text-primary">
                <span class="font-bold">
                  PNR
                </span>
                  <h2 class="font-bold">
                    {{ bookData.pnr }}
                  </h2>
                </div>
                <div class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded-xl text-primary">
                <span class="font-bold">
                  Vendor Locator
                </span>
                  <h2 class="font-bold">
                    <span class="" v-if="bookData?.external_booking_reference?.includes('|')">
                      {{bookData?.external_booking_reference?.split(' ')[5] || ''}}
                    </span>
                    <span v-else>
                      {{ bookData.external_booking_reference }}
                    </span>
                  </h2>
                </div>
                <div class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded-xl text-primary">
                  <span class="font-bold">
                    Time Limit
                  </span>
                  <h2 class="font-bold">
                    {{ bookData.latest_ticketing_time }}
                  </h2>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section class="mb-5">
      <div class="container">
        <Card title="Flights Info" icon="majesticons:airplane-flight-2-line">
          <template #body>
            <div class="p-5">
              <FlightResultBookSegment v-for="(segment,index) in bookData.segments" :segment="segment" class="flex-grow mb-3"/>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section>
      <div class="container">
        <Card title="Passengers Count" icon="solar:user-broken">
          <template #body>
            <div class="p-5">
              <ul class="grid grid-cols-12 gap-5 text-nive-light mb-2">
                <li class="col-span-2">
                  Passenger Type
                </li>
                <li class="col-span-2">
                  Gender
                </li>
                <li class="col-span-2">
                  Name
                </li>
                <li class="col-span-2">
                  Birth Date
                </li>
                <li class="col-span-2">
                  Passport Number
                </li>
              </ul>
              <ul>
                <li class="grid grid-cols-12 gap-5 mb-3" v-for="(passenger,index) in bookData?.passengers" :key="index">
                <span class="col-span-2">
                  {{ passenger.type }}
                </span>
                  <span class="col-span-2">
                  {{ passenger.title }}
                </span>
                  <span class="col-span-2">
                  {{ passenger.firstName }} {{ passenger.lastName }}
                </span>
                  <span class="col-span-2">
                  {{ formatDate(passenger?.dob,'D/M/YYYY') }}
                </span>
                  <span class="col-span-2">
                  {{ passenger?.documentNo }}
                </span>
                </li>
              </ul>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <section class="mt-5">
      <div class="container">
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
                  {{ bookData?.price?.base.toLocaleString() }} {{ Flights.flightInfo?.price?.currency }}
                </span>
                </li>
                <li class="flex items-center gap-8">
                <span>
                  Taxes and fees
                </span>
                  <span class="w-40 h-[1px] bg-gray-200"></span>
                  <span>
                  {{ bookData?.price?.taxes.toLocaleString() }} {{ Flights.flightInfo?.price?.currency }}
                </span>
                </li>
                <li class="flex items-center gap-8">
                <span>
                  Commissions
                </span>
                  <span class="w-40 h-[1px] bg-gray-200"></span>
                  <span>
                  {{bookData?.commission?.amount}} {{bookData?.commission?.currency}}
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
                <h2 class="text-xl font-bold">{{ bookData?.price?.total.toLocaleString() }} {{ Flights.flightInfo?.price?.currency }}</h2>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {formatDate} from "~/utils/helpers";
import {useFlights} from "~/store/Flights/Flights";
const is_loading = ref(false)
const flightData = ref(JSON.parse(sessionStorage.getItem('ATA-selected-flight-info')))
const Route = useRoute()
const Router = useRouter()
const Flights = useFlights()
const bookData = ref({
  segments:[]
})


const handelIssueTicket = ()=>{
  is_loading.value = true
  Flights.issueTicket(Route.query).then(()=>{
    Router.push({
      path: '/flights/print',
      query: Route.query
    });
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
}

const handelCancelTicket = ()=>{
  is_loading.value = true
  Flights.cancelBook(Route.query).then(()=>{
    is_loading.value = false
    Router.push('/flights')
  }).catch(()=>{
    is_loading.value = false
  })
}

onMounted(()=>{
  is_loading.value = true
  Flights.getBookData(Route.query).then((data) => {
    bookData.value = data
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
})

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

.button-container {
  display: flex;
  background-color: rgba(0, 73, 144);
  width: 250px;
  height: 40px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
  rgba(0, 73, 144, 0.5) 0px 5px 2px -3px;
  transition: all 0.5s;
}
.button-container:hover {
  width: 300px;
  transition: all 0.5s;
}

.button {
  outline: 0 !important;
  border: 0 !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-3px);
}

.icon {
  font-size: 20px;
}

</style>