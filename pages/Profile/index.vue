<template>
  <div id="profile">
    <PageHeader :show-back-button="false" :label="`Welcome Back ${Profile?.profile?.actor?.full_name}`" img-path="../assets/images/headers/details.png" />
    <div class="change-password-modal">
      <n-modal v-model:show="passwordModal">
        <n-card
            style="width: 500px"
            title="Change Password"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <n-form
              ref="formRef"
              :label-width="80"
              :model="passwordPayload"
              :rules="rules"
          >
            <div class="form-container grid gap-3">
              <n-form-item label="Old Password" path="old_password">
                <n-input v-model:value="passwordPayload.old_password" placeholder="Old Password"/>
              </n-form-item>
              <n-form-item label="New Password" path="new_password">
                <n-input v-model:value="passwordPayload.new_password" placeholder="New Password"/>
              </n-form-item>
              <n-form-item label="Confirm Password" path="confirm_password">
                <n-input v-model:value="passwordPayload.confirm_password" placeholder="Confirm"/>
              </n-form-item>
              <n-form-item class="flex items-center justify-end">
                <n-button type="primary" :loading="is_loading" @click="handleValidateClick">
                  Change
                </n-button>
              </n-form-item>
            </div>
          </n-form>
        </n-card>
      </n-modal>
    </div>
    <section class="py-10">
      <div class="container grid grid-cols-1 gap-10">
        <div class="">
          <Card title="">
            <template #body>
              <div class="grid grid-cols-12 gap-10">
                <img class="rounded-xl col-span-4  h-full object-cover" :src="Profile?.profile?.actor?.logo || 'https://cdn.brandfetch.io/idQupqiqlU/w/1500/h/500/theme/dark/idL7zQQ_Dv.png?c=1bx1741287148288id64Mup7acxATgPiMf&t=1719975449377'" alt="">
                <div class="p-5 col-span-8">
                  <h2 class="text-xl mb-3">
                    {{Profile?.profile?.actor?.full_name}}
                  </h2>
                  <ul class="text-nive-light">
                    <li class="flex items-center gap-1">
                      <Icon class="text-xl" name="solar:phone-bold" />
                      {{Profile?.profile?.actor?.phone}}
                    </li>
                    <li class="flex items-center gap-1 my-2">
                      <Icon class="text-xl" name="ic:baseline-email" />
                      {{Profile?.profile?.actor?.email}}
                    </li>
                    <li class="flex items-center gap-1 mb-5">
                      <Icon class="text-xl" name="fluent:location-ripple-12-filled" />
                      {{Profile?.profile?.actor?.address}}
                    </li>
                    <li class="flex items-center gap-1 mb-5">
                      <Icon class="text-xl" name="material-symbols:account-balance-wallet" />
                      {{ Profile?.profile?.wallet?.balance?.toLocaleString() }} {{ Profile?.profile?.wallet?.currency }}
                    </li>
                    <li class="flex items-center gap-1">
                      <n-button @click="passwordModal = true" block>
                        <div class="flex items-center gap-3">
                          <Icon class="text-xl" name="hugeicons:lock-password" />
                          Change Password
                        </div>
                      </n-button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="">
          <n-tabs type="segment" animated>
            <n-tab-pane name="flight" tab="Flight">
              <ProfileFlights />
            </n-tab-pane>
            <n-tab-pane name="visa" tab="Visa">
              <ProfileVisa />
            </n-tab-pane>
            <n-tab-pane name="groups" tab="Groups">
<!--              <ProfileGroups />-->
              <n-empty description="You can't find anything"></n-empty>
            </n-tab-pane>
            <n-tab-pane name="hotels" tab="Hotels">
              <n-empty description="You can't find anything"></n-empty>
            </n-tab-pane>
            <n-tab-pane name="transactions" tab="Transactions">
              <ProfileTransactions />
            </n-tab-pane>
          </n-tabs>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import {RestPasswordRules} from "~/validation/reset.password.validate.ts";
import {useAuth} from "~/store/auth.js";
import {useToast} from "vue-toastification";
import {useProfile} from "~/store/Profile.js";
const is_loading = ref(false)
const formRef = ref(null)
const Auth = useAuth()
const passwordModal = ref(false)
const Profile = useProfile()
const toast = useToast()
const historyType = ref('flights')
const passwordPayload = ref({
  old_password: "",
  new_password: "",
  confirm_password: "",
})


const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      is_loading.value = true
      Auth.changePassword({
        old_password: payload.value.old_password,
        new_password: payload.value.new_password,
      }).then((response) => {
        is_loading.value = false
        toast.success('Password changed successfully!')
        payload.value = {
          old_password: "",
          new_password: "",
          confirm_password: "",
        }
      }).catch(() => {
        is_loading.value = false
      })
    }
  })
}


const rules = ref({
  old_password: {
    required: true,
    message: 'Required',
    trigger: 'blur'
  },
  new_password: {
    required: true,
    message: 'Required',
    trigger: 'blur'
  },
  confirm_password: {
    required: true,
    trigger: 'blur',
    validator(rule, value) {
      if (!value) {
        return new Error(
            'Required'
        )
      } else if (
          passwordPayload.value.new_password !== passwordPayload.value.confirm_password
      ) {
        return new Error(
            'Password Not Match'
        )
      }
      return true
    }
  },
})
onMounted(() => {
  Profile.getProfile()
})

</script>