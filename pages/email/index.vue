<template>
  <div id="reset-page" class="">
    <n-form class="grid gap-5 py-10"
            ref="formRef"
            :model="payload"
            :rules="changePasswordRules">
      <n-form-item :show-label="false" :show-feedback="false" path="new_password">
        <n-input v-model:value="payload.new_password"  placeholder="New Password">
          <template #prefix>
            <Icon class="text-2xl text-white" name="carbon:password" />
          </template>
        </n-input>
      </n-form-item>
      <div class="form-controll">
        <n-button :loading="is_loading" @click="handelChangePassword" size="large" class="rounded shadow shadow-primary" icon-placement="left" type="primary" block>
          <template #icon>
            <Icon name="mdi:flight" />
          </template>
          Send
        </n-button>
      </div>
    </n-form>
  </div>
</template>
<script setup>
import {changePasswordRules} from "~/validation/reset.validate.ts";
import {useAuth} from "~/store/auth.js";
const Auth = useAuth()
const formRef = ref(null)
const Route = useRoute()
const Router = useRouter()
const payload = reactive({
  new_password: '',
  token: Route.query.token || "",
})
const is_loading = ref(false)
const handelChangePassword = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      is_loading.value = true
      Auth.sendNewPassword(payload).then(() => {
        is_loading.value = false
        Router.push('/auth')
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