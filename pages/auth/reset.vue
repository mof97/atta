<template>
  <div id="reset-page" class="">
    <n-form class="grid gap-5 py-10"
            v-if="!is_sent"
            ref="formRef"
            :model="payload"
            :rules="resetRules">
      <n-form-item :show-label="false" :show-feedback="false" path="email">
        <n-input v-model:value="payload.email"  placeholder="Email">
          <template #prefix>
            <Icon class="text-2xl text-white" name="solar:user-broken" />
          </template>
        </n-input>
      </n-form-item>
      <div class="form-controll">
        <n-button :loading="is_loading" @click="handelReset" size="large" class="rounded shadow shadow-primary" icon-placement="left" type="primary" block>
          <template #icon>
            <Icon name="mdi:flight" />
          </template>
          Send
        </n-button>
      </div>
    </n-form>
    <div v-else class="gap-1 py-3 text-white text-lg flex items-center justify-center">
      <Icon class="text-4xl" name ='lets-icons:done-round-duotone' />
      We Send Reset Link To Your Email
    </div>
  </div>
</template>
<script setup>
import {resetRules} from "~/validation/reset.validate.ts";
import {useAuth} from "~/store/auth.js";
const Auth = useAuth()
const formRef = ref(null)
const is_sent = ref(false);
const payload = reactive({
  email: '',
})
const is_loading = ref(false)
const handelReset=()=>{
  formRef.value?.validate((errors) => {
    if (!errors) {
      is_loading.value = true
      Auth.resetPassword(payload).then(() => {
        is_loading.value = false
        is_sent.value = true
      }).catch(() => {
        is_loading.value = false
      })
    }
  })
}
definePageMeta({
  layout: 'auth',
})

</script>