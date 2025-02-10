<template>
  <div id="visa-requirement" class="bg-primary text-white rounded flex items-center gap-2 px-1 py-1">
    <span class ="svg-container" v-html="requirement.icon"></span>
    <h2 class="text-[16px]">
      {{ requirement.title || requirement.name }}
    </h2>
  </div>
</template>
<script setup>
defineProps({
  requirement:{
    type:Object,
  }
})
</script>
<style>
#visa-requirement svg{
  width: 20px;
  height: 20px;
  fill: #fff;
}
</style>
