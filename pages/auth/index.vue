<template>
  <div class="auth-page py-10">
    <n-form class="grid gap-5"
            ref="formRef"
            :model="payload"
            :rules="rules">
      <n-form-item :show-label="false" :show-feedback="false" path="email">
        <n-input v-model:value="payload.email"  placeholder="Email">
          <template #prefix>
            <Icon class="text-2xl text-white" name="solar:user-broken" />
          </template>
        </n-input>
      </n-form-item>

      <n-form-item :show-label="false" :show-feedback="false" path="password">
        <n-input v-model:value="payload.password" type="password" placeholder="Password">
          <template #prefix>
            <Icon class="text-2xl text-white" name="solar:lock-password-linear" />
          </template>
          <template #password-invisible-icon>
            <Icon class="text-2xl text-white" name="solar:eye-broken" />
          </template>
        </n-input>
      </n-form-item>
      <div class="flex items-center justify-end">
        <NuxtLink to="/auth/reset" class="text-white font-bold hover:text-primary duration-300">Forget Password ?</NuxtLink>
      </div>
      <div class="form-controll">
        <n-button :loading="is_loading" @click="handelLogin" size="large" class="rounded shadow shadow-primary" icon-placement="left" type="primary" block>
          <template #icon>
            <Icon name="mdi:flight" />
          </template>
          Login
        </n-button>
      </div>
    </n-form>
  </div>
</template>
<script setup>
import {authRules} from "~/validation/auth.validate";
import {useAuth} from "~/store/auth";
const Auth = useAuth()
const Router = useRouter()
const rules = authRules
const formRef = ref(null)
const is_loading = ref(false)
const payload = reactive({
  email: '',
  password: '',
  type: "login"
})

const handelLogin = ()=>{
  formRef.value?.validate((errors) => {
    if (!errors) {
      is_loading.value=true
      Auth.login(payload).then(res=>{
        if(res.need_otp){
          Router.push('/auth/otp')
        }else{
          Router.push('/flights')
          localStorage.setItem('ATA-token',res.token)
          localStorage.setItem('ATA-user',JSON.stringify(res))
        }
      }).catch(()=>{
        is_loading.value=false
      })
    }
  })
}


definePageMeta({
  layout: 'auth',
})

</script>