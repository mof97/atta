<template>
  <div id="groups-home">
    <PageHeader label="Groups" :show-back-button="false" img-path="../assets/images/headers/groups.jpg" />
    <section class="py-10">
      <div class="container grid grid-cols-4">
        <GroupsCard v-for="group in Groups?.groups?.data" :data="group" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import {useGroups} from "~/store/Groups";
const is_loading = ref(true)
const Groups = useGroups()
onMounted(()=>{
  Groups.getAll().then(()=>{
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
})
</script>