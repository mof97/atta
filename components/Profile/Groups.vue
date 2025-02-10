<template>
  <div id="visa-history">
    <Loader v-if="is_loading" />
    <div class="attachment-modal">
      <n-modal v-model:show="showModal">
        <n-card
            style="width: 600px"
            title="Upload Attachment"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <n-upload
              multiple
              directory-dnd
              :max="100"
              v-model:file-list="attachmentPayload.files"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <Icon class="text-5xl" name="icon-park-outline:upload-two"/>
              </div>
              <n-text style="font-size: 16px">
                Click or drag a file to this area to upload
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                Strictly prohibit from uploading sensitive information. For example,
                your bank card PIN or your credit card expiry date.
              </n-p>
            </n-upload-dragger>
          </n-upload>
          <template #footer>
            <div class="flex items-center justify-end">
              <n-button type="primary" :loading="is_loading" @click="upload" :disabled="attachmentPayload.files.length ? false : true">
                Upload
              </n-button>
            </div>
          </template>
        </n-card>
      </n-modal>
    </div>
    <div class="passenger-modal">
      <n-modal v-model:show="passengerModal">
        <n-card
            style="width: 600px"
            title="Passengers"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <n-table class="w-full whitespace-nowrap" :bordered="false" :single-line="true">
            <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Name</th>
              <th>Book Ref</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(passenger,index) in passengers" :key="index">
              <td>{{ passenger.title }}</td>
              <td>{{ passenger.type }}</td>
              <td>{{ passenger.first_name }} {{ passenger.last_name }}</td>
              <td>{{ passenger?.book_ref }}</td>
            </tr>
            </tbody>
          </n-table>
        </n-card>
      </n-modal>
    </div>

    <div class="filters grid grid-cols-4 gap-5">
      <n-input v-model:value="filters.search" placeholder="Search" size="large"/>
      <n-date-picker :actions="null" size="large" placeholder="From Date" round value-format="yyyy-MM-dd"
                     v-model:formatted-value="filters.fromDate" type="date"/>
      <n-date-picker :actions="null" size="large" placeholder="From Date" round value-format="yyyy-MM-dd"
                     v-model:formatted-value="filters.toDate" type="date"/>
      <n-button type="primary" @click="exportToCSV">
        <Icon class="text-xl" name="material-symbols:download"/>
        Export
      </n-button>
    </div>
    <div class="py-3 overflow-x-auto">
      <n-table v-if="bookData?.data?.length" class="w-full whitespace-nowrap" :bordered="false" :single-line="false">
        <thead>
        <tr>
          <th>Name</th>
          <th>PNR</th>
          <th>Agent Name</th>
          <th>Price</th>
          <th>Payment Status</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in bookData.data" :key="book.id">
          <td>{{ book.visa }}</td>
          <td>{{ book.pnr }}</td>
          <td>{{ book?.agent_name }}</td>
          <td>{{ book?.amount }} {{ book?.currency }}</td>
          <td>
            <span v-if="book?.is_paid" class="text-green-300">
              Paid
            </span>
            <span v-else class="text-red-300">
              Paid
            </span>
          </td>
          <td>
            <ul class="flex">
              <li v-if="book?.status == 'book'"
                  class="px-10 border border-orange-900 bg-orange-100 rounded text-orange-900">
                {{ book?.status }}
              </li>
              <li v-else-if="book?.status == 'ticket'"
                  class="px-10 border border-green-900 bg-green-100 rounded text-green-900">
                {{ book?.status }}
              </li>
              <li v-else-if="book?.status == 'cancel'"
                  class="px-10 border border-red-900 bg-red-100 rounded text-red-900">
                {{ book?.status }}
              </li>
              <li v-else class="px-10 border border-gray-900 bg-gray-100 rounded text-gray-900">
                {{ book?.status }}
              </li>
            </ul>
          </td>
          <td>
            <ul class="flex items-center gap-3">
              <li>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button @click="showPassengers(book)" type="primary">
                      <Icon class="text-xl" name="mdi:eye-outline"/>
                    </n-button>
                  </template>
                  Show
                </n-tooltip>
              </li>
              <li v-if="!book?.attachment_files">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button @click="selectedBookData(book)" type="default">
                      <Icon class="text-xl" name="bytesize:upload"/>
                    </n-button>
                  </template>
                  Upload Attachment
                </n-tooltip>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </n-table>
      <n-empty v-else description="You can't find anything"></n-empty>
    </div>
    <div class="pagination flex justify-end">
      <n-pagination
          v-model:page="pagination.page"
          :page-count="Math.ceil((bookData.total / pagination.take))"
      />
    </div>
  </div>
</template>
<script setup>
import {useFlights} from "~/store/Flights/Flights.js";
import {useProfile} from "~/store/Profile.js";
import {useAttachments} from "~/store/Attachments.js";
const showModal = ref(false)
const passengerModal = ref(false)
const Router = useRouter();
const Attachment = useAttachments()
const passengers = ref([])
const bookData = ref({})
const bookDetails = ref({})
const is_loading = ref(false);
const Flights = useFlights()
const Profile = useProfile()
const attachmentPayload = ref({
  files: [],
  pnr: null,
  id: null
})
const filters = ref({
  fromDate: '2025-01-01',
  toDate: '2025-12-31',
  search: ""
})
const pagination = ref({
  page: 1,
  take: 10,
})

const exportToCSV = async () => {
  try {
    const response = await Profile.getFlightBook({
      ...filters.value,
      skip: 0,
      take: 100, // Adjust this number based on your backend limit
      export: 'true'
    }, {responseType: 'blob'}) // Important: set responseType to 'blob'

    const blob = new Blob([response.data], {type: 'text/csv'})
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `flights_bookings_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Export failed:', error)
    // Optionally show an error message to the user
  } finally {

  }
}

const handelPrint = (book) => {
  Router.push({path: '/flights/print', query: {pnr: book.pnr, last_name: book.passengers[0].lastName}})
}

const selectedBookData = (data) => {
  bookDetails.value = data
  attachmentPayload.value.pnr = data.pnr
  attachmentPayload.value.id = data.id
  showModal.value = true
}
const showPassengers = (data) => {
  passengers.value = data.passengers
  passengerModal.value = true
}

const getPageDate = (payload = {...filters.value, ...pagination.value}) => {
  is_loading.value = true
  Profile.getGroupsBook(payload).then(res => {
    bookData.value = res.data
    is_loading.value = false
  })
}




const upload = () => {
  is_loading.value = true
  let formData = new FormData()
  formData.append('pnr', attachmentPayload.value.pnr)
  formData.append('book_type', 'visa')
  formData.append('id', attachmentPayload.value.id)
  attachmentPayload.value.files.forEach((el) => {
    formData.append('files', el.file)
  })

  Attachment.upload(
      formData
  ).then(res => {
    is_loading.value = false
    showModal.value = false
    attachmentPayload.value = {
      files: [],
      pnr: null,
      book_type: null,
      id: null
    }
  }).catch(() => {
    is_loading.value = false
  })
}

watch(filters, (v) => {
  getPageDate({
    ...v,
    ...pagination.value,
    page: 1,
  })
  pagination.value.page = 1
}, {deep: true})


watch(pagination, (v) => {
  getPageDate({
    ...v,
    ...filters.value
  })
  console.log(v)
}, {deep: true})

onMounted(() => {
  getPageDate()
})
</script>
