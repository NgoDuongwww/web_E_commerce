<template>
  <div class="Admin">
    <div class="AD admin__header">
      <AdminHeader />
    </div>
    <div class="AD admin__main">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AdminHeader from "../../layouts/AdminHeader.vue";
</script>

<style lang="scss" scoped>
.Admin {
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: var(--color-bg-body);

  .AD {
    width: 100%;
  }

  .admin__header {
    height: 80px;
    padding: var(--padding-16);
  }

  .admin__main {
    flex: 1;
    padding: var(--padding-16);
  }
}
</style>
