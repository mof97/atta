<template>
  <div id="flight-luggage">
    <PageHeader label="Flight Baggage" img-path="../assets/images/headers/baggage.jpeg" />
    <section class="pt-10" v-if="baggage.length > 0">
      <div class="container">
        <Card body-classes="" title="">
          <template #body>
            <n-tabs type="line" :default-value="0" animated>
              <n-tab-pane :tab="bag.label" :name="index" v-if="baggage.length" v-for="(bag,index) in baggage">
                <div class="grid grid-cols-4 gap-x-5 py-2" v-for="(passenger,index) in bag.passengers">
                  <h2 class="col-span-full text-xl mb-3">
                    {{ index + 1 }}. {{ passenger.passenger_type }}
                  </h2>
                  <div class="rounded-xl  bg-white " v-for="(value,bag_index) in bag.values" @click="passenger.value = value.baggage_id">
                    <div class="card-head rounded-t-xl bg-primary flex items-center justify-center py-5">
                <span class="w-12 h-12 rounded-full p-1 inline-block bg-gray-light">
                  <span class="w-full h-full text-black bg-white flex items-center justify-center rounded-full shadow">
                    <Icon class="text-3xl" name="mdi:bag-suitcase-outline"/>
                  </span>
                </span>
                    </div>
                    <div class="px-5 py-5">
                      <h2 class="text-xl mb-1 text-center ">
                        {{ value.description }}
                      </h2>
                      <p class="text-nive-light text-center">{{ value.price.total }} {{ value.price.currency }}</p>
                      <button  :class="passenger.value === value.baggage_id ? 'bg-primary text-white':'bg-gray-light'" class="w-full  flex items-center gap-3 py-2 mt-3 rounded-full relative  justify-center duration-300">
                        <span class="icon-container w-[31px] text-black text-xl flex items-center justify-center h-[31px] bg-white rounded-full absolute top-1/2 -translate-y-1/2 left-1 duration-300 ">
                          <Icon name="iconamoon:check-bold" />
                        </span>
                        Select
                      </button>
                    </div>

                  </div>
                </div>
              </n-tab-pane>
            </n-tabs>
          </template>
        </Card>
      </div>
    </section>
    <section class="pt-5" v-if="meals.length > 0">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <n-tabs type="line" :default-value="0" animated>
            <n-tab-pane :name="meal_index" :tab="meal.label" v-if="meals.length" v-for="(meal,meal_index) in meals">
              <div class="py-5 grid gap-5 grid-cols-3">
                <div v-for="(passenger,index) in meal.passengers">
                  <h2 class="mb-2">
                    {{ index + 1 }}. {{ passenger.passenger_type }} Meal
                  </h2>
                  <n-tree-select
                      :options="reshapeMaleObject(meal.values)"
                      children-field="meal_item_detail"
                      label-field="name"
                      filterable
                      v-model:value="passenger.value"
                      default-value="c3eb93a1-0c26-4d3c-96d8-c0d6dc00b1d7"
                      placeholder="Select Meals"
                      :default-expand-all="true"
                  />
                </div>
              </div>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
    <section class="pt-5">
      <div class="container">
        <div class="bg-gray-light p-5 rounded-lg">
          <n-tabs type="line" :default-value="0" animated>
            <n-tab-pane :name="index" :tab="route.label" v-for="(route,index) in seat">
              <n-tabs type="segment" :default-value="0" animated>
                <n-tab-pane :name="p_index" :tab="passenger.passenger_type"
                            v-for="(passenger,p_index) in route.passengers">
                  <div class="flex gap-3 items-stretch w-full py-5 overflow-scroll">
                    <!--                        {{route.values}}-->
                    <div class="seat  flex gap-1">
                      <ul class="flex items-center flex-col gap-y-2 flex-none">
                        <li class="w-10 h-10 font-semibold text-primary flex items-center justify-center text-xl"
                            v-for="column in route.values.column">
                              <span v-if="column !== 'Aisle'">
                                {{ column }}
                              </span>
                          <span v-else class=""></span>
                        </li>
                      </ul>
                      <ul class="flex items-center gap-2 flex-none justify-between flex-col text-center mb-3"
                          v-for="(column,index) in route.values.rows">
                        <li class="flex w-10 h-10 items-center gap-2 flex-none justify-center"
                            v-for="row in column.columns">
                              <span class="text-primary" v-if="row.is_walking_aisle">
                                {{ index + 1 }}
                              </span>
                          <div v-else class="cursor-pointer">
                            <SeatMap @click="selectAvaliableSeat(row , passenger)" :row="row" :status="passenger.value === row.seat_code ? 'selected':checkSelected(route,row.seat_code,row.availability)"></SeatMap>
                          </div>

                        </li>
                      </ul>
                    </div>
                  </div>
                </n-tab-pane>
              </n-tabs>
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
    <section class="py-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button @click="Router.go(-1)" type="default" class="px-10">
          Back
        </n-button>
        <n-button @click="handelPriceSend" type="primary" class="px-10">
          Next
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {useBaggage} from "~/store/Flights/Baggage";
import SeatMap from "~/components/Flight/Baggage/SeatMap.vue";
import {useFlights} from "~/store/Flights/Flights";
import {useToast} from 'vue-toastification'
const Flights = useFlights()
const is_loading = ref(false)
const availabilityChecker = ref(JSON.parse(sessionStorage.getItem('MT-available_fares')))
const passengersCount = JSON.parse(sessionStorage.getItem('MTN-Passenger'))
const baggage = ref([])
const meals = ref([])
const seat = ref([])
const Baggage = useBaggage()
const Route = useRoute()
const Router = useRouter()
const showMealsModal = ref(false)
const selectedPassenger = ref({})
const toast = useToast()
const selectMealPassenger = (passenger, meals) => {
  selectedPassenger.value = {
    passenger,
    meals
  }
  console.log(selectedPassenger.value)
  showMealsModal.value = true
}
const selectAvaliableSeat = (row,passenger)=>{
  console.log(passenger)
  if (row.availability === 'available') {
    passenger.value = row.seat_code
  }
}
const handelSelectMeal = (meal) => {
  selectedPassenger.value.passenger.value = meal
}
function checkSelected(route, code , v) {
  console.log(route, code , v)
  const allPassengers = route.passengers
  console.log(allPassengers)
  if (allPassengers.some(el=>el.value === code)){
    return 'selected';
  }else{
    return v
  }
}
const generatePassengerCount = (segments_ref) => {
  let list = []
  for (let i = 0; i < passengersCount.adt; i++) {
    list.push({
      passenger_type: "ADT",
      value: "",
      passenger_key: `A${i + 1}`,
      segments_ref: segments_ref || '',
      segment_ref: segments_ref || ''
    })
  }
  for (let i = 0; i < passengersCount.chd; i++) {
    list.push({
      passenger_type: "CHD",
      value: "",
      passenger_key: `C${i + 1 + passengersCount.adt}`,
      segments_ref: segments_ref || '',
      segment_ref: segments_ref || ''
    })
  }
  return list
}
const handelPriceSend=()=>{
  const seatData = seat.value.reduce((acc, item) => acc.concat(item.passengers), [])
  const bagData = baggage.value.reduce((acc, item) => acc.concat(item.passengers), [])
  const mealData = meals.value.reduce((acc, item) => acc.concat(item.passengers), [])

  if(seatData.some(el=> el.value === '')){
    toast.error("Select Seats")
    return
  } else if (bagData.some(el=> el.value === '')){
    toast.error("Select bags")
    return
  } else if (mealData.some(el=> el.value === '')){
    toast.error("Select Meals")
    return
  }else{
    is_loading.value= true
    Flights.flightPrice({
      trace_id:Route.query.trace_id,
      result_id:Route.query.result_id,
      brands_id:JSON.parse(Route.query.brands_id),
      seat_map:seatData,
      baggages:bagData,
      meals:mealData.map((el)=>{
        el.value = el.value.meal_id
        return el
      })
    }).then((res)=>{
      is_loading.value= false
      Router.push({
        path:"/flights/book",
        query:{
          trace_id:res.data.trace_id,
          result_id:res.data.result_id,
        }
      })
    }).catch(()=>{
      is_loading.value= false
    })
  }
}

const reshapeMaleObject = (meals)=>{
  console.log(meals)
  return meals.map((meal)=>{
    return {
      name: meal.category,
      disabled: true,
      meal_item_detail: meal.meal_item_detail.map(el => {
        return {
          name: `${el.name} (${el.available_meal} PC) (${el?.price?.total} ${el?.price?.currency})`,
          key: el.meal_id,
          selected:true
        }
      }),
    }
  })
}


onMounted(async () => {
  is_loading.value = true;
  console.log(availabilityChecker)
  if (availabilityChecker.value.available_baggage) {
    try {
      const baggageRes = await Baggage.getBaggage({
        trace_id: Route.query.trace_id,
        result_id: Route.query.result_id,
        brands_id: JSON.parse(Route.query.brands_id),
      });

      baggageRes.baggage.forEach((segments, index) => {
        baggage.value.push({
          label: segments.short_label,
          values: segments.baggage,
          passengers: generatePassengerCount(segments.segments_ref),
        });
      });
    } catch (error) {
      console.error("Error fetching baggage data:", error);
    }
  }
  if (availabilityChecker.value.available_meal) {
    try {
      const mealsRes = await Baggage.getMeals({
        trace_id: Route.query.trace_id,
        result_id: Route.query.result_id,
        brands_id: JSON.parse(Route.query.brands_id),
      });

      mealsRes.meals.forEach((segments, index) => {
        meals.value.push({
          label: segments.short_label,
          values: segments.meal_detail,
          passengers: generatePassengerCount(segments.segment_ref),
        });
      });
    } catch (error) {
      console.error("Error fetching meals data:", error);
    }
  }
  if (availabilityChecker.value.available_seat) {
    try {
      const seatMapRes = await Baggage.getSeatMap({
        trace_id: Route.query.trace_id,
        result_id: Route.query.result_id,
        brands_id: JSON.parse(Route.query.brands_id),
      });

      seatMapRes.seat_map.forEach((segments, index) => {
        seat.value.push({
          label: segments.short_label,
          values: {
            column: segments.columns_name,
            rows: segments.rows,
          },
          passengers: generatePassengerCount(segments.segment_ref),
        });
      });
    } catch (error) {
      console.error("Error fetching seat map data:", error);
    }
  }
  is_loading.value = false;

})
</script>