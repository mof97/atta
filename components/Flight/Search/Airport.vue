<template>
  <div class="airport" id="from-container">
    <n-form-item :class="label === 'From' ? 'rounded-l-lg' : ''" :show-label="false" :show-feedback="false" :label="label">
      <label for="" class="block flex items-center gap-1 text-gray-400 mb-1">
        <icon class="text-xl" :name="label === 'From' ? 'tdesign:flight-takeoff':'tdesign:flight-landing'"/>
        {{ label }}
      </label>
      <n-select v-model:value="payload" remote filterable  :loading="is_loading" virtual-scroll  menu-size="large" :consistent-menu-width="false"  :render-label="renderOptionLabel" :on-search="getAirportData" :show-arrow="false" label-field="name" value-field="code" :options="AirPortOptions" />
    </n-form-item>
  </div>
</template>
<script setup>
import {useSearch} from "~/store/Flights/Search.js";
import {debounce} from "~/utils/helpers.js";
const props = defineProps({
  label:String,
  initalValue:String,
  modelValue: {
    type: String,
    default: ''
  }
})
const is_loading = ref(false)
const Search = useSearch()
const Route = useRoute()
const payload = ref( props.initalValue || null)
const AirPortOptions = ref([])
const emit = defineEmits(['update:modelValue']);
const renderOptionLabel = (option)=>{
  return [h(
      'div',
      {},
      [option?.is_sub ? `- ${option?.name}` : `${option?.name}`]
  )]
}


const getAirportData = debounce(
    (type)=>{
      if(type !=='') {
        is_loading.value = true
        let data = []
        Search.getAirPorts(type).then((result) => {
          result.forEach((item) => {
            data.push({
              name: item.name,
              code: item.code,
              is_sub: false
            })
            if (item.items) {
              item.items.forEach(el => {
                data.push({
                  name: el.name,
                  code: el.code,
                  is_sub: true
                })
              })
            }
          })
          AirPortOptions.value = data
          is_loading.value = false
        }).catch(() => {
          is_loading.value = false
        })
      }
    },300)

watch(payload,(newValue)=>{
  emit('update:modelValue', newValue);
})

</script>
