<template>
  <div class="Admin-Header">
    <div class="Header Admin-Header__img">
      <img :src="toi" alt="Logo" />
    </div>

    <div class="Header Admin-Header__Menu">
      <ul>
        <li>
          <router-link
            class="tab"
            :class="{ activeTab: $route.path === '/admin/dashboard' }"
            to="/admin/dashboard"
            >Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            class="tab"
            :class="{ activeTab: $route.path === '/admin/products' }"
            to="/admin/products"
            >Product</router-link
          >
        </li>
      </ul>
    </div>

    <div class="Header Admin-Header__Other">
      <ul>
        <li class="Setting">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </li>
        <li class="Notification">
          <i class="fa fa-bell" aria-hidden="true"></i>
        </li>
        <li class="User">
          <i class="fa fa-user" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import toi from "@/assets/images/sang.png";
</script>

<style lang="scss" scoped>
.Admin-Header {
  width: 100%;
  height: 100%;
  @include display-flex-row-between;

  .Header {
    height: 100%;

    ul {
      height: 100%;
      list-style: none;

      li {
        .tab {
          text-decoration: none;
        }
      }
    }
  }

  .Admin-Header__img {
    width: 20%;

    img {
      width: auto;
      height: 100%;
    }
  }

  .Admin-Header__Menu {
    width: 50%;
    background-color: var(--bg-default);
    border-radius: var(--radius-lg);

    ul {
      @include display-flex-row-around-center;

      li {
        width: 12%;
        height: 80%;
        border-radius: var(--radius-xl);

        .tab {
          width: 100%;
          height: 100%;
          @include display-flex-center-center;
          border-radius: var(--radius-xl);
          font-weight: 600;
          transition: var(--transition-md);

          &:hover {
            background-color: var(--btn-primary-hover);
          }
        }

        .activeTab {
          background-color: var(--btn-primary-bg);
        }
      }
    }
  }

  .Admin-Header__Other {
    width: 15%;
    font-size: var(--font-size-xl);

    ul {
      @include display-flex-row-evenly-center;

      li {
        background-color: var(--bg-default);
        height: 100%;
        width: 18%;
        border-radius: var(--radius-xxl);

        .fa {
          width: 100%;
          height: 100%;
          @include display-flex-center-center;
          border-radius: var(--radius-xxl);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
