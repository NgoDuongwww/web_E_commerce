<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '@/utils/auth.js'
import { errorLogin } from '@/utils/toast.js'

const email = ref('')
const password = ref('')
const router = useRouter()

const showPass = ref(false)

const login = async () => {
  if (!email.value && !password.value) {
    return errorLogin('Please enter email and password!')
  } else if (!email.value) {
    return errorLogin('Please enter email!')
  } else if (!password.value) {
    return errorLogin('Please enter password!')
  }

  try {
    const res = await api.post(
      '/users/login',
      // ↳ Yêu cầu api tới server
      {
        // Dữ liệu từ request body
        email: email.value,
        password: password.value,
      }
    )

    const token = res.data.token // ➡ Lấy token từ response
    const decoded = jwtDecode(token) // ➡ Giải mã token
    const expTime = decoded.exp * 1000 // ➡ Thời gian hết hạn token

    localStorage.setItem('token', token) // ➡ Lưu token vào localStorage
    localStorage.setItem('expirationTime', expTime) // ➡ Lưu thời gian hết hạn token vào localStorage

    router.push('/admin') // ➡ Chuyển trang
  } catch (error) {
    errorLogin('Login failed. Please try again!')
    // console.error(error)
  }
}

// ➡ Hook chạy sau khi component render lần đầu.
onMounted(() => {
  if (getToken()) {
    router.replace('/admin/') // ➡ Để người dùng không quay lại được trang login bằng nút Back.
  }
})
</script>

<template>
  <div class="Login">
    <div class="Log-in">
      <div class="Log Top">
        <img src="@/assets/images/sang.png" alt="" />
        <p>Welcome Back Admin</p>
        <span>Please enter your email and password to log in.</span>
      </div>
      <div class="Log Bottom">
        <form action="" @submit.prevent="login" class="form-login">
          <label for="">Email</label>
          <input type="Email" v-model="email" placeholder="Enter your email" />
          <label for="">Password</label>
          <div class="password-wrapper">
            <input
              :type="showPass ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              id="pwd"
              class="password-input"
            />
            <span class="toggle-password" @click="showPass = !showPass">
              {{ showPass ? '👁️' : '🙈' }}
            </span>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Login {
  @include w-100-h-100;
  // background: url('@/assets/images/bg_login_amin.jpg') no-repeat center center /
  //   cover;
  background: var(--bg-page);
  @include display-flex-center-center;

  .Log-in {
    width: 30%;
    height: 70%;
    background: var(--bg-default);
    border-radius: var(--radius-md);
    @include display-flex-column-around-center;
    padding: var(--padding-96) 0px;
    box-shadow: var(--shadow-lg);

    .Log {
      width: 60%;
    }

    .Top {
      height: 25%;
      @include display-flex-column-center-center;

      img {
        width: 35%;
        height: auto;
        margin: 0px 0px var(--margin-16) 0px;
      }

      p {
        font-size: var(--font-size-5xl);
        color: var(--text-36px);
      }
    }

    .Bottom {
      height: auto;

      .form-login {
        max-width: 400px;
        padding: var(--padding-12);
        @include display-flex-column;
        font-family: inherit;

        label {
          margin: var(--margin-8) 0 var(--margin-4);
          font-weight: 600;
          color: var(--text-36px);
          font-size: var(--font-size-lg);
        }

        input {
          width: 100%;
          padding: var(--padding-12);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          font-size: var(--font-size-lg);
          margin-bottom: var(--margin-16);
          color: var(--text-default);

          &:focus {
            outline: none;
            border-color: var(--btn-primary-bg);
            box-shadow: 0 0 0 2px rgba(80, 101, 246, 0.2);
          }
        }

        .password-wrapper {
          width: 100%;
          position: relative;

          .toggle-password {
            position: absolute;
            right: 10px;
            top: 35%;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: var(--font-size-lg);
          }
        }

        button {
          margin-top: var(--margin-16);
          padding: var(--padding-12);
          background-color: var(--btn-primary-bg);
          color: var(--text-active);
          font-size: var(--font-size-lg);
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background-color var(--transition-md);

          &:hover {
            background-color: var(--btn-primary-hover);
          }
        }
      }
    }
  }
}
</style>
