<template>
  <div id="card-content" class="">
    <div v-if="title" class="card-content-title py-5 px-5 border-b flex items-center justify-between">
      <h2 class="text text-xl">
        {{title}}
      </h2>
      <div class="actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <section class="card-data px-5" v-if="$slots.content">
      <slot name="content"></slot>
    </section>
    <section class="card-content-footer py-5 px-5 border-t" v-if="$slots.footer">
      <slot name="footer"></slot>
    </section>
  </div>
</template>
<style>
#card-content {
  @apply rounded-[8px] border bg-white hover:border-primary duration-500
}
</style>
<script setup lang="ts">

defineProps({
  title:String
})

</script>
