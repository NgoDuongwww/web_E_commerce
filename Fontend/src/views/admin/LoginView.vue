<template>
  <div class="Login">
    <div class="Log-in">
      <div class="Log Top">
        <img src="@/assets/images/sang.png" alt="" />
        <p>Welcome Back</p>
        <span>Please enter your email and password to log in.</span>
      </div>
      <div class="Log Bottom">
        <form action="" class="form-login">
          <label for="">Email</label>
          <input type="Email" />
          <label for="">Password</label>
          <input type="Password" />
          <span>Forgot Password</span>
          <button type="submit">Log In</button>
          <span>Don't have an account?</span>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Login {
  @include w-100-h-100;
  background: url("@/assets/images/bg_login_amin.jpg") no-repeat center center /
    cover;
  @include display-flex-center-center;

  .Log-in {
    width: 33%;
    height: 73%;
    background: var(--bg-default);
    border-radius: var(--radius-md);
    @include display-flex-column-around-center;
    padding: var(--padding-96) 0px;

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
        padding: var(--padding-24);
        @include display-flex-column;
        font-family: inherit;

        label {
          margin: var(--margin-8) 0 var(--margin-4);
          font-weight: 600;
          color: var(--text-36px);
          font-size: var(--font-size-lg);
        }

        input {
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

        span {
          font-size: var(--font-size-sm);
          color: var(--text-default);
          margin: var(--margin-8) 0;
          cursor: pointer;
          transition: color var(--transition-sm);

          &:hover {
            color: var(--btn-primary-bg);
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
