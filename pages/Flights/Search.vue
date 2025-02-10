<template>
  <div id="search-page">
    <Loader v-if="is_loading" />
    <header>
      <div class="container ">
        <div class="content rounded-xl items-center relative grid grid-cols-2 py-20 px-10">
          <div class="overlay rounded-xl"></div>
          <div class="info relative z-20">
            <span class="text-primary">
              - ATA’ Al Khair Travel -
            </span>
            <h2 class="text-5xl mb-14 text-white  font-bold">Where You Get Trapped in the Beauty of the World and Unforgettable
              Happiness!</h2>
          </div>
          <div>
            <FlightSearchMain />
          </div>
        </div>
      </div>
    </header>
    <section id="result-section" class="py-10" v-if="Search?.result?.length">
      <div class="container grid grid-cols-12 gap-10">
        <div class="side-filter-container col-span-4">
          <FlightSearchFliters />
        </div>
        <div class="result-container col-span-8">
          <n-infinite-scroll :distance="50">
            <section id="flights-results" class=" grid grid-cols-1 gap-3">
              <FlightResultCard class="mb-3" v-for="flight in Search?.result" :flight="flight" />
            </section>
          </n-infinite-scroll>
        </div>
      </div>
    </section>
    <div class="container flex py-20 items-center justify-center" v-else>
      <n-empty description="No Flight Found !">
        <template #icon>
          <Icon name="hugeicons:airplane-mode-off" />
        </template>
      </n-empty>
    </div>
  </div>
</template>
<script setup>
import {useSearch} from "~/store/Flights/Search";
import {generateTraceId, mainSearchPayload} from "~/utils/helpers";
const Search = useSearch()
const Route = useRoute()
const Router = useRouter()
const is_loading = ref(true)

Search.getMainResult({
  ...JSON.parse(Route.query.q),
  trace_id:generateTraceId(),
}).then(result => {
  is_loading.value = false
  if(Search.result.length > 0){
    window.scrollTo({
      top: document.querySelector('#result-section').getBoundingClientRect().y,
      behavior: 'smooth',
    })
  }
}).catch(error => {
  is_loading.value = false
})

</script>