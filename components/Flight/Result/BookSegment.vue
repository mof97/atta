<template>
  <div>
    <div class="cites flex font-[500] items-center gap-2 text-[16px] mb-1">
      {{ segment?.from?.city_name}}
      <Icon class="text-xl" :name="`mynaui:arrow-right`" />
      {{ segment?.to.city_name}}
      <span class="text-[#68727D] font-[400] ">
          {{ formatDate(segment?.departure?.formated_time, 'dddd, DD MMM') }}
        </span>
    </div>
  <div id="segment" class="flex items-center gap-5 divide-x">
    <div class="airline flex items-center gap-2">
      <div class="logo w-12 rounded-md bg-opacity-10 h-12 bg-third flex-center">
        <img class="w-8" :src="segment?.airline?.logo" alt="">
      </div>
      <div class="info">
        <h2 class="">
          {{ segment?.airline?.name }}
        </h2>
        <span class="text-[12px] text-third">{{ segment?.flight_number }}</span>
      </div>
    </div>
    <div class="info flex items-center gap-5 px-5">
      <div class="from">
        <h2 class="text-xl">
          {{ formatDate(segment?.departure?.formated_time, 'HH:mm') }}
        </h2>
        <span class=" text-third">
            {{ segment?.from?.code }}
          </span>
      </div>
      <div class="transit ">
        <div class="relative">
          <img src="@/assets/imgs/sheapes/linepng.png" alt="">
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
        <span class=" text-third">
            {{ segment?.to?.code }}
          </span>
      </div>
    </div>
    <div class="seat-info px-5">
      <ul class="grid grid-cols-1 gap-1 text-third">
        <li class="flex items-center gap-2">
          <Icon class="text-xl" name="carbon:branch" />
          {{ segment?.class?.service }} - {{ segment?.class?.booking }}
        </li>
<!--        <li class="flex items-center gap-2">-->
<!--          <Icon class="text-xl" name="fluent-emoji-high-contrast:seat" />-->
<!--          {{ segment?.class?.seats_available }} Available set-->
<!--        </li>-->
      </ul>
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
