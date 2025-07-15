<script setup>
defineProps({
  // ↳ Khai báo props mà component nhận từ cha.
  message: String,
  close: Function,
})
</script>

<template>
  <div class="notification">
    <div class="popup error-popup">
      <div class="popup-icon error-icon">
        <svg
          class="error-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="error-message">{{ message }}</div>
      <div class="popup-icon close-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="close-svg"
        >
          <path
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
            class="close-path"
            @click="close"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  // position: fixed;
  // top: 20px;
  // right: 20px;
  // z-index: 1000;
  margin: var(--margin-8) var(--margin-8) 0px 0px;
  animation: fade-in 0.5s ease-in-out;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .popup {
    padding: var(--padding-4) 0;
    width: 300px;
    @include display-flex-around-center;
    border-radius: var(--radius-sm);
    font-weight: 300;
    box-shadow: var(--shadow-lg);
    background-color: var(--bg-error-notification);
    border: solid 1px var(--boder-error-notification);

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .popup-icon {
      @include display-flex-ali-center;

      svg {
        margin: var(--margin-4);
      }

      &.error-icon {
        path {
          fill: #f87171;
        }
      }

      &.close-icon {
        .close-svg {
          cursor: pointer;

          .close-path {
            fill: grey;
          }
        }
      }
    }

    .error-message {
      color: var(--text-error-notification);
    }
  }
}
</style>
