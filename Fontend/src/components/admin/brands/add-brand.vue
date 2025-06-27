<script setup>
import { ref } from 'vue'

const review_image = ref(null)

function upload_image(event) {
  const file = event.target.files[0]
  if (!file) {
    review_image.value = null
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    review_image.value = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="add-brand">
    <div class="add">
      <div class="form__title text-2xl font-bold">Add New Brand</div>
      <form class="form__add-brand flex flex-col gap-3">
        <div class="form__section flex flex-col">
          <label class="">Brand ID</label>
          <input
            type="text"
            class="border py-3 px-5 rounded-md"
            placeholder="ae001"
          />
        </div>
        <div class="form__section flex flex-col">
          <label>Brand Name</label>
          <input
            type="text"
            class="border py-3 px-5 rounded-md"
            placeholder="Apple"
          />
        </div>
        <div class="form__section flex flex-col">
          <label>Brand Image</label>
          <input
            type="file"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            @change="upload_image"
          />

          <div
            v-if="review_image"
            class="mt-4 w-full h-64 rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <img
              :src="review_image"
              alt="Preview"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </form>
      <div class="form__actions w-full flex gap-5 size-12">
        <button class="save w-1/2 rounded-lg" type="submit">
          <i class="far fa-save"></i> Save
        </button>
        <button
          class="cancel w-1/2 rounded-lg"
          type="button"
          @click="$emit('close')"
        >
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

    .form__actions {
      color: var(--text-active);

      .save {
        background-color: var(--btn-primary);

        &:hover {
          background-color: var(--btn-primary-hover);
        }
      }

      .cancel {
        background-color: var(--btn-default);

        &:hover {
          background-color: var(--btn-default-hover);
        }
      }
    }
  }
}
</style>
