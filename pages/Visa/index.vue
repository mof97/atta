<template>
  <div id="visa-home">
    <PageHeader label="Visa" img-path="../assets/images/headers/visa.jpg" />
    <section class="py-10">
      <div class="container  grid grid-cols-4">
        <VisaCard v-for="visa in Visa.visa.data" :data="visa" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {useVisa} from "~/store/Visa";
const is_loading = ref(true)
const Visa = useVisa()
onMounted(()=>{
  Visa.getAll().then(()=>{
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
})
</script>