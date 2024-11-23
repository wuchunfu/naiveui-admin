<template>
  <n-space vertical>
    <n-form :rules="rules" ref="formRef" :model="formValue">
      <n-form-item-row :label="$t('page.login.common.account')" path="account">
        <n-input
            v-model:value="formValue.account"
            :placeholder="$t('page.login.common.accountPlaceholder')"
        />
      </n-form-item-row>
      <n-form-item-row :label="$t('page.login.common.password')" path="password">
        <n-input
            type="password"
            v-model:value="formValue.password"
            :placeholder="$t('page.login.common.passwordPlaceholder')"
            show-password-on="click"
        />
      </n-form-item-row>
    </n-form>
    <n-button
        type="primary"
        block
        @click="handleSubmit"
        :disabled="loading"
        :loading="loading"
    >
      {{ $t('page.login.common.login') }}
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { $t } from '@/locales';
import { useAuthStore } from "@/store";
import type { FormInst } from 'naive-ui';
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: 'AccountLogin'
});

const ua = useAuthStore()
const router = useRouter()

const rules = reactive({
  account: {
    required: true,
    // pattern: /^1[3456789]\d{9}$/,
    message: $t('page.login.common.accountMessage'),
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: $t('page.login.common.passwordMessage'),
    trigger: ['input', 'blur']
  }
})

const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const formValue = reactive({
  account: "test",
  password: "123456"
})

const handleSubmit = async () => {
  loading.value = true
  let validate = false
  try {
    await formRef.value?.validate((res: any) => {
      validate = !res
    })
  } catch (res: any) {
    res.forEach((item: any) => {
      // @ts-ignore
      window.$message?.error(item[0].message)
    })
    loading.value = false
  }

  if (validate) {
    // todo 实际登录
    await ua.login(formValue)
    // @ts-ignore
    window.$message?.success($t('page.login.common.loginSuccess'))
    loading.value = false
  }
}

function goHome() {
  const { query } = router.currentRoute.value
  if (query?.redirect) {
    router.push({ path: query.redirect as string })
  } else {
    router.push({ name: 'home_index' })
  }
}
</script>

<style scoped lang="scss">
</style>
