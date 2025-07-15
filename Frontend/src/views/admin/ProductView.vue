<script setup>
import ProductMenu from '@/components/admin/products/product-menu.vue'
</script>

<template>
  <div class="Product-View">
    <div class="Pro Product-View__Top">
      <ProductMenu />
    </div>
    <div class="Pro Product-View__Bottom">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Product-View {
  @include w-100-h-100;
  @include display-flex-column-between;
  background: var(--bg-page);
  padding: var(--padding-16);

  .Pro {
    width: 100%;
  }

  .Product-View__Top {
    height: 5%;
  }

  .Product-View__Bottom {
    height: 93%;
    @include display-flex-column-between;
  }
}
</style>
