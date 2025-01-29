<template>
  <div id="animated-svg">
    <div class="container flex items-center justify-center text-white gap-10">
      <br>
      <div class="div">
          <p>
            {{ searchData?.from }}
          </p>
          <h2 class="text-3xl my-1">
            {{ formatDate(searchData?.legs[0]?.date || 0 ,'DD MMM YYYY') }}
          </h2>
      </div>
      <div>
        <img class="mb-8" src="@/assets/imgs/shape.png" alt="">
      </div>
      <div>
        <p>
          {{ searchData?.to }}
        </p>
        <h2 class="text-3xl">
          <span v-if="searchData?.search_type === '0'">
            {{ formatDate(searchData?.legs[0]?.date || 0 , 'DD MMM YYYY') }}
          </span>
          <span v-else>
            {{ formatDate(searchData?.legs[searchData?.legs?.length - 1]?.date , 'DD MMM YYYY') }}
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {formatDate} from "~/utils/helpers";
  const route = useRoute()
  const searchData = ref(JSON.parse(route.query.q) || {
    from: null,
    to: null,
    legs:[]
  })

</script>
