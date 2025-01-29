<template>
  <div id="flight-book">
    <PageHeader />
    <section class="py-10">
      <div class="container grid grid-cols-12 gap-5">
        <div class="book-form col-span-8">
          <div class="bg-gray-light p-3 rounded-lg">
            <div class="bg-white p-5 shadow rounded-lg">
              <h2 class="text-lg mb-5">
                1. Adult
              </h2>
              <n-form
                  ref="formRef"
                  class="grid grid-cols-2 gap-3"
              >
                <n-form-item label="Title" :show-feedback="false">
                  <n-select :options="[]" placeholder="Select Title" />
                </n-form-item>
                <n-form-item :show-feedback="false" label="First name" >
                  <n-input type="text" placeholder="" />
                </n-form-item>
                <n-form-item :show-feedback="false" label="Birth Day" >
                  <n-input type="text" placeholder="" />
                </n-form-item>
                <n-form-item :show-feedback="false" label="Last name" >
                  <n-input type="text" placeholder="" />
                </n-form-item>
                <n-form-item :show-feedback="false" label="Passport Number" >
                  <n-input type="text" placeholder="" />
                </n-form-item>
                <n-form-item :show-feedback="false" label="Expire Date" >
                  <n-input type="text" placeholder="" />
                </n-form-item>
                <n-form-item label="Nationality" :show-feedback="false">
                  <n-select :options="[]" placeholder="Select nationality" />
                </n-form-item>
              </n-form>
            </div>
          </div>
        </div>
        <div class="price col-span-4">
          <div class="bg-gray-light p-3 rounded-lg">
            <div class="bg-white p-5 shadow rounded-lg">
              <ul class="text-[14px] grid grid-cols-1 rounded gap-2">
                <li class="flex items-center gap-10">
                <span>
                  Base Fare
                </span>
                  <span class="w-20 h-[1px] bg-gray-200"></span>
                  <span>
                  200 $
                </span>
                </li>
                <li class="flex items-center gap-8">
                <span>
                  Taxes and fees
                </span>
                  <span class="w-20 h-[1px] bg-gray-200"></span>
                  <span>
                  20 $
                </span>
                </li>
                <li class="flex items-center gap-8">
                <span>
                  Commission
                </span>
                  <span class="w-20 h-[1px] bg-gray-200"></span>
                  <span>
                  20 $
                </span>
                </li>
              </ul>
              <div class="pt-3">
                <span class="text-naive-light">
                  Total Price
                </span>
                <h2 class="text-xl font-bold">1,000 USD</h2>
              </div>
            </div>
          </div>
          <div class="bg-gray-light p-3 rounded-lg mt-3">
            <div class="bg-white p-3 shadow rounded-lg flex items-center justify-between gap-2">
              <h2 class="font-bold">
                Your balance is
              </h2>
              <h3 class="text-xl">
                1,000 USD
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-10">
      <div class="container flex items-center justify-center gap-2">
        <n-button type="default" class="px-10">
          Back
        </n-button>
        <n-button type="primary" class="px-10">
          Back
        </n-button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
</script>