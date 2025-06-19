<template>
  <div class="Product-Menu w-full h-full">
    <ul class="w-full h-full flex flex-row gap-5">
      <li
        class="w-auto h-full flex justify-center items-center rounded-md bg-[var(--bg-default)]"
        :class="{
          'active bg-[var(--btn-primary)] text-[var(--text-active)]':
            $route.path == '/admin/products/product-list',
        }"
      >
        <router-link
          class="Tab w-full h-full flex justify-center items-center px-6"
          to="/admin/products/product-list"
          >Product List</router-link
        >
      </li>
      <li
        class="w-auto h-full flex justify-center items-center rounded-md bg-[var(--bg-default)]"
        :class="{
          'active bg-[var(--btn-primary)] text-[var(--text-active)]':
            $route.path == '/admin/products/brand-list',
        }"
      >
        <router-link
          class="Tab w-full h-full flex justify-center items-center px-6"
          to="/admin/products/brand-list"
          >Manage Brands</router-link
        >
      </li>
      <li
        class="w-auto h-full flex justify-center items-center rounded-md bg-[var(--bg-default)]"
        :class="{
          'active bg-[var(--btn-primary)] text-[var(--text-active)]':
            $route.path == '/admin/products/category-list',
        }"
      >
        <router-link
          class="Tab w-full h-full flex justify-center items-center px-6"
          to="/admin/products/category-list"
          >Manage Categories</router-link
        >
      </li>
    </ul>
  </div>
</template>
