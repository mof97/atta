<template>
  <div id="fights-history">
    <Loader v-if="is_loading" />
    <section class="showCard">
      <n-modal v-model:show="showBookDetails">
        <n-card
            style="width: 900px"
            title="Book Details"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <div class="main-info">

            <ul class="flex items-center justify-between">
              <li class="flex items-center gap-3">
                <div class="icon text-2xl rounded-full w-12 h-12 bg-primary text-white flex-center">
                  <Icon name="tabler:hash"/>
                </div>
                <div class="info">
                  <h2 class="text-sm text-third">
                    PNR
                  </h2>
                  <p class="text-xl font-bold">
                    {{ bookDetails.pnr }}
                  </p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <div class="icon text-2xl rounded-full w-12 h-12 bg-primary text-white flex-center">
                  <Icon name="lets-icons:date-fill"/>
                </div>
                <div class="info">
                  <h2 class="text-sm text-third">
                    Book Date
                  </h2>
                  <p class="text-xl font-bold">
                    {{ bookDetails.book_date }}
                  </p>
                </div>
              </li>
              <li class="flex items-center gap-3">
                <div class="icon text-2xl rounded-full w-12 h-12 bg-primary text-white flex-center">
                  <Icon name="pajamas:status"/>
                </div>
                <div class="info">
                  <h2 class="text-sm text-third">
                    Status
                  </h2>
                  <p class="text-xl font-bold capitalize">
                    {{ bookDetails.status }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="segments py-5 my-5 border-t border-b">
            <FlightResultBookSegment class="mb-1" v-for="segment in bookDetails.segments" :key="segment.id"
                                     :segment="segment"/>
          </div>
          <div class="passengers ">
            <h2 class="text-xl pb-5 border-b mb-5">
              Passengers Info
            </h2>
            <ul class="grid grid-cols-12 gap-5 text-third mb-2">
              <li class="col-span-2">
                Passenger Type
              </li>
              <li class="col-span-2">
                Gender
              </li>
              <li class="col-span-4">
                Name
              </li>
              <li class="col-span-2">
                Birth Date
              </li>
              <li class="col-span-2">
                Passport Number
              </li>
            </ul>
            <ul>
              <li class="grid grid-cols-12 gap-5 mb-3" v-for="(passenger,index) in bookDetails?.passengers" :key="index">
                  <span class="col-span-2">
                    {{ passenger.type }}
                  </span>
                  <span class="col-span-2">
                    {{ passenger.title }}
                  </span>
                <span class="col-span-4">
                  {{ passenger.firstName }} {{ passenger.lastName }}
                </span>
                <span class="col-span-2">
                  {{ formatDate(passenger?.dob, 'D/M/YYYY') }}
                </span>
                <span class="col-span-2">
                  {{ passenger?.documentNo }}
                </span>
              </li>

            </ul>
          </div>
          <div class="price">
            <h2 class="text-xl py-5 border-b border-t my-5">
              Price Details
            </h2>
            <div class="total-prices grid grid-cols-4">
              <div>
                <span class="text-third">
                  Base Fare
                </span>
                <h2 class="text-xl">
                  {{ bookDetails?.price?.base.toLocaleString() }} {{ bookDetails?.price.currency }}
                </h2>
              </div>
              <div>
                <span class="text-third">
                  Taxes
                </span>
                <h2 class="text-xl">
                  {{ bookDetails?.price?.taxes.toLocaleString() }} {{ bookDetails?.price.currency }}
                </h2>
              </div>
              <div>
                <span class="text-third">
                  Commissions
                </span>
                <h2 class="text-xl">
                  -
                </h2>
              </div>
              <div>
                <span class="text-third">
                  Total
                </span>
                <h2 class="text-xl">
                  {{ bookDetails?.price?.total.toLocaleString() }} {{ bookDetails?.price.currency }}
                </h2>
              </div>
            </div>
          </div>

        </n-card>
      </n-modal>
    </section>
    <Card title="">
      <template #body>
        <div class="p-5">
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
            <n-table v-if="bookData?.data?.length" class="w-full whitespace-nowrap" :bordered="false" :single-line="true">
              <thead>
              <tr>
                <th>Book Date</th>
                <th>PNR</th>
                <th>Price</th>
                <th>From</th>
                <th>To</th>
                <th>Payment Status</th>
                <th>Status</th>
                <th>Time Limit</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="book in bookData.data" :key="book.id">
                <td>{{ book.book_date }}</td>
                <td>{{ book.pnr }}</td>
                <td>{{ book?.price?.total }} {{ book?.price?.currency }}</td>
                <td>{{ book?.segments[0]?.from?.code }}</td>
                <td>{{ book?.segments[book?.segments.length - 1]?.to?.code }}</td>
                <td>
                <span :class="book?.payment_status === 'unpaid' ? 'text-red-600':'text-green-300'">
                  {{ book?.payment_status }}
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
                <td>{{ book?.latest_ticketing_time }}</td>
                <td>
                  <ul class="flex items-center gap-3">
                    <li>
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <n-button circle @click="selectedBookData(book)" type="primary">
                            <Icon class="text-xl" name="mdi:eye-outline"/>
                          </n-button>
                        </template>
                        Show
                      </n-tooltip>
                    </li>
                    <li v-if="book?.status === 'ticket'">
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <n-button circle type="warning" @click="handelPrint(book)">
                            <Icon class="text-xl" name="material-symbols:download"/>
                          </n-button>
                        </template>
                        Download Ticket
                      </n-tooltip>
                    </li>
                    <li v-if="book.status === 'book'">
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <n-button circle :loading="is_loading" @click="handelIssue(book)" color="#16a34a" type="tertiary">
                            <Icon class="text-2xl" name="proicons:airplane-takeoff" />
                          </n-button>
                        </template>
                        Issue Ticket
                      </n-tooltip>
                    </li>
                    <li v-if="book.status === 'book'">
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <n-button circle :loading="is_loading" @click="handelCancel(book)" color="#f74616" type="tertiary">
                            <Icon class="text-xl" name="material-symbols:cancel"/>
                          </n-button>
                        </template>
                        Cancel Ticket
                      </n-tooltip>
                    </li>
                    <li v-if="book.status === 'ticket' && isDateInCurrentDay(book?.ticket_date)">
                      <n-tooltip trigger="hover">
                        <template #trigger>
                          <n-button circle :loading="is_loading" @click="handelVoid(book)" color="#40739e">
                            <Icon class="text-xl" name="gridicons:refund"/>
                          </n-button>
                        </template>
                        Void Ticket
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
    </Card>


  </div>
</template>
<script setup>
import {useFlights} from "~/store/Flights/Flights.js";
import {useProfile} from "~/store/Profile.js";
import {formatDate} from "~/utils/helpers.js";

const Router = useRouter();
const bookData = ref({})
const bookDetails = ref({})
const showBookDetails = ref(false)
const is_loading = ref(false);
const Flights = useFlights()
const Profile = useProfile()
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
  showBookDetails.value = true
}

const handelIssue = (data) => {
  is_loading.value = true
  Flights.issueTicket({
    "pnr": data?.pnr,
    "last_name": data?.passengers[0]?.lastName
  }).then(data => {
    getPageDate()
    is_loading.value = false
  }).catch(() => {
    is_loading.value = false
  })
}

const handelCancel = (data) => {
  is_loading.value = true
  Flights.cancelBook({
    "pnr": data?.pnr,
    "last_name": data?.passengers[0]?.lastName
  }).then(() => {
    is_loading.value = false
    getPageDate()
  }).catch(() => {
    is_loading.value = false
  })
}

function isDateInCurrentDay(dateTimeString) {
  const inputDate = new Date(dateTimeString);
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return inputDate >= startOfDay && inputDate <= endOfDay;
}

const handelVoid = (data) => {
  is_loading.value = true
  Flights.voidBook({
    "pnr": data?.pnr,
    "last_name": data?.passengers[0]?.lastName
  }).then(() => {
    is_loading.value = false
    getPageDate()
  }).catch(() => {
    is_loading.value = false
  })
}

const getPageDate = (payload = {...filters.value, ...pagination.value}) => {
  is_loading.value = true
  Profile.getFlightBook(payload).then(res => {
    bookData.value = res.data
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
