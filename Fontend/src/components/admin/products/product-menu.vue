<template>
  <div class="Product-Menu">
    <ul>
      <li
        :class="{
          active: $route.path == '/admin/products/product-list',
        }"
      >
        <router-link class="Tab" to="/admin/products/product-list"
          >Product List</router-link
        >
      </li>
      <li
        :class="{
          active: $route.path == '/admin/products/brand-list',
        }"
      >
        <router-link class="Tab" to="/admin/products/brand-list"
          >Manage Brands</router-link
        >
      </li>
      <li
        :class="{
          active: $route.path == '/admin/products/category-list',
        }"
      >
        <router-link class="Tab" to="/admin/products/category-list"
          >Manage Categories</router-link
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.Product-Menu {
  @include w-100-h-100;

  ul {
    @include w-100-h-100;
    @include display-flex-row;
    gap: 20px;

    li {
      @include w-auto-h-100;
      @include display-flex-center-center;
      border-radius: var(--radius-md);
      background: var(--bg-default);

      .Tab {
        @include w-100-h-100;
        @include display-flex-center-center;
        padding: 0px var(--padding-24);
      }
    }

    .active {
      background: var(--btn-primary);
      color: var(--text-active);
    }
  }
}
</style>
