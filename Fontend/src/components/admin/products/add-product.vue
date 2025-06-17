<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'

const brands = ref([])
const categories = ref([])

const selected_brand = ref('')
const selected_category = ref('')

api.get('/admin/brands').then((res) => {
  brands.value = res.data.brands
})

api.get('/admin/categories').then((res) => {
  categories.value = res.data.categories
})
</script>

<template>
  <div class="add-product">
    <form class="add-product__form">
      <div class="add-product__form__title">Add new product</div>

      <div class="form-grid">
        <div class="form-column">
          <div class="form-group">
            <label>Name product</label>
            <input type="text" placeholder="Iphone 16 pro max" />
          </div>

          <div class="form-group">
            <label>Image product</label>
            <input type="file" />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea rows="5" placeholder="Iphone 16 pro max..." />
          </div>

          <div class="form-group">
            <label>Brand</label>
            <select v-model="selected_brand">
              <option disabled value="">-- Choose a brand --</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Category</label>
            <select v-model="selected_category">
              <option disabled value="">-- Choose a category --</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-column">
          <div class="form-group">
            <label>Technical specifications</label>
            <div class="attribute-list">
              <div class="attribute-item">
                <input
                  type="text"
                  placeholder="Attribute name (e.g., Display)"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 6.5-inch AMOLED)"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Variant</label>
            <div class="variant-list">
              <div class="variant-item">
                <input type="text" placeholder="Variant name (e.g., RAM)" />
                <input
                  type="text"
                  placeholder="Variant value (e.g., 8GB, 12GB)"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Product version</label>
            <div class="variant-values-list">
              <div class="variant-values-item">
                <input
                  type="text"
                  placeholder="Combination (e.g., 8GB, 128GB)"
                />
                <input type="number" placeholder="Price" />
                <input type="number" placeholder="Original price" />
                <input type="number" placeholder="Stock quantity" />
                <input type="text" placeholder="SKU" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="save">Save</button>
        <button class="cancel" @lick="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-product {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  @include display-flex-center-center;
  z-index: 1000;

  .add-product__form {
    max-width: 800px;
    padding: var(--padding-32);
    background: var(--bg-default);
    border-radius: var(--padding-8);
    box-shadow: var(--shadow-md);
    @include display-flex-column-around;
    gap: 20px;

    .add-product__form__title {
      font-size: var(--font-size-lg);
      color: var(--text-default);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .form-column {
        @include display-flex-column;
        gap: 1.5rem;

        .form-group {
          @include display-flex-column;

          label {
            font-weight: 600;
            margin: 0px 0px var(--margin-12) 0px;
          }

          input,
          select,
          textarea {
            padding: var(--padding-8) var(--padding-12);
            border: 1px solid #ccc;
            border-radius: var(--radius-md);
            font-size: var(--font-size-md);

            &:focus {
              outline: none;
              border-color: var(--btn-primary-bg);
              box-shadow: 0 0 0 1px var(--btn-primary-bg);
            }
          }

          .attribute-item,
          .variant-item,
          .variant-values-item {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            input {
              flex: 1 1 calc(50% - 0.5rem);
            }
          }
        }
      }
    }

    .form-actions {
      @include display-flex-row-between-center;

      button {
        width: 49%;
        padding: var(--padding-16) 0;
        color: white;
        border: none;
        border-radius: var(--radius-md);
        text-transform: uppercase;
      }

      .save {
        background: var(--btn-primary-bg);

        &:hover {
          background: var(--btn-primary-hover);
        }
      }

      .cancel {
        background: var(--btn-primary-default);

        &:hover {
          background: var(--btn-primary-default-hover);
        }
      }
    }
  }
}
</style>
