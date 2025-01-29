<template>
    <div>
    <div id="segment">
      <div class="airline flex items-center gap-2">
        <div class="logo w-12 rounded-md bg-opacity-10 h-12 bg-third flex-center">
          <img class="w-10" :src="segment?.segments[0]?.airline?.logo" alt="">
        </div>
        <div class="info">
          <h2 class="text-lg flex items-center gap-2">
            {{ segment?.segments[0]?.airline?.name }}
            <ul class="flex items-center gap-1 text-[12px] text-nive-light">
              <li class="flex items-center gap-1" v-for="(flightNo,index) in segment?.segments">
                <Icon name="subway:airplane-mode" />
                {{flightNo.flight_number}} <span v-if="index !== (segment?.segments.length - 1)">,</span>
              </li>
            </ul>
          </h2>
          <div class="cites flex font-[500] items-center gap-2 text-nive-light text-[14px] mb-1">
            {{ segment?.from?.city_name}}
            <Icon class="text-xl" :name="`mynaui:arrow-${type}`" />
            {{ segment?.to.city_name}}
            <span class="text-[#68727D] font-[400] text-nive-light">
              {{ formatDate(segment?.departure?.formated_time, 'dddd, DD MMM') }}
            </span>
          </div>
        </div>
      </div>
      <div class="info grid grid-cols-12 items-center gap-5 px-3">
        <div class="from col-span-2">
          <h2 class="text-xl">
            {{ formatDate(segment?.departure?.formated_time, 'HH:mm') }}
          </h2>
          <span class=" text-nive-light">
            {{ segment?.from?.code }}
          </span>
        </div>
        <div class="transit relative col-span-7">
          <div class="relative">
            <img src="@/assets/images/shapes/linepng.png" alt="">
            <ul class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  flex items-center gap-10">
              <li class="cursor-pointer " v-for ="stop in segment?.transiting_time">
                <n-tooltip trigger="hover">
                  <template #trigger>
                  <span class="w-6 h-6 shadow flex items-center justify-center flex-none bg-white rounded-full border border-primary">
                    <Icon class="text-[12px] rotate-90 text-primary relative" name="ph:airplane" />
                  </span>
                  </template>
                  {{ formatDuration(stop.amount) }}
                </n-tooltip>
              </li>
            </ul>
          </div>
          <p class="text-[12px] absolute top-4 left-1/2 transform -translate-x-1/2 text-center text-third">
            {{ formatDuration(segment?.flying_time?.amount) }}
          </p>
        </div>
        <div class="to col-span-2">
          <h2 class="text-xl">
            {{ formatDate(segment?.arrival?.formated_time, 'HH:mm') }}
          </h2>
          <span class=" text-nive-light">
            {{ segment?.to?.code }}
          </span>
        </div>
        <div class="seat-info col-span-1">
          <n-tooltip trigger="hover">
            <template #trigger>
              <Icon class="text-2xl text-nive-light cursor-pointer" name="akar-icons:info" />
            </template>
            <ul class="grid grid-cols-1 gap-1 text-third">
              <li class="flex items-center gap-2">
                <Icon class="text-xl" name="carbon:branch" />
                {{ segment?.segments[0]?.class?.service }} - {{ segment?.segments[0]?.class?.booking }}
              </li>
              <li class="flex items-center gap-2">
                <Icon class="text-xl" name="fluent-emoji-high-contrast:seat" />
                {{ segment?.segments[0]?.class?.seats_available }} Available set
              </li>
            </ul>
          </n-tooltip>
        </div>
      </div>
    </div>
    </div>
</template>
<script setup lang="ts">
  import {formatDate , formatDuration} from "~/utils/helpers";
  const props = defineProps({
    segment:{
      type:Object,
    },
    type:String
  })

</script>
