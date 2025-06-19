<script setup>
import AdminMenu from '@/layouts/admin/AdminMenu.vue'
import { onMounted } from 'vue'
import { handleToken } from '@/utils/auth.js'

// ➡ Hook chạy sau khi component render lần đầu.
onMounted(() => {
  const isExpired = handleToken(true)
  if (isExpired) {
    return
  }
})
</script>

<template>
  <div class="wrapper max-w-[1920px] h-screen mx-auto my-0">
    <Toaster />

    <template v-if="!$route.meta.noLayout && $route.meta.adminLayout">
      <div class="Admin w-full h-full flex flex-row text-[var(--text-default)]">
        <div class="AD admin__header w-[12%]">
          <AdminMenu />
        </div>
        <div class="AD admin__main w-full">
          <router-view />
        </div>
      </div>
    </template>

    <template v-if="!$route.meta.noLayout && $route.meta.userLayout">
      <router-view />
    </template>

    <template v-if="$route.meta.noLayout">
      <router-view />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  section[aria-label='Notifications alt+T'] {
    position: absolute !important;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  :deep(section[aria-label='Notifications alt+T'] li) {
    list-style: none;
    display: block;
  }
}
</style>
