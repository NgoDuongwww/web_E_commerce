<script setup>
import { ref } from 'vue'

const review_image = ref(null)

function upload_image(event) {
  const file = event.target.files[0] // ➡ Lấy file ảnh đầu tiên người dùng upload.

  // Nếu không có file thì reset ảnh.
  if (!file) {
    review_image.value = null
    return
  }

  const reader = new FileReader()
  // ↳ FileReader là lớp (class) có sẵn trong JavaScript (browser API).
  // ↳ new FileReader() tạo ra một đối tượng mới tên là reader, dùng để đọc nội dung của file (ảnh, text, v.v...).

  reader.onload = () => {
    // ↳ Khi việc đọc file hoàn tất, hãy chạy hàm này.
    review_image.value = reader.result 
  }
  reader.readAsDataURL(file) // → Bắt đầu đọc file, kết quả trả về là chuỗi base64 dùng cho img :src.
}
</script>

<template>
  <div class="add-brand">
    <div class="add">
      <div class="form__title">Add New Brand</div>
      <form class="form__add-brand">
        <div class="form__section">
          <label class="">Brand ID</label>
          <input type="text" placeholder="ae001" />
        </div>
        <div class="form__section">
          <label>Brand Name</label>
          <input type="text" placeholder="Apple" />
        </div>
        <div class="form__section">
          <label>Brand Image</label>
          <input type="file" accept="image/*" @change="upload_image" />

          <div v-if="review_image" class="review-image">
            <img :src="review_image" alt="Preview" />
          </div>
        </div>
      </form>
      <div class="form__actions">
        <button class="save" type="submit">
          <i class="far fa-save"></i> Save
        </button>
        <button class="cancel" type="button" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-brand {
  position: fixed;
  inset: 0;
  z-index: 1000;
  @include display-flex-center-center;
  background-color: rgba(0, 0, 0, 0.5);

  .add {
    width: 500px;
    padding: var(--padding-24);
    @include display-flex-column;
    gap: 20px;
    border-radius: var(--radius-lg);
    background: var(--bg-default);

    .form__title {
      font-size: var(--font-size-xxl);
      font-weight: bold;
    }

    .form__add-brand {
      @include display-flex-column;
      gap: 12px;

      .form__section {
        @include display-flex-column;

        input[type='text'] {
          border: 1px solid var(--border-default);
          padding: var(--padding-12) var(--padding-16);
          border-radius: var(--radius-sm);
        }

        input[type='file'] {
          display: block;
          width: 100%;
          font-size: var(--font-size-sm);
          color: var(--text-default);
          margin: 0px var(--margin-12) 0px 0px;
          padding: var(--padding-8) var(--padding-12);
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
        }

        input[type='file']::file-selector-button {
          padding: var(--padding-8) var(--padding-12);
          margin: 0px var(--margin-12) 0px 0px;
          border-radius: var(--radius-md);
          border: none;
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--btn-primary);
          cursor: pointer;
          transition: background-color var(--transition-sm);
        }

        input[type='file']:hover::file-selector-button {
          background-color: var(--btn-primary);
          color: var(--text-active);
        }

        .review-image {
          margin: var(--margin-4) 0px 0px 0px;
          width: 100%;
          height: 256px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-default);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          overflow: hidden;

          img {
            @include w-100-h-100;
            object-fit: cover;
          }
        }
      }
    }

    .form__actions {
      width: 100%;
      height: 50px;
      display: flex;
      gap: 20px;
      font-size: var(--font-size-sm);
      color: var(--text-active);

      .save {
        width: 50%;
        border-radius: var(--radius-lg);
        background-color: var(--btn-primary);

        &:hover {
          background-color: var(--btn-primary-hover);
        }
      }

      .cancel {
        width: 50%;
        border-radius: var(--radius-lg);
        background-color: var(--btn-default);

        &:hover {
          background-color: var(--btn-default-hover);
        }
      }
    }
  }
}
</style>
