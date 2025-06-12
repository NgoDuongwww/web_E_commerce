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
  <div class="wrapper">
    <!-- Thông báo -->
    <Toaster position="top-right" />

    <!-- Layout Admin -->
    <template v-if="!$route.meta.noLayout && $route.meta.adminLayout">
      <div class="Admin">
        <div class="AD admin__header">
          <AdminMenu />
        </div>
        <div class="AD admin__main">
          <router-view />
        </div>
      </div>
    </template>

    <!-- Layout User -->
    <template v-if="!$route.meta.noLayout && $route.meta.userLayout">
      <router-view />
    </template>

    <!-- Layout Auth -->
    <template v-if="$route.meta.noLayout">
      <router-view />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1920px;
  height: 100vh;
  color: var(--text-default);
  margin: 0 auto;
}

.Admin {
  @include w-100-h-100;
  @include display-flex-row;

  .AD {
    height: 100%;
  }

  .admin__header {
    width: 12%;
  }

  .admin__main {
    flex: 1;
  }
}
</style>
