<script setup>
import ProductMenu from "../../components/admin/products/ProductMenu.vue";
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

  .Pro {
    width: 100%;
  }

  .Product-View__Top {
    height: 5%;
  }

  .Product-View__Bottom {
    border: 1px solid red;
    height: 93%;
    @include display-flex-column-between;
  }
}
</style>
