<template>
  <div id="profile-transactions">
    <loader v-if="is_loading"/>
      <Card title="">
        <template #body>
          <div class="p-5">
            <div class="filters mb-5">
              <n-date-picker :actions="['confirm']" v-model:formatted-value="filterData.dateRange"
                             formatted-value="dd-mm-yyyy" type="daterange" clearable/>
            </div>
            <div class="table-content">
              <div class="empty py-20 h-full flex items-center justify-center" v-if="!transactions.data">
                <n-empty description="You can't find anything"></n-empty>
              </div>
              <div class="" v-else>
                <div class="overflow-x-auto">


                <n-table class="w-full whitespace-nowrap" :bordered="false" :single-line="false">
                  <thead>
                  <tr>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>New Balance</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="transaction in transactions.data">
                    <td>
                      <span
                          :class="`px-3 py-1 rounded-full border ${getTransactionTypeStyle(transaction.transaction_type)}`">
                        {{ capitalizeFirstLetter(transaction.transaction_type) }}
                      </span>
                    </td>
                    <td>{{ transaction.amount.toLocaleString() }} {{ transaction.currency }}</td>
                    <td>{{ transaction.new_balance.toLocaleString() }} {{ transaction.currency }}</td>
                    <td>{{ transaction.payment_type }}</td>
                    <td>
                      <span
                          :class="`px-3 py-1 rounded-full border ${getStatusStyle(transaction.status)}`">
                        {{ capitalizeFirstLetter(transaction.status) }}
                      </span>
                    </td>
                    <td>
                      {{transaction.comment}}
                    </td>
                    <td>{{ transaction.date }}</td>
                  </tr>
                  </tbody>
                </n-table>
                </div>
                <div class="pagination flex justify-between items-center mt-5">
                  <n-button @click="filterData.export = true"  type="primary">
                    <span class="flex justify-center items-center gap-3">
                      <Icon class="mr-3 text-xl" name="uiw:file-excel"/>
                      Export Excel
                    </span>
                  </n-button>
                  <n-pagination v-model:page="filterData.page" :page-count="Math.ceil(transactions.total / 10)"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
</div>
</template>
<script setup>
import {useAuth} from "~/store/auth.js";
import {useProfile} from "~/store/profile.js";
import {useToast} from 'vue-toastification'
const toast = useToast();
const userData = ref(JSON.parse(localStorage.getItem("fly-user")) || {})
const $profile = useProfile()
const is_loading = ref(false)
const transactions = ref([])
const currentDate = new Date();
const filterData = ref({
  page: 1,
  take: 10,
  skip: 0,
  dateRange: [
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1).toISOString().slice(0, 10),
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toISOString().slice(0, 10)
  ],
  export: false
})
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getTransactionTypeStyle(type) {
  switch (type.toLowerCase()) {
    case 'cash_in':
      return 'bg-green-100 text-green-700 border-green-500'; // Green for cash_in
    case 'cash_out':
      return 'bg-red-100 text-red-700 border-red-500'; // Red for cash_out
    case 'domestic_transfer':
      return 'bg-blue-100 text-blue-700 border-blue-500'; // Blue for domestic_transfer
    case 'deposit':
      return 'bg-indigo-100 text-indigo-700 border-indigo-500'; // Indigo for deposit
    case 'withdrawal':
      return 'bg-orange-100 text-orange-700 border-orange-500'; // Orange for withdrawal
    case 'refund':
      return 'bg-yellow-100 text-yellow-700 border-yellow-500'; // Yellow for refund
    case 'cashback':
      return 'bg-purple-100 text-purple-700 border-purple-500'; // Purple for cashback
    case 'fee':
      return 'bg-gray-100 text-gray-700 border-gray-500'; // Gray for fee
    default:
      return 'bg-gray-100 text-gray-700 border-gray-500'; // Default styling
  }
}

function getStatusStyle(status) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-500'; // Yellow for pending
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-500'; // Green for completed
    case 'failed':
      return 'bg-red-100 text-red-700 border-red-500'; // Red for failed
    case 'cancelled':
      return 'bg-gray-100 text-gray-700 border-gray-500'; // Gray for cancelled
    case 'reversed':
      return 'bg-blue-100 text-blue-700 border-blue-500'; // Blue for reversed
    default:
      return 'bg-gray-100 text-gray-700 border-gray-500'; // Default styling
  }
}

const getTransactionsData = (filter = filterData.value) => {
  is_loading.value = true
  $profile.getTransactions({
    ...filter,
    skip: filter.page === 1 ? 0 : Math.abs((filter.skip * filter.page) - 10),
    fromDate: filter.dateRange[0],
    toDate: filter.dateRange[1],
  }).then((response) => {
    transactions.value = response.data
    if (filter.export) {
      filterData.value.export = false
    }
  }).then(() => {
    is_loading.value = false
  }).catch(() => {
    is_loading.value = false
  })
}

watch(filterData, (value) => {
  console.log(value)
  getTransactionsData({
    ...value,
    fromDate: value.dateRange[0],
    toDate: value.dateRange[1],
  })
}, {deep: true})

onMounted(() => {
  $profile.getProfile()
  getTransactionsData()
})

</script>
