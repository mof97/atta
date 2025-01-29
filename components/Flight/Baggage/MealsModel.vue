
  <template>
    <div id="milty-cite-modal">
      <n-modal v-model:show="activeModal">
        <n-card
            style="width: 1000px"
            title="Select Passanger Meals"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <div class="filters grid grid-cols-2 gap-3 mb-5">
            <n-input v-model:value="filterName" placeholder="Meal Name">
              <template #prefix>
                <Icon name="game-icons:meal" />
              </template>
            </n-input>
<!--            <n-select filterable :options="categories" />-->
          </div>
          <div class="grid grid-cols-4 gap-3">
            <div @click="selectMeal(item)" v-for="item in itemsList" class="p-3 border rounded cursor-pointer duration-500" :class="initialValue.meal_id === item.meal_id ? 'border-primary':''">
              <img
                  :src="item.image"
                  class="h-44 w-full w-full object-contain mx-auto"
              />
              <h2 class="text-center font-semibold">
                {{item.name}}
              </h2>
              <p class="text-third text-center">
                {{item.price.total}} {{item.price.currency}}
              </p>
            </div>
          </div>

        </n-card>
      </n-modal>
    </div>
  </template>
  <script setup>
    const props = defineProps({
      active: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: ()=> []
      },
      initialValue: {
        type: Object,
        default: ()=> {}
      },
    })
    const emit = defineEmits(['update:active' , 'selectMeal']);
    const filterName = ref('')
    const categories = ref([])
    const items = ref([])
    const itemsList = computed(()=>{
      if(filterName.value === ''){
        return items.value
      }else{
        return items.value.filter((item) => item.name.toLowerCase().includes(filterName.value.toLowerCase()))
      }
    })
    const activeModal = ref(props.active);


    const  selectMeal = (item)=>{
      emit('selectMeal', item);
      activeModal.value = false
    }

    watch(() => props.active, (newValue) => {
      activeModal.value = newValue;
    });
    watch(activeModal, (newValue) => {
      if (newValue !== props.active) {
        emit('update:active', newValue); // Notify parent when modal state changes
      }
    });
    watch(() => props.data, (newValue) => {
      items.value = []
      categories.value = newValue.map((category) => {
        return {
          label:category.category,
          value: category.category
        }
      }) || []

      newValue.forEach((category) => {
        category.meal_item_detail.forEach((el) => {
          items.value.push(el)
        })
      })

    },{
      deep: true,
    });

  </script>