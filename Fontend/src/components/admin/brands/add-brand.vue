<template>
  <div class="add-brand">
    <div class="add">
      <div class="form__title">Add New Brand</div>
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
      <div class="form__actions">
        <button class="save" type="submit">Save</button>
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
  background-color: rgba(0, 0, 0, 0.5);
  @include display-flex-center-center;
  z-index: 1000;

  .add {
    background: var(--bg-default);
    max-width: 1200px;
    padding: var(--padding-24);
    @include display-flex-column;
    gap: 20px;
    border-radius: var(--radius-md);

    .form__title {
      font-size: var(--font-size-xl);
      font-weight: bold;
    }
  }
}
</style>
