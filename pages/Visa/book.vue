<template>
  <div id="book-visa">
    <PageHeader :label="Visa?.item?.name" :show-back-button="false" :extra-info="Visa.item.duration" :img-path="Visa.item.image || '../assets/images/headers/visa.jpg'" />
    <section class="py-10">
      <div class="container grid grid-cols-12 gap-10">
        <div class="col-span-8">
          <n-form
              ref="formRef"
              :model="payload"
              :rules="BookVisaRules"
          >
          <Card title="">
            <template #title>
              <div class="flex items-center justify-end mb-3">
                <n-button type="primary" @click="addPassenger">
                  <div class="flex items-center gap-3">
                    Add Passenger
                    <span class="w-4 h-4 flex bg-white text-primary rounded-full items-center justify-center text-[12px] font-bold">
                      {{payload.passengers.length}}
                    </span>
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
                          <n-form-item class="mb-2" label="Passenger Age" :rule="BookVisaRules.passengers.type" :path="`passengers[${index}].type`"  >
                            <n-select  size="medium" v-model:value="passenger.type" label-field="type" :options="PassengersTypes" />
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item class="mb-2" label="Title" :rule="BookVisaRules.passengers.title"
                                       :path="`passengers[${index}].title`">
                            <n-select size="medium" v-model:value="passenger.title" placeholder="Select Title"
                                      :options="PassengersTitle"/>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item class="mb-2" label="First Name" :rule="BookVisaRules.passengers.first_name"
                                       :path="`passengers[${index}].first_name`">
                            <n-input v-model:value="passenger.first_name" placeholder="Name"/>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item label="Last Name" :rule="BookVisaRules.passengers.last_name"
                                       :path="`passengers[${index}].last_name`">
                            <n-input v-model:value="passenger.last_name" placeholder="Name"/>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item label="Birth Date" :rule="BookVisaRules.passengers.birth_date"
                                       :path="`passengers[${index}].birth_date`">
                            <n-date-picker v-model:formatted-value="passenger.birth_date"
                                           value-format="yyyy-MM-dd" :keyboard="true" type="date" placeholder="Birth Date"/>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item class="mb-2" label="Nationality" :rule="BookVisaRules.passengers.nationality"
                                       :path="`passengers[${index}].nationality`">
                            <n-select filterable size="medium" v-model:value="passenger.nationality"
                                      :options="Mapping.NationalityOptions"/>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item label="Passport Number" :rule="BookVisaRules.passengers.document_no"
                                       :path="`passengers[${index}].document_no`">
                            <n-input placeholder="Passport" v-model:value="passenger.document_no"
                                     :show-button="false">
                              <template #suffix>
                                <Icon name="mdi:passport"/>
                              </template>
                            </n-input>
                          </n-form-item>
                        </n-grid-item>
                        <n-grid-item span="4">
                          <n-form-item label="Expiry Date" :rule="BookVisaRules.passengers.document_expiry"
                                       :path="`passengers[${index}].document_expiry`">
                            <n-date-picker type="date" v-model:formatted-value="passenger.document_expiry"
                                           value-format="yyyy-MM-dd"  placeholder="Date"/>
                          </n-form-item>
                        </n-grid-item>
                      </n-grid>
                    </div>
                  </div>
                </div>

            </template>
          </Card>
          <Card title="" class="my-5">
            <template #body>
              <div class="p-5">
              <n-grid cols="12" x-gap="20" y-gap="10" class="py-5">
                <n-grid-item span="6">
                  <n-form-item class="mb-2" label="First Name" :rule="BookVisaRules.passengers.first_name" :path="`contact.first_name`">
                    <n-input v-model:value="payload.contact.first_name" size="small" placeholder="Name"/>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item span="6">
                  <n-form-item class="mb-2" label="Last Name" :rule="BookVisaRules.passengers.last_name" :path="`contact.last_name`">
                    <n-input v-model:value="payload.contact.last_name" size="small" placeholder="Name"/>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item span="6">
                  <n-form-item class="mb-2" label="Email" :rule="BookVisaRules.passengers.email" :path="`contact.email`">
                    <n-input v-model:value="payload.contact.email" size="small" placeholder=""/>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item span="6">
                  <n-form-item class="mb-2" label="Phone" :rule="BookVisaRules.passengers.phone" :path="`contact.phone`">
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
                  <h2 class="text-xl mb-5">
                    Dubai Fast Visa
                  </h2>
                  <ul class="text-[14px] grid grid-cols-1 gap-2">
                    <li class="flex items-center gap-10">
                        <span>
                          Adult
                        </span>
                      <span class="w-20 h-[1px] bg-gray-200"></span>
                      <span>
                            {{selectedVisaType?.adult_price?.toLocaleString()}} {{selectedVisaType.currency}}
                          </span>
                    </li>
                    <li class="flex items-center gap-8">
                    <span>
                      Child
                    </span>
                      <span class="w-20 h-[1px] bg-gray-200"></span>
                      <span>
                      {{selectedVisaType?.child_price?.toLocaleString()}} {{selectedVisaType.currency}}
                    </span>
                    </li>
                    <li class="flex items-center gap-8">
                    <span>
                      infant
                    </span>
                      <span class="w-20 h-[1px] bg-gray-200"></span>
                      <span>
                      {{selectedVisaType?.infant_price?.toLocaleString()}} {{selectedVisaType.currency}}
                    </span>
                    </li>
                  </ul>
                  <div class="pt-3">
                      <span class="text-nive-light">
                        Total Price
                      </span>
                    <h2 class="text-xl font-bold">{{ totalPrice }} {{ selectedVisaType.currency }}</h2>
                  </div>
                </div>
              </template>
            </Card>
            <Card title="" class="mt-5">
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
                <n-button @click="Router.go(-1)" type="default" class="px-10">
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
import {PassengersTypes , PassengersTitle} from "~/utils/helpers.js";
import {useVisa} from "~/store/Visa";
import {BookVisaRules} from "@/validation/visa.book.validate.ts";
import {useMapping} from "~/store/Flights/Mapping.js";
import {useProfile} from "~/store/Profile.js";
import {useAttachments} from "~/store/Attachments.js";
const formRef = ref(null)
const Route = useRoute()
const Visa = useVisa()
const Profile = useProfile()
const Attachments = useAttachments()
const selectedVisaType = ref({})
const totalPrice = ref(0)
const attachmentsList = ref([])
const Mapping = useMapping()

const payload = ref({
  contact:{
    phone:  "",
    email: "",
  },
  additionalInfo:{
    travel_info:"",
    acc:"",
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
      visa_type: Route.query.visa_type,
      "nationality": "IQ",
      "type": "",
    },
  ]
});


const addPassenger = () => {
  payload.value.passengers.push(
      {
        "title": "",
        "first_name": "",
        "last_name": "",
        "birth_date": new Date().toISOString().slice(0,10),
        "document_expire": new Date().toISOString().slice(0,10),
        "document_id": "",
        "nationality": "IQ",
        visa_type: Route.query.visa_type,
        document_type: "passport",
        "type": "",
      }
  )
}

const handleSubmit = (values) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if(attachmentsList.value.length === 0){
        // const toast = useToast()
        // toast.error('Please upload attachment')
        alert('Please upload attachment')
        return
      }
      // is_loading.value = true;
      Visa.book({
        id: parseInt(Route.query.id),
        payment_type: "wallet",
        // additional_info:reshapeAdditionalInfo(),
        passengers:payload.value.passengers.map(el=>{
          return {
            ...el,
            email:payload.value.contact.email,
            phone:parseInt(payload.value.contact.phone),
            "gender": el.title = 'Mr' ? 'M' : 'F',
          }
        }),
      }).then(res => {
        // const toast = useToast()
        // toast.success('Visa Booked Successfully')
        uploadfile(res.data.data.id,res.data.data.pnr)
      }).catch(()=>{
        // is_loading.value = false;
      })
    }
  })

};

const uploadfile = (id,pnr)=>{
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
  let adultPrice = value.passengers.filter(passenger=> passenger.type === "adt").length * selectedVisaType.value.adult_price || 0
  let childPrice = value.passengers.filter(passenger=> passenger.type === "chd").length * selectedVisaType.value.child_price || 0
  let infantPrice = value.passengers.filter(passenger=> passenger.type === "inf").length * selectedVisaType.value.infant_price || 0
  console.log(adultPrice)
  console.log(childPrice)
  console.log(infantPrice)
  totalPrice.value = adultPrice + childPrice + infantPrice
})

onMounted(()=>{
  Profile.getProfile().then(res => {
    payload.value.contact.email = res.actor.email
    payload.value.contact.phone = res.actor.phone
    payload.value.contact.first_name = res.actor.full_name.split(' ')[0]
    payload.value.contact.last_name = res.actor.full_name.split(' ')[1]
  })
  Visa.show(Route.query.id).then(()=>{
    selectedVisaType.value = Visa?.item?.type.find(el => el.type === Route.query.visa_type)
  })
  Mapping.getNationality()
})
</script>
<style>
#book-visa .n-tabs .n-tabs-rail,
#book-visa .n-input,
#book-visa .n-base-selection .n-base-selection-label
{
  @apply bg-blue-light rounded-md
}
#book-visa .n-form-item .n-form-item-blank {
  @apply block
}
#book-visa .n-input .n-input__border, .n-input .n-input__state-border,
#book-visa .n-base-selection .n-base-selection__border, .n-base-selection .n-base-selection__state-border
{
  @apply border-0
}
</style>
