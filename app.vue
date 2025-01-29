<template>
  <div id="app">
    <n-config-provider :theme-overrides="themeOverrides">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    </n-config-provider>
  </div>
</template>
<script setup>
const themeOverrides = {
  common: {
    primaryColor: "#009EE2",
    primaryColorHover: "#009EE2",
    primaryColorPressed: "#009EE2",
    primaryColorSuppl: "#009EE2",
  },
  // Input:{
  //   color:"#f6f5f5",
  //   placeholderColor:"#000",
  //   borderRadius:"3px",
  //   colorFocus:"#f6f5f5",
  //   "placeholderColor": "#96A0B5",
  //   "placeholderColorDisabled": "#96A0B5"
  // }
}
</script>