<template>
  <div id="show-groups">
    <PageHeader :label="Groups?.item?.name" :extra-info="Groups?.item?.duration" :show-back-button="false" :img-path="Groups?.item?.image" />
    <section class="py-10">
      <div class="container grid grid-cols-12 gap-5">
        <div class="col-span-8">
          <section class="">
              <div class="title text-xl pb-3">
                Group Days
              </div>
              <Splide class="h-full" :options="SliderOption" aria-label="My Favorite Images">
                <SplideSlide class="h-full" v-for="day in Groups?.item.group_day">
                  <GroupsDay :day="day" />
                </SplideSlide>
              </Splide>
          </section>
          <section id="group-hotels" class="pt-5">
              <div class="title text-xl mb-3">
                Select Group Offer
              </div>
              <GroupsHotelCard class="mb-3" @click="goBook(offer.id)" v-for="offer in Groups?.item?.group_offer" :offer="offer"/>
          </section>
        </div>
        <div class="col-span-4">
          <div class="sticky top-1">
            <Card title="" class="mb-3">
              <template #body>
                <div class="p-5">
                  <h2 class="text-xl mb-5">
                    Group Included
                  </h2>
                  <Requierment :requirement="item" v-for="item in Groups?.item?.group_service_include" />
                </div>
              </template>
            </Card>
            <Card title="">
              <template #body>
                <div class="p-5">
                  <h2 class="text-xl mb-5">
                    Group Exclude
                  </h2>
                  <Requierment :requirement="item" v-for="item in Groups?.item?.group_service_exclude" />
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
import {useGroups} from "~/store/Groups";
const is_loading = ref(true)
const Groups = useGroups()
const Route = useRoute()
const Router = useRouter()

const SliderOption = computed(() => {
  return {
    rewind: true,
    arrows: false,
    perPage: 2,
    gap: 15,
    autoplay: true,
    breakpoints: {
      640: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      990: {
        perPage: 2,
      },
    }
  }
})

const goBook = (type_id)=>{
  Router.push({
    path:"/groups/book",
    query:{
      id:Route.params.id,
      type_id:type_id
    }
  })
}

onMounted(()=>{
  Groups.show(Route.params.id).then(()=>{
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
})
</script>