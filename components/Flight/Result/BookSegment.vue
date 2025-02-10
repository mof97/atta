<template>
  <div id="segment" class="p-5 grid grid-cols-12 rounded-lg bg-gray-light relative">
    <div class="line w-10 h-10 bg-white absolute -top-5 right-48 rounded-full"></div>
    <div class="line w-10 h-10 bg-white absolute -bottom-5 right-48 rounded-full"></div>
    <div class="airline flex items-center gap-2 col-span-6">
      <div class="logo w-12 rounded-md bg-opacity-10 h-12 bg-third flex-center">
        <img class="w-10" :src="segment?.airline?.logo" alt="">
      </div>
      <div class="info">
        <h2 class="text-lg flex items-center gap-2">
          {{ segment?.airline?.name }}
          <ul class="flex items-center gap-1 text-[12px] text-nive-light">
            <li class="flex items-center gap-1">
              <Icon name="subway:airplane-mode" />
              {{segment?.flight_number}}
            </li>
            <li class="flex items-center text-sm gap-1">
              <icon name="material-symbols-light:hotel-class-rounded"/>
              {{segment.class.service}} - {{segment.class.booking}}
            </li>
          </ul>
        </h2>
        <div class="cites flex font-[500] items-center gap-2 text-nive-light text-[14px] mb-1">
          {{ segment?.from?.city_name}}
          <Icon class="text-xl" :name="`mynaui:arrow-left`" />
          {{ segment?.to.city_name}}
          <span class="text-[#68727D] font-[400] text-nive-light">
              {{ formatDate(segment?.departure?.formated_time, 'dddd, DD MMM') }}
            </span>
        </div>
      </div>
    </div>
    <div class="info flex items-center gap-5 px-5 col-span-6">
      <div class="from">
        <h2 class="text-xl">
          {{ formatDate(segment?.departure?.formated_time, 'HH:mm') }}
        </h2>
        <span class=" text-nive-light">
            {{ segment?.from?.code }}
          </span>
      </div>
      <div class="transit ">
        <div class="relative">
          <img src="@/assets/images/shapes/linepng.png" alt="">
          <ul class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pt-2 flex items-center gap-10">
            <li class="" v-for ="stop in segment?.transiting_time">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span class="p-1 bg-white">
                    <Icon class="text-3xl rotate-90 text-primary relative" name="ph:airplane" />
                  </span>
                </template>
                {{ formatDuration(stop.amount) }}
              </n-tooltip>
            </li>
          </ul>
        </div>
        <p class="text-[12px] pt-5 text-center text-third">
          {{ formatDuration(segment?.flying_time?.amount) }}
        </p>
      </div>
      <div class="to">
        <h2 class="text-xl">
          {{ formatDate(segment?.arrival?.formated_time, 'HH:mm') }}
        </h2>
        <span class=" text-nive-light">
            {{ segment?.to?.code }}
          </span>
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
})

</script>
