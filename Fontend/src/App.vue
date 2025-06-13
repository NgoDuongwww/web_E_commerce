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
    <Toaster />

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
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;

  section[aria-label='Notifications alt+T'] {
    position: absolute !important;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .Admin {
    color: var(--text-default);
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
}
</style>
