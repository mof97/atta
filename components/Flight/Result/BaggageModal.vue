<template>
  <div id="milty-cite-modal">
    <n-modal v-model:show="activeModal">
      <n-card
          style="width: 800px"
          title="Baggage Details"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <ul v-for="item in data">
          <li class="mb-5 bg-gray-50 p-3 rounded" v-for="baggage in item.baggage_allowance">
            <div class="mb-1 pb-3 border-b">
              <h2 class="text-lg font-semibold">
                {{item.passenger_type}} ({{baggage.from.name}} - {{baggage.to.name}})
              </h2>
            </div>
            <div class=" flex gap-2 pt-3">
              <div class="icon flex-none w-8 rounded h-8 flex-center text-white bg-primary ">
                <Icon class="text-2xl" name="mdi:bag-suitcase-outline" />
              </div>
              <div class="info">
                <h2 class="text-lg font-semibold mb-1 pt-1">
                  {{baggage.bag_details.amount}} {{baggage.bag_details.unit}}
                </h2>
                <p class="text-gray-500 text-sm">
                  <span class="text-gray-300" v-for="bag in baggage?.text_info">
                      {{ bag }}
                  </span>
                </p>
              </div>
            </div>

          </li>
        </ul>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  data: Object
})
const activeModal = ref(props.active);
const emit = defineEmits(['update:active']);
watch(() => props.active, (newValue) => {
  activeModal.value = newValue;
});
watch(activeModal, (newValue) => {
  if (newValue !== props.active) {
    emit('update:active', newValue); // Notify parent when modal state changes
  }
});

</script>
