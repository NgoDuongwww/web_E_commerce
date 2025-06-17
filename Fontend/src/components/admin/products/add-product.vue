<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'

// Danh sách từ API khác
const brands = ref([])
const categories = ref([])

const selected_brand = ref('')
const selected_category = ref('')

// Danh sách name có sẵn từ DB (giả định gọi từ backend nếu cần)
const availableAttributes = ref(['Display', 'Battery', 'Camera'])
const availableVariants = ref(['RAM', 'Storage', 'Color'])

// Dữ liệu động
const attributes = ref([{ name: '', selectedName: '', value: '' }])

const variants = ref([{ name: '', selectedName: '', values: '' }])

const variantValues = ref([
  {
    variant_combination: '',
    price: null,
    old_price: null,
    stock: null,
    sku: [''],
  },
])

// Thêm dòng mới
const addAttribute = () =>
  attributes.value.push({ name: '', selectedName: '', value: '' })

const addVariant = () =>
  variants.value.push({ name: '', selectedName: '', values: '' })

const addVariantValue = () =>
  variantValues.value.push({
    variant_combination: '',
    price: null,
    old_price: null,
    stock: null,
    sku: [''],
  })

// Toggle giữa chọn sẵn và nhập mới cho attributes
const toggleAttributeNameInput = (index) => {
  const attr = attributes.value[index]
  if (attr.name) {
    attr.name = ''
    attr.selectedName = ''
  } else {
    attr.name = attr.selectedName || ''
    attr.selectedName = ''
  }
}

// Toggle giữa chọn sẵn và nhập mới cho variants
const toggleVariantNameInput = (index) => {
  const variant = variants.value[index]
  if (variant.name) {
    variant.name = ''
    variant.selectedName = ''
  } else {
    variant.name = variant.selectedName || ''
    variant.selectedName = ''
  }
}

// Load data từ API
api.get('/admin/brands').then((res) => {
  brands.value = res.data.brands
})

api.get('/admin/categories').then((res) => {
  categories.value = res.data.categories
})
</script>

<template>
  <div class="add-product">
    <div class="add">
      <h2 class="form__title">Add New Product</h2>

      <form class="add-product__form">
        <div class="form__section">
          <label>Product Name</label>
          <input type="text" placeholder="Iphone 16 Pro Max" />
        </div>

        <div class="form__section">
          <label>Product Image</label>
          <input type="file" />
        </div>

        <div class="form__section">
          <label>Description</label>
          <textarea rows="5" placeholder="Iphone 16 Pro Max..." />
        </div>

        <div class="form__section">
          <label>Brand</label>
          <select v-model="selected_brand">
            <option disabled value="">-- Choose a brand --</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>

        <div class="form__section">
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

        <!-- Technical Specifications -->
        <div class="form__section">
          <label>Technical Specifications</label>
          <div v-for="(attr, i) in attributes" :key="i" class="dynamic-group">
            <div>
              <select v-if="!attr.name" v-model="attr.selectedName">
                <option disabled value="">Select attribute name</option>
                <option
                  v-for="option in availableAttributes"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <input
                v-else
                v-model="attr.name"
                type="text"
                placeholder="Enter new attribute name"
              />
              <button type="button" @click="toggleAttributeNameInput(i)">
                📝
              </button>
            </div>
            <input
              v-model="attr.value"
              type="text"
              placeholder="Value (e.g., 6.5-inch AMOLED)"
            />
          </div>
          <button type="button" @click="addAttribute">+ Add Attribute</button>
        </div>

        <!-- Variants -->
        <div class="form__section">
          <label>Variants</label>
          <div v-for="(variant, i) in variants" :key="i" class="dynamic-group">
            <div>
              <select v-if="!variant.name" v-model="variant.selectedName">
                <option disabled value="">Select variant name</option>
                <option
                  v-for="option in availableVariants"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <input
                v-else
                v-model="variant.name"
                type="text"
                placeholder="Enter new variant name"
              />
              <button type="button" @click="toggleVariantNameInput(i)">
                📝
              </button>
            </div>
            <input
              v-model="variant.values"
              type="text"
              placeholder="Values (e.g., 8GB, 12GB)"
            />
          </div>
          <button type="button" @click="addVariant">+ Add Variant</button>
        </div>

        <div class="form__section">
          <label>Product Versions</label>
          <div v-for="(v, i) in variantValues" :key="i" class="dynamic-group">
            <input
              v-model="v.variant_combination"
              type="text"
              placeholder="Combination (e.g., 8GB, 128GB)"
            />
            <input v-model.number="v.price" type="number" placeholder="Price" />
            <input
              v-model.number="v.old_price"
              type="number"
              placeholder="Original price"
            />
            <input
              v-model.number="v.stock"
              type="number"
              placeholder="Stock quantity"
            />
            <div class="form__group">
              <label>SKUs</label>
              <div
                v-for="(skuItem, skuIndex) in v.sku"
                :key="skuIndex"
                class="sku-input-row"
              >
                <input
                  v-model="v.sku[skuIndex]"
                  type="text"
                  placeholder="SKU code"
                />
              </div>
              <button type="button" @click="v.sku.push('')">+ Add SKU</button>
            </div>
          </div>
          <button type="button" @click="addVariantValue">+ Add Version</button>
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
.add-product {
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

    .add-product__form {
      @include display-flex-column;
      gap: 25px;
      max-height: 60vh;
      overflow-y: auto;
      // overflow-x: hidden;

      .form__section {
        @include display-flex-column;
        gap: 5px;

        .dynamic-group {
          @include display-flex-row-between;
          gap: 10px;

          input {
            flex: 1 1 calc(50% - 0.5rem);
            padding: 0.5rem;
            border: 1px solid var(--border-default);
            border-radius: var(--padding-4);
          }
        }

        button {
          align-self: flex-start;
          padding: var(--padding-8) var(--padding-12);
          background-color: var(--btn-primary-default);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;

          &:hover {
            background-color: var(--btn-primary-default-hover);
          }
        }
      }
    }
  }

  .form__actions {
    display: flex;
    gap: 10px;

    .save,
    .cancel {
      flex: 1;
      padding: var(--padding-12) 0;
      color: var(--text-active);
      border: none;
      border-radius: var(--radius-sm);
      text-transform: uppercase;
    }

    .save {
      background-color: var(--btn-primary-bg);

      &:hover {
        background-color: var(--btn-primary-hover);
      }
    }

    .cancel {
      background-color: var(--btn-primary-default);

      &:hover {
        background-color: var(--btn-primary-default-hover);
      }
    }
  }
}
</style>
