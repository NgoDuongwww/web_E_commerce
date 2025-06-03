<template>
  <router-view />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
</script>

<style lang="scss" scoped></style>
