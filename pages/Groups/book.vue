<template>
  <div id="group-book">
    <PageHeader :label="Groups?.item?.name" :extra-info="Groups?.item?.duration" :show-back-button="false" :img-path="Groups?.item?.image" />
    <section class="py-10">
      <div class="container grid grid-cols-12 gap-10">
        <div class="col-span-8">
          <n-form
              ref="formRef"
              :model="payload"
              :rules="BookGroupRules"
          >
          <Card title="" class="">
            <template #title>
              <div class="flex items-center justify-end mb-3">
                <n-button type="primary" @click="addPassenger">
                  <div class="flex items-center gap-3">
                    Add Passenger
                    <Icon class="text-xl" name="material-symbols:add-box"/>
                  </div>
                </n-button>
              </div>
            </template>
            <template #body>
              <div class="passengers divide-y p-5">
                <div class="passenger py-5" v-for="(passenger,index) in payload.passengers">
                  <div class="passenger-type flex items-center justify-between">
                    <h2 class="text-lg">
                      {{ index + 1 }}. Passenger
                    </h2>
                    <Icon v-if="index !== 0" @click="payload.passengers.splice(index,1)" class="text-2xl text-red-600 cursor-pointer" name="fluent:delete-16-regular"/>
                  </div>
                  <div class="passenger-form mt-5">
                    <n-grid cols="12" x-gap="20" y-gap="10">
                      <n-grid-item span="4">
                        <n-form-item class="mb-2" label="Passenger Age" :rule="BookGroupRules.passengers.type" :path="`passengers[${index}].type`"  >
                          <n-select  size="medium" v-model:value="passenger.type" :options="PriceOptions" />
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item class="mb-2" label="Title" :rule="BookGroupRules.passengers.title"
                                     :path="`passengers[${index}].title`">
                          <n-select size="medium" v-model:value="passenger.title" placeholder="Select Title"
                                    :options="PassengersTitle"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item class="mb-2" label="First Name" :rule="BookGroupRules.passengers.first_name"
                                     :path="`passengers[${index}].first_name`">
                          <n-input v-model:value="passenger.first_name" placeholder="Name"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item label="Last Name" :rule="BookGroupRules.passengers.last_name"
                                     :path="`passengers[${index}].first_name`">
                          <n-input v-model:value="passenger.last_name" placeholder="Name"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item label="Birth Date" :rule="BookGroupRules.passengers.birth_date"
                                     :path="`passengers[${index}].birth_date`">
                          <n-date-picker v-model:formatted-value="passenger.birth_date"
                                         value-format="yyyy-MM-dd" :keyboard="true" type="date" placeholder="Birth Date"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item class="mb-2" label="Nationality" :rule="BookGroupRules.passengers.nationality"
                                     :path="`passengers[${index}].nationality`">
                          <n-select filterable size="medium" v-model:value="passenger.nationality"
                                    :options="Mapping.NationalityOptions"/>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item label="Passport Number" :rule="BookGroupRules.passengers.document_id"
                                     :path="`passengers[${index}].document_id`">
                          <n-input placeholder="Passport" v-model:value="passenger.document_id"
                                   :show-button="false">
                            <template #suffix>
                              <Icon name="mdi:passport"/>
                            </template>
                          </n-input>
                        </n-form-item>
                      </n-grid-item>
                      <n-grid-item span="4">
                        <n-form-item label="Expiry Date" :rule="BookGroupRules.passengers.document_expire"
                                     :path="`passengers[${index}].document_expire`">
                          <n-date-picker type="date" v-model:formatted-value="passenger.document_expire"
                                         value-format="yyyy-MM-dd"  placeholder="Date"/>
                        </n-form-item>
                      </n-grid-item>
                    </n-grid>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <Card title="" class="py-5">
            <template #body>
              <div class="p-5">
                <n-grid cols="12" x-gap="20" y-gap="10" class="py-5">
                  <n-grid-item span="6">
                    <n-form-item class="mb-2" label="First Name" :rule="BookGroupRules.passengers.first_name" :path="`contact.first_name`">
                      <n-input v-model:value="payload.contact.first_name" size="small" placeholder="Name"/>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="6">
                    <n-form-item class="mb-2" label="Last Name" :rule="BookGroupRules.passengers.last_name" :path="`contact.last_name`">
                      <n-input v-model:value="payload.contact.last_name" size="small" placeholder="Name"/>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="6">
                    <n-form-item class="mb-2" label="Email" :rule="BookGroupRules.passengers.email" :path="`contact.email`">
                      <n-input v-model:value="payload.contact.email" size="small" placeholder=""/>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="6">
                    <n-form-item class="mb-2" label="Phone" :rule="BookGroupRules.passengers.phone" :path="`contact.phone`">
                      <n-input v-model:value="payload.contact.phone" size="small" placeholder=""/>
                    </n-form-item>
                  </n-grid-item>
                </n-grid>
              </div>
            </template>
          </Card>
            <Card title="">
              <template #body>
                <div class="p-5">
                  <h2 class=" flex items-center justify-between mb-5">
                  <span class="text-lg">
                    Upload Attachment
                  </span>
                    <span class="text-primary">
                    {{ attachmentsList.length }} File Uploaded
                  </span>
                  </h2>
                  <n-upload
                      :default-file-list="attachmentsList"
                      v-model:file-list="attachmentsList"
                      multiple
                  >
                    <n-upload-dragger>
                      <div style="margin-bottom: 12px">
                        <n-icon size="48" :depth="3">
                          <Icon class="text-3xl text-nive-light" name="tabler:cloud-upload"/>
                        </n-icon>
                      </div>
                      <n-text class="text-nive-light" style="font-size: 16px">
                        Click or drag a file to this area to upload
                      </n-text>
                    </n-upload-dragger>
                  </n-upload>
                </div>
              </template>
            </Card>
          </n-form>
        </div>
        <div class="col-span-4">
          <div class="sticky top-2">
            <Card title="" class="">
              <template #body>
                <div class="p-5">
                  <div class="py-5">
                    <div class="hotel-info mb-5 flex items-center justify-between">
                      <h2 class="text-lg font-bold">
                        {{ typeData?.hotel_offer?.name }}
                      </h2>
                      <n-rate size="small" readonly :default-value="typeData?.hotel_offer?.stars" />
                    </div>
                    <ul class="text-[14px] grid grid-cols-1 gap-2">
                      <li class="flex items-center gap-10">
                        <span>
                          Single
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                          <span>
                            {{typeData?.price?.adult_single}} {{typeData?.price?.currency}}
                          </span>
                      </li>
                      <li class="flex items-center gap-10">
                        <span>
                          Double
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                          <span>
                            {{typeData?.price?.adult}} {{typeData?.price?.currency}}
                          </span>
                      </li>
                      <li class="flex items-center gap-8">
                        <span>
                          Child
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                        <span>
                          {{typeData?.price?.child}} {{typeData?.price?.currency}}
                        </span>
                      </li>
                      <li class="flex items-center gap-8">
                        <span>
                          infant
                        </span>
                        <span class="w-20 h-[1px] bg-gray-200"></span>
                        <span>
                          {{typeData?.price?.infant}} {{typeData?.price?.currency}}
                        </span>
                      </li>
                    </ul>
                    <div class="pt-3">
                      <span class="text-nive-light">
                        Total Price
                      </span>
                      <h2 class="text-xl font-bold">{{ totalPrice }} {{Groups?.item?.price?.currency}}</h2>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
            <Card title="" class="my-5">
              <template #body>
                <div class="p-5 flex items-center justify-between">
                  <h2 class="font-bold text-lg">
                    Your balance
                  </h2>
                  <h3 class="text-xl font-bold">
                    {{ Profile?.profile?.wallet?.balance?.toLocaleString() }} {{ Profile?.profile?.wallet?.currency }}
                  </h3>
                </div>
              </template>
            </Card>
            <section class="pt-5">
              <div class="container flex items-center justify-center gap-2">
                <n-button type="default" class="px-10">
                  Back
                </n-button>
                <n-button @click="handleSubmit" type="primary" class="px-10">
                  Book
                </n-button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import {useGroups} from "~/store/Groups/index.js";
import {BookGroupRules} from "~/validation/group.book.validate.ts";
import {PassengersTitle} from "~/utils/helpers.js";
import {useMapping} from "~/store/Flights/Mapping.js";
import {useProfile} from "~/store/Profile.js";
import {useAttachments} from "~/store/Attachments.js";
const Attachments = useAttachments()
const Mapping = useMapping()
const Groups = useGroups()
const Route = useRoute()
const Profile = useProfile()
const formRef = ref(null)
const is_loading = ref(true)
const Router = useRouter()
const totalPrice = ref(0)
const typeData = ref({})
const attachmentsList = ref([])
const payload = ref({
  id: parseInt(Route.query.id),
  payment_type: "wallet",
  offer_id:parseInt(Route.query.type_id),
  contact:{
    phone:  "",
    email: "",
  },
  "passengers": [
    {
      "title": "",
      "first_name": "",
      "last_name": "",
      "birth_date": new Date().toISOString().slice(0,10),
      "document_expire": new Date().toISOString().slice(0,10),
      "document_id": "",
      document_type: "passport",
      "nationality": "IQ",
      "type": "",
    },
  ]
});

const PriceOptions = ref([
  {value: 'adult', label: 'Adult'},
  {value: 'adult_single', label: 'Adult Single'},
  {value: 'child', label: 'Child'},
  {value: 'infant', label: 'Infant'},
])

const addPassenger = () => {
  payload.value.passengers.push(
      {
        "title": "",
        "first_name": "",
        "last_name": "",
        "birth_date": new Date().toISOString().slice(0,10),
        "document_expire": new Date().toISOString().slice(0,10),
        "document_id": "",
        document_type: "passport",
        "nationality": "IQ",
        "type": "",
      }
  )
}

const handleSubmit = (values) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if(attachmentsList.value.length === 0){
        alert('Please upload attachment')
        return
      }
      Groups.book({
        ...payload.value,
        passengers:payload.value.passengers.map(el=>{
          return {
            ...el,
            phone:parseInt(`964${payload.value.contact.phone}`),
          }
        }),
      }).then(res => {
        upLoadFile(res.data.data.id,res.data.data.pnr)
      }).catch(()=>{
      })
    }
  })

};

const upLoadFile = (id,pnr)=>{
  let data = new FormData()
  data.append("pnr", pnr)
  data.append("id", id)
  data.append("book_type", 'visa')
  attachmentsList.value.map((el)=>{
    data.append('files' , el.file)
  })
  Attachments.upload(data).then(res=>{
  }).catch(()=>{
    console.log("error")
  })
}


watch(payload.value,(value)=>{
  let adultPrice = value.passengers.filter(passenger=> passenger.type === "adult").length * Groups.item?.price?.adult
  let adultSinglePrice = value.passengers.filter(passenger=> passenger.type === "adult_single").length * Groups.item?.price?.adult_single
  let childPrice = value.passengers.filter(passenger=> passenger.type === "child").length * Groups.item?.price?.child
  let infantPrice = value.passengers.filter(passenger=> passenger.type === "infant").length * Groups.item?.price?.infant
  totalPrice.value = adultPrice + adultSinglePrice + childPrice + infantPrice
})


onMounted(()=>{
  Profile.getProfile().then(res => {
    payload.value.contact.email = res.actor.email
    payload.value.contact.phone = res.actor.phone
    payload.value.contact.first_name = res.actor.full_name.split(' ')[0]
    payload.value.contact.last_name = res.actor.full_name.split(' ')[1]
  })
  Groups.show(Route.query.id).then(()=>{
    typeData.value = Groups?.item?.group_offer.find(el=> el.id == Route.query.type_id)
    is_loading.value = false
  }).catch(()=>{
    is_loading.value = false
  })
  Mapping.getNationality()
})


</script>
<style>
#group-book .n-tabs .n-tabs-rail,
#group-book .n-input,
#group-book .n-base-selection .n-base-selection-label
{
  @apply bg-blue-light rounded-md
}
#group-book .n-form-item .n-form-item-blank {
  @apply block
}
#group-book .n-input .n-input__border, .n-input .n-input__state-border,
#group-book .n-base-selection .n-base-selection__border, .n-base-selection .n-base-selection__state-border
{
  @apply border-0
}
</style>