<script setup>
import toi from '@/assets/images/sang.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token') // Xóa token
  router.push('/admin/login') // Chuyển trang
}
</script>

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
            :class="{
              activeTab: $route.path === '/admin/dashboard',
            }"
            to="/admin/dashboard"
            ><i class="fa fa-home"></i>Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            class="tab"
            :class="{
              activeTab: $route.path.startsWith('/admin/products'),
            }"
            to="/admin/products"
            ><i class="fa fa-cube"></i> Product</router-link
          >
        </li>
        <li>
          <div class="tab"><i class="fa fa-cog"></i> Settings</div>
        </li>
      </ul>
    </div>

    <div class="Header Admin-Header__Logout">
      <button @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Admin-Header {
  @include w-100-h-100;
  @include display-flex-column-between;
  padding: var(--padding-24) var(--padding-16) var(--padding-24)
    var(--padding-16);

  .Header {
    width: 100%;

    ul {
      width: 100%;
      list-style: none;

      li {
        .tab {
          text-decoration: none;
        }
      }
    }
  }

  .Admin-Header__img {
    height: auto;

    img {
      @include w-100-h-auto;
    }
  }

  .Admin-Header__Menu {
    flex: 0.9;

    ul {
      @include w-100-h-100;
      @include display-flex-column-flexStart;

      li {
        width: 100%;
        height: 42px;
        border-radius: var(--radius-md);
        margin: 0px 0px var(--margin-8) 0px;

        .tab {
          @include w-100-h-100;
          @include display-flex-left-center;
          border-radius: var(--radius-md);
          transition: var(--transition-md);

          &:hover {
            background-color: var(--btn-primary-hover);
            color: var(--text-active);
          }

          .fa {
            width: 20%;
            height: 100%;
            @include display-flex-center-center;
          }
        }

        .activeTab {
          background-color: var(--btn-primary);
          color: var(--text-active);
        }
      }
    }
  }

  .Admin-Header__Logout {
    width: 100%;
    height: 5%;
    @include display-flex-left-center;

    button {
      @include w-100-h-100;
      border-radius: var(--radius-md);
      transition: var(--transition-md);
      @include display-flex-ali-center;
      border: none;
      background: none;
      cursor: pointer;

      &:hover {
        background-color: var(--btn-primary-hover);
        color: var(--text-active);
      }

      .fas {
        @include display-flex-center-center;
        width: 20%;
        height: 100%;
      }
    }
  }
}
</style>
