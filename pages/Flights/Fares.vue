<template>
  <div id="flight-fares">
    <Loader v-if="is_loading" />
    <PageHeader label="Flight Fares" img-path="../assets/images/headers/fares.jpg" />
    <section class="pt-10">
      <div class="container">
        <Card class="mb-5" body-classes="" :title="fare.label" :icon="index%2===0?'tdesign:flight-takeoff':'tdesign:flight-landing'" v-for="(fare,index) in Flights.fares">
          <template #body>
            <div class="flex gap-2 overflow-x-auto">
              <FlightFaresCard class="w-80 flex-none" :fare="brand" v-for="brand in fare.brand_legs" @select-brand="handelSelectFare(brand,index)" :is-active="selectedBrand.some(item=> item.brand_id === brand.brand_id)" />
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
        <n-button @click="handelAddPrice" type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {useFlights} from "~/store/Flights/Flights";
import {useToast} from "vue-toastification";
const Route = useRoute()
const Router = useRouter()
const selectedBrand = ref([])
const Flights = useFlights()
const currency = ref('USD')
const available_baggage= ref([])
const available_meal=ref([])
const available_seat=ref([])
const is_loading = ref(true)
const toast = useToast()
const handelSelectFare = (brand,index)=>{
  selectedBrand.value[index] = brand
}


const handelTotalPrice = computed(()=>{
  let price = 0
  selectedBrand.value.map((item,index)=>{
    currency.value = item.price.currency
    price += item.price.total
  })
  return price
})
const handelAddPrice = ()=>{
  if(selectedBrand.value.length === 0){
    toast.error('Please select a brand')
    return
  }
  is_loading.value = true




  if(available_baggage.value.includes(true) || available_seat.value.includes(true) || available_meal.value.includes(true)) {
    sessionStorage.setItem('MT-available_fares', JSON.stringify({
      available_baggage: available_baggage.value.includes(true),
      available_meal: available_meal.value.includes(true),
      available_seat: available_seat.value.includes(true),
    }))
    Router.push({
      path:"/flights/luggage" ,
      query: {
        trace_id:Route.query.trace_id,
        result_id:Route.query.result_id,
        brands_id:JSON.stringify(selectedBrand.value.map(brand => brand.brand_id)),
      }
    })
  }else{
    Flights.flightPrice({
      trace_id:Route.query.trace_id,
      result_id:Route.query.result_id,
      brands_id:selectedBrand.value.map(brand => brand.brand_id),
    }).then((res)=>{
      Router.push({
        path:"/flights/book",
        query:{
          trace_id:res.data.trace_id,
          result_id:res.data.result_id,
        }
      })
    }).catch(()=>{
      is_loading.value = false
    })
  }
}


onMounted(()=>{
  Flights.getFares(Route.query).then(()=>{
    is_loading.value = false
    Flights.fares.forEach((item,index)=>{
      available_baggage.value[index] = item.brand_legs[0]?.ancillary_service?.available_baggage
      available_meal.value[index] = item.brand_legs[0]?.ancillary_service?.available_meal
      available_seat.value[index] = item.brand_legs[0]?.ancillary_service?.available_seat
    })

  }).catch(()=>{
    is_loading.value = false
  })
})

</script>