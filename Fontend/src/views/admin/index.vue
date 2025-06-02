<script setup>
import AdminMenu from "../../layouts/admin/AdminMenu.vue";
</script>

<template>
  <div class="Admin">
    <div class="AD admin__header">
      <AdminMenu />
    </div>
    <div class="AD admin__main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Admin {
  max-width: 1920px;
  height: 100vh;
  @include display-flex-row;
  overflow-x: hidden;
  background: var(--bg-page);

  .AD {
    height: 100%;
  }

  .admin__header {
    background: var(--bg-default);
    width: 12%;
    padding: var(--padding-24) var(--padding-16) var(--padding-24)
      var(--padding-16);
  }

  .admin__main {
    flex: 1;
    padding: var(--padding-16);
  }
}
</style>
