<template>
  <div
    class="add-brand fixed inset-0 bg-opacity-50 flex items-center justify-center z-[1000]"
  >
    <div class="add max-w-[1200px] gap-20 flex flex-col rounded-lg">
      <div class="form__title text-2xl font-bold">Add New Brand</div>
      <form class="form__add-brand">
        <div class="form__section">
          <label>Brand ID</label>
          <input type="text" placeholder="Iphone" />
        </div>
        <div class="form__section">
          <label>Brand Name</label>
          <input type="text" placeholder="Iphone" />
        </div>
        <div class="form__section">
          <label>Brand Image</label>
          <input type="file" />
          <div class="preview__image">
            <img src="" alt="" />
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
  background-color: rgba(0, 0, 0, 0.5);

  .add {
    background: var(--bg-default);
    padding: var(--padding-24);

    .form__actions {
      color: var(--text-active);

      .save {
        background-color: var(--btn-primary);
      }

      .cancel {
        background-color: var(--btn-default);
      }
    }
  }
}
</style>
