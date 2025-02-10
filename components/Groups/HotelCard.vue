<template>
  <div id="hotel-card" class="">
    <Card title="" >
      <template #body>
        <div class="p-5">
          <div class="hotel-card-name flex items-center justify-between">
            <div class="name">
              <div>
                <h2 class="text-lg font-bold">
                  {{ offer?.hotel_offer?.name }}
                </h2>
              </div>
              <n-rate size="small" readonly :default-value="offer?.hotel_offer?.stars" />
            </div>
            <ul class="flex items-center gap-3">
              <li>
                <div class="price text-[16px] text-primary flex items-center gap-1">
                  <Icon name="hugeicons:location-05"  />
                  {{offer?.hotel_offer?.city}}
                </div>
              </li>
              <li>
                <div class="price text-[16px] text-primary flex items-center gap-1">
                  <Icon name="proicons:branch"  />
                  {{offer?.description}}
                </div>
              </li>
            </ul>
          </div>
          <ul class="flex items-center gap-x-5 gap-y-2 mt-3 flex-wrap text-nive-light">
            <li class="flex items-center gap-1" >
              <Icon class="text-xl" name="akar-icons:door"/>
              Single Room : {{offer?.price?.adult_single}} {{offer?.price?.currency}}
            </li>
            <li class="flex items-center gap-1" >
              <Icon class="text-xl" name="akar-icons:door"/>
              Double : {{offer?.price?.adult}} {{offer?.price?.currency}}
            </li>
            <li class="flex items-center gap-1" >
              <Icon class="text-xl" name="akar-icons:door"/>
              Child : {{offer?.price?.child}} {{offer?.price?.currency}}
            </li>
            <li class="flex items-center gap-1" >
              <Icon class="text-xl" name="akar-icons:door"/>
              Infant : {{offer?.price?.infant}} {{offer?.price?.currency}}
            </li>
          </ul>
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">

defineProps({
  offer:Object
})

</script>
