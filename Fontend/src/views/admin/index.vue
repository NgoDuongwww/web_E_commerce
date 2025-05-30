<template>
          <div class="AD admin__header">
                    <AdminHeader />
          </div>
          <div class="AD admin__main">
                    <router-view />
          </div>
</template>

<script setup>
import AdminHeader from "../../layouts/AdminHeader.vue"
</script>

<style lang="scss" scoped>
.AD {
          border: 1px solid red;
}
</style>