<template>
  <div id="show-visa">
    <PageHeader :label="Visa?.item?.name" :show-back-button="false" :extra-info="Visa.item.duration" :img-path="Visa.item.image || '../assets/images/headers/visa.jpg'" />
    <section class="py-10">
      <div class="container grid grid-cols-12 gap-10">
        <div class="col-span-8 grid grid-cols-3 gap-3">
          <VisaType v-for="type in Visa.item.type" :type="type" :bg="Visa.item.image || '../assets/images/headers/visa.jpg'" />
          <div class="flex items-center justify-center col-span-full">
            <n-button @click="Router.go(-1)" type="default" class="px-10">
              Back
            </n-button>
          </div>
        </div>
        <div class="col-span-4">
          <div class="sticky top-1">
            <Card title="">
              <template #body>
                <div class="p-5">
                  <h2 class="text-xl mb-5">
                    Visa Requirement
                  </h2>
                  <Requierment class="mb-1" v-for="requirement in Visa.item.requirement" :requirement="requirement" />
                </div>
              </template>
            </Card>
            <Card title="" class="mt-3 mb-3" v-if="Visa?.item?.cancellation_pol">
              <template #body>
                <div class="p-5">
                  <h2 class="text-xl mb-5">
                    Cancellation Policy
                  </h2>
                  <p v-html="Visa?.item?.cancellation_pol"></p>
                </div>
              </template>
            </Card>
            <Card title="" class="" v-if="Visa?.item?.change_pol">
              <template #body>
                <div class="p-5">
                  <h2 class="text-xl mb-5">
                    Change Policy
                  </h2>
                  <p v-html="Visa?.item?.change_pol"></p>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {useVisa} from "~/store/Visa";
const Route = useRoute()
const Visa = useVisa()
const is_loading = ref(true)
onMounted(()=>{
  Visa.show(Route.params.id).then(()=>{
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
})
</script>