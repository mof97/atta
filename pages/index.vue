<template>
  <div class="auth-page py-10">
    <n-form class="grid gap-5">
      <n-form-item :show-label="false">
        <n-input placeholder="Email">
          <template #prefix>
            <Icon class="text-2xl text-white" name="solar:user-broken" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item :show-label="false">
        <n-input type="password" placeholder="Password">
          <template #prefix>
            <Icon class="text-2xl text-white" name="solar:lock-password-linear" />
          </template>
          <template #password-invisible-icon>
            <Icon class="text-2xl text-white" name="solar:eye-broken" />
          </template>
        </n-input>
      </n-form-item>
      <div class="form-controll">
        <n-button @click="Router.push('/Flights')" size="large" class="rounded shadow shadow-primary" icon-placement="left" type="primary" block>
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
const Router = useRouter()
definePageMeta({
  layout: 'auth',
})

</script>