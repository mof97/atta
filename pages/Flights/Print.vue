<template>
  <div id="print-ticket" class="pb-10 pt-5 w-[80%] print:w-full mx-auto print:pb-0">
    <Loader v-if="is_loading" />
    <n-float-button  class="transform duration-500 print:hidden" @click="activePrint" :right="50" :width="50" :height="50" :bottom="30" type="primary" shape="circle">
      <Icon class="text-2xl" name="mingcute:print-fill" />
    </n-float-button>
    <n-float-button   class="transform  text-white duration-500 print:hidden" @click="Router.push('/flights')" :right="50" :width="50" :height="50" :bottom="100" shape="circle">
      <Icon class="text-2xl text-primary" name="lucide:home" />
    </n-float-button>
    <section class="print-modal">
      <n-modal v-model:show="printModal">
        <n-card
            style="width: 600px"
            title="Print Options"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <ul class="mb-3 flex justify-end items-center">
<!--            <li>-->
<!--              <n-switch  v-model:value="activePrice">-->
<!--                <template #checked>-->
<!--                  Print with price-->
<!--                </template>-->
<!--                <template #unchecked>-->
<!--                  Print without price-->
<!--                </template>-->
<!--              </n-switch>-->
<!--            </li>-->
            <li>
              <n-button type="warning" @click="handlePrint({price:activePrice})">
                <div class="flex items-center gap-1">
                  Ticket For All Passengers
                  <Icon class="text-2xl" name="mingcute:print-fill" />
                </div>
              </n-button>
            </li>
          </ul>
          <n-table :bordered="true" :single-line="false">
            <thead>
            <tr>
              <th>#</th>
              <th>Passenger Name</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(passenger,index) in bookData.passengers">
              <td>{{index + 1}}</td>
              <td>{{passenger.firstName}} {{passenger.lastName}}</td>
              <td>
                <ul>
                  <li>
                    <n-button type="warning" @click="handlePrint({price:activePrice, document_no: passenger.documentNo})">
                      <div class="flex items-center gap-1">
                        <Icon class="text-2xl" name="mingcute:print-fill" />
                      </div>
                    </n-button>
                  </li>
                </ul>
              </td>
            </tr>
            </tbody>
          </n-table>
        </n-card>
      </n-modal>
    </section>
    <header id="page-header-component" class="">
      <div class="container-fluid p-3">
        <div class="relative">
          <div class="overlay rounded-xl"></div>
          <img class="h-32 w-full object-cover rounded-xl" :src="'https://images.unsplash.com/photo-1476900543704-4312b78632f8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="">
          <div class="content py-5 px-10  z-10 absolute bottom-0 left-0 text-white">
          <span class="text-primary">
            - ATA’ Al Khair Travel -
          </span>
            <h2 class="text-4xl font-bold mb-2 flex mt-2 items-center gap-2">
              <span class="w-10 h-10 rounded shadow bg-white inline-block">
                <img  src="@/assets/images/logo/logo.png">
              </span>
              ATA’ Al Khair E-ticket
            </h2>
          </div>
        </div>
      </div>
    </header>
    <div class="flight-info p-3">
      <div class="">
        <ul class="grid grid-cols-3 gap-5 text-[14px]">
          <li class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-2 rounded text-primary ">
            <span class="text-third">
              PNR:
            </span>
            <span class="font-bold">
              {{bookData.pnr}}
            </span>
          </li>
          <li class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded text-primary ">
            <span class="text-third">
              Book Ref:
            </span>
            <span class="font-bold">
              {{bookData.booking_reference}}
            </span>
          </li>
          <li class="bg-primary flex items-center justify-between bg-opacity-10 hover:ring duration-300   p-3 rounded text-primary ">
            <span class="text-third">
              Book Date:
            </span>
            <span class="font-bold">
              {{bookData.book_date}}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="flight-info long-section p-3">
      <div class="container-fluid">
      <Card title="Flight Info">
        <template #body>
          <div class="p-5">
            <FlightResultBookSegment class="mb-3" :segment="segment" v-for="(segment,index) in bookData.segments" />
          </div>
        </template>
      </Card>
      </div>
    </div>
    <div class="passengers-info long-section p-3">
      <div class="container-fluid">
        <Card title="Passengers Info" icon="solar:user-bold">
          <template #body>
            <div class="p-5">
              <ul class="grid grid-cols-12 gap-5 text-nive-light mb-2">
                <li class="col-span-1">
                  #
                </li>
                <li class="col-span-1">
                  Type
                </li>
                <li class="col-span-7">
                  Name
                </li>
                <li class="col-span-3">
                  Ticket No.
                </li>
              </ul>
              <ul>
                <li class="grid grid-cols-12 gap-5 mb-3" v-for="(passenger,index) in bookData?.passengers" :key="index">
                  <span class="col-span-1">
                    {{index + 1}}
                  </span>
                    <span class="col-span-1">
                    {{passenger.type}}
                  </span>
                    <span class="col-span-7">
                    {{passenger.title}} {{passenger.firstName}} {{passenger.lastName}}
                  </span>
                    <span class="col-span-3">
                    {{passenger.ticketNo}}
                  </span>
                  </li>
              </ul>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="price-info p-3 long-section" v-if="Route.query.price !== 'false'">
      <div class="container-fluid  grid grid-cols-1 gap-5">
        <div>
          <h2 class="mb-3 text-lg flex items-center gap-2">
            <icon name="ph:money-wavy"/>
            Passengers Price
          </h2>
          <n-table v-if="bookData?.passengers.length" id="custom-table" :bordered="true" :single-line="false">
            <thead>
            <tr>
              <th>Type</th>
              <th>Base</th>
              <th>Taxes</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{bookData?.passengers?.filter(el=>el.type==='ADT').length}} ADT</td>
              <td>{{ calcSum('ADT', 'base') }}</td>
              <td>{{ calcSum('ADT', 'tax') }}</td>
              <td>{{ calcSum('ADT', 'price') }}</td>
            </tr>
            <tr v-if="bookData?.passengers?.filter(el=>el.type==='CHD').length">
              <td>{{bookData?.passengers?.filter(el=>el.type==='CHD').length}} CHD</td>
              <td>{{ calcSum('CHD', 'base') }}</td>
              <td>{{ calcSum('CHD', 'tax') }}</td>
              <td>{{ calcSum('CHD', 'price') }}</td>
            </tr>
            <tr v-if="bookData?.passengers?.filter(el=>el.type==='INF').length">
              <td>{{bookData?.passengers?.filter(el=>el.type==='INF').length}} INF</td>
              <td>{{ calcSum('INF', 'base') }}</td>
              <td>{{ calcSum('INF', 'tax') }}</td>
              <td>{{ calcSum('INF', 'price') }}</td>
            </tr>
            <tr v-if="bookData?.passengers.length > 1">
              <td class="text-xl font-semibold">{{bookData?.passengers?.length}} passengers</td>
              <td class="text-xl font-semibold">
                {{ calcTotalSum('base') }} {{ bookData?.price?.currency }}
              </td>
              <td class="text-xl font-semibold">
                {{ calcTotalSum('tax') }} {{ bookData?.price?.currency }}
              </td>
              <td class="text-xl font-semibold">
                {{ calcTotalSum('price') }} {{ bookData?.price?.currency }}
              </td>
            </tr>
            </tbody>
          </n-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {formatDate} from "~/utils/helpers.js";
import {useFlights} from "~/store/Flights/Flights.js";
import {useProfile} from "~/store/Profile.js";
const Flights = useFlights()
const Route = useRoute()
const Router = useRouter()
const is_loading = ref(true)
const printModal = ref(false)
const Profile = useProfile()
const activePrice = ref(true)
const bookData = ref({
  segments:[],
  passengers:[]
})


const calcSum = (type,key)=>{
  console.log(type , key)
  console.log()
  return bookData.value?.passengers.filter(el=>el.type === type)?.reduce((total, item) => total + item[key], 0).toLocaleString();
}

const calcTotalSum = (key)=>{
  console.log()
  return bookData.value?.passengers.reduce((total, item) => total + item[key], 0).toLocaleString();
}

const handlePrint = (q) => {
  const url = Router.resolve({
    path: '/flights/print',
    query: {
      ...q, // Assuming 'q' is defined somewhere in your setup
      is_print: true,
      ...Route.query,
    },
  }).href;
  console.log(url);
  window.open(url, '_blank');
}
const activePrint = ()=>{
  printModal.value = true
}
onMounted(()=>{
  Profile.getProfile()
  Flights.getBookData(Route.query).then((data) => {
    if (Route.query.document_no){
      bookData.value = {
        ...data,
        passengers:data.passengers.filter((p)=>p.documentNo === Route.query.document_no),
      }
    }else{
      bookData.value = data
    }
    is_loading.value = false

    if(Route.query.is_print){
      setTimeout(()=>{
        window.print()
      },500)
    }
  }).catch(err=>{
    is_loading.value = false
  })
})

definePageMeta({
  layout:'blank'
})

</script>
<style>
#custom-table th {
  @apply bg-primary text-white py-1
}
#custom-table   td {
  @apply bg-gray-50
}


@media  print {
  .long-section {
    page-break-inside: avoid;
  }
}
</style>
