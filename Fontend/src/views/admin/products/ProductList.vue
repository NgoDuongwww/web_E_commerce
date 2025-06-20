<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/axios.js'
import AddProduct from '@/components/admin/products/add-product.vue'

// Thêm sản phẩm
const add_product = ref(false)

// Danh sách sản phẩm
const products = ref([]) // ➡ Danh sách toàn bộ sản phẩm đang hiển thị (đã lọc)
const current_page = ref(1) // ➡ Trang hiện tại
const total_page = ref(0) // ➡ Tổng số trang
const total = ref(0) // ➡ Tổng số sản phân
const pageSize = 10 // ➡ Số sản phẩm trên 1 trang
const loading = ref(true) // ➡ Loading

const first_products = ref([]) // ➡ Danh sách toàn bộ sản phẩm ban đầu
const get_products_is_visible = ref('') // ➡ Danh sách sản phẩm tìm kiếm
const get_products_by_id = ref('') // ➡ Danh sách sản phân tìm kiếm theo id
const get_products_by_date = ref('') // ➡ Danh sách sản phân tìm kiếm theo ngày tạo

// Lấy danh sách sản phẩm
const getProducts = async () => {
  const res = await api.get(
    `/admin/products`,
    // ↳ Yêu cầu api tới server
    {
      params: {
        // ↳ Tham số tìm kiếm (truyền query parameters)
        page: current_page.value, // "/admin/products?page=1"
      },
    }
  )

  // Sau khi gọi API thành công, cập nhật dữ liệu
  products.value = res.data.products
  current_page.value = res.data.current_page
  total_page.value = res.data.total_page
  total.value = res.data.total
  first_products.value = res.data.products

  loading.value = false
}

// Lọc danh sách sản phẩm dựa trên các tiêu chí tìm kiếm
const filter_products = () => {
  products.value = first_products.value.filter((product) => {
    // ↳ Lọc sản phẩm theo tìm kiếm
    const get_product_by_status =
      get_products_is_visible.value === 'all' ||
      get_products_is_visible.value === '' ||
      product.is_visible ===
        (get_products_is_visible.value === '1' ? true : false)

    // Lọc sản phẩm theo id
    const get_product_by_id =
      get_products_by_id.value === '' ||
      String(product.name).includes(get_products_by_id.value)

    // Lọc sản phẩm theo ngày tạo
    const get_product_by_date =
      get_products_by_date.value === '' ||
      product.created_at?.slice(0, 10).includes(get_products_by_date.value)

    return get_product_by_status && get_product_by_id && get_product_by_date
  })

  total.value = products.value.length
}

// Theo dõi các biến, tự động lọc lại dữ liệu khi thay đổi điều kiện tìm kiếm.
watch(
  [get_products_is_visible, get_products_by_id, get_products_by_date],
  filter_products
)

// Hệ thống reset filters
const resetFilters = () => {
  get_products_is_visible.value = ''
  get_products_by_id.value = ''
  get_products_by_date.value = ''
  current_page.value = 1
  getProducts()
}

// Lùi trang
const Previous = () => {
  if (current_page.value > 1) {
    current_page.value--
    getProducts()
  }
}

// Sang trang
const Next = () => {
  if (current_page.value * pageSize < total.value) {
    current_page.value++
    getProducts()
  }
}

onMounted(getProducts) // ➡ Hook chạy sau khi component render lần đầu.
</script>

<template>
  <AddProduct v-if="add_product" @close="add_product = false" />

  <div class="Product-List w-full h-full flex flex-col justify-between">
    <div
      class="Product-List__Top w-full h-[7%] flex flex-row justify-between items-center"
    >
      <div
        class="Top__Left w-[40%] h-full flex flex-row justify-between items-center"
      >
        <div
          class="Left Select-Product w-[24%] h-full flex flex-col justify-start gap-1"
        >
          <span class="h-[35%] text-sm">Select Product</span>
          <select
            class="w-full h-full text-[var(--text-default)] text-sm rounded-md px-2 bg-[var(--bg-default)] focus:outline-none"
            v-model="get_products_is_visible"
          >
            <option value="" disabled>Select One</option>
            <option value="all">All</option>
            <option value="1">Visible</option>
            <option value="0">Invisible</option>
          </select>
        </div>
        <div
          class="Left Product-Code w-[24%] h-full flex flex-col justify-start gap-1"
        >
          <span class="h-[35%] text-sm">Product Code</span>
          <input
            class="w-full h-full text-[var(--text-default)] text-sm rounded-md px-2 bg-[var(--bg-default)] focus:outline-none"
            v-model="get_products_by_id"
            type="text"
            placeholder="Product Code"
          />
        </div>
        <div
          class="Left Date-Time w-[24%] h-full flex flex-col justify-start gap-1"
        >
          <span class="h-[35%] text-sm">Date Time</span>
          <input
            class="w-full h-full text-[var(--text-default)] text-sm rounded-md px-2 bg-[var(--bg-default)] focus:outline-none"
            v-model="get_products_by_date"
            type="date"
          />
        </div>
        <div
          class="Left Reset-Filters w-[24%] h-full flex flex-col justify-start gap-1"
        >
          <span class="h-[35%] text-sm"></span>
          <button
            @click="resetFilters"
            class="reset-button w-full h-[65%] bg-[var(--bg-default)] rounded-md px-2 cursor-pointer text-[var(--text-default)] text-sm hover:bg-[var(--bg-page)]"
          >
            <i class="fas fa-undo-alt"></i> Reset Filters
          </button>
        </div>
      </div>
      <div class="Top__Right w-[30%] h-full">
        <ul
          class="w-full h-full flex flex-row justify-between items-center gap-4"
        >
          <li
            class="w-1/3 h-full px-3 flex flex-row justify-between items-center rounded-md cursor-pointer transition-[var(--transition-sm)] bg-[var(--btn-primary)] text-[var(--text-active)] hover:bg-[var(--btn-primary-hover)] hover:text-[var(--text-active)]"
            @click="add_product = true"
          >
            <i
              class="fa fa-plus w-1/4 flex justify-center items-center"
              aria-hidden="true"
            ></i>
            <span class="h-full flex justify-start items-center"
              >Add Product</span
            >
          </li>
          <li
            class="w-1/3 h-full px-3 flex flex-row justify-between items-center rounded-md cursor-pointer transition-[var(--transition-sm)] bg-[var(--btn-primary)] text-[var(--text-active)] hover:bg-[var(--btn-primary-hover)] hover:text-[var(--text-active)]"
          >
            <i class="fas fa-upload"></i> <span>Import Product</span>
          </li>
          <li
            class="w-1/3 h-full px-3 flex flex-row justify-between items-center rounded-md cursor-pointer transition-[var(--transition-sm)] bg-[var(--btn-primary)] text-[var(--text-active)] hover:bg-[var(--btn-primary-hover)] hover:text-[var(--text-active)]"
          >
            <i class="fas fa-download"></i> <span>Export Product</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="Product-List__Bottom w-full h-[92%] bg-[var(--bg-default)] rounded-md"
    >
      <div
        class="Product Bottom w-full h-full flex flex-col justify-between items-center"
      >
        <table class="table-fixed border-collapse">
          <thead class="w-full h-[5%]">
            <tr>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Product ID
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Name
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Image
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Description
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Buy Turn
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Brand
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Category
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Rating
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Total Ratings
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Total Sold
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Created At
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Visible
              </th>
              <th
                class="w-[10%] py-3 px-4 text-center font-semibold text-[var(--table-header-text)] text-sm border-b border-[var(--table-border)]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="w-full h-full">
            <tr
              v-if="loading"
              class="h-12 border-b border-[var(--table-border)] table-fixed hover:bg-[var(--table-row-hover)]"
            >
              <td
                colspan="14"
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                Đang tải sản phẩm...
              </td>
            </tr>

            <tr
              v-else-if="products.length === 0"
              class="h-12 border-b border-[var(--table-border)] table-fixed hover:bg-[var(--table-row-hover)]"
            >
              <td
                colspan="14"
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                Không tìm thấy sản phẩm nào.
              </td>
            </tr>

            <tr
              v-for="product in products"
              :key="product.id"
              class="h-12 border-b border-[var(--table-border)] hover:bg-[var(--table-row-hover)]"
            >
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.id }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.name }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none flex justify-center items-center"
              >
                <img :src="product.image" alt="" class="w-[75%]" />
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.description?.slice(0, 60) }}
                {{ product.description?.length > 60 ? '...' : '' }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.buyturn }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.brand_id }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.category_id }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.rating }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.total_ratings }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.total_sold }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                {{ product.created_at?.slice(0, 10) }}
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                <i
                  :class="
                    product.is_visible
                      ? 'fa fa-eye text-green'
                      : 'fa fa-eye-slash text-red'
                  "
                ></i>
              </td>
              <td
                class="text-ellipsis align-middle text-center py-1 px-2 text-sm text-[var(--table-text)] leading-none"
              >
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="Pagination w-full h-[5%] flex justify-center"
          v-if="total > pageSize"
        >
          <ul class="flex items-center gap-6 text-sm">
            <li
              class="flex items-center gap-2 cursor-pointer transition-[var(--transition-sm)] hover:text-[var(--btn-primary-hover)]"
              @click="Previous"
              :class="{ disabled: current_page === 1 }"
            >
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Previous
            </li>
            <li>
              <span> Page {{ current_page }} of {{ total_page }} </span>
            </li>
            <li
              class="flex items-center gap-2 cursor-pointer transition-[var(--transition-sm)] hover:text-[var(--btn-primary-hover)]"
              @click="Next"
              :class="{ disabled: current_page >= total }"
            >
              <i class="fa fa-arrow-right" aria-hidden="true"></i> Next
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
