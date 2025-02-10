<template>
  <div id="card" class="bg-gray-light p-5 rounded-lg">
    <slot name="title">
      <div v-if="title" class="card-title flex items-center justify-between">
          <h2 class="text-xl mb-3 flex items-center gap-3">
            <Icon v-if="icon" :class="iconClass" :name="icon"/>
            {{ title }}
          </h2>
<!--          <div class="w-6 h-6 bg-white cursor-pointer shadow text-xl flex items-center rounded-full justify-center">-->
<!--            <Icon  name="iconamoon:arrow-down-2-light"/>-->
<!--          </div>-->
      </div>
    </slot>
    <div :class="[bodyClasses , 'card-body rounded-lg']" >
      <slot name="body"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">

  defineProps({
    title: {
      type:String,
      default:()=>'title'
    },
    icon: {
      type:String,
      default:()=>'cil:flight-takeoff'
    },
    isDroppable:{
      type:Boolean,
      default:()=>true
    },
    bodyClasses:{
      type:String,
      default:()=>'bg-white'
    },
    iconClass:String
  })

</script>