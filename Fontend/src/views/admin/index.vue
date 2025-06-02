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
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: var(--bg-page);

  .AD {
    width: 100%;
  }

  .admin__header {
    height: 10%;
    padding: var(--padding-24) var(--padding-16) var(--padding-24)
      var(--padding-16);
  }

  .admin__main {
    height: 90%;
    padding: var(--padding-16);
  }
}
</style>
