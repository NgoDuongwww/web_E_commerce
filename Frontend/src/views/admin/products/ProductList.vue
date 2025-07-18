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

  <div class="Product-List">
    <div class="Product-List__Top">
      <div class="Top__Left">
        <div class="Left Select-Product">
          <span>Select Product</span>
          <select v-model="get_products_is_visible">
            <option value="" disabled>Select One</option>
            <option value="all">All</option>
            <option value="1">Visible</option>
            <option value="0">Invisible</option>
          </select>
        </div>
        <div class="Left Product-Code">
          <span>Product Code</span>
          <input
            v-model="get_products_by_id"
            type="text"
            placeholder="Product Code"
          />
        </div>
        <div class="Left Date-Time">
          <span>Date Time</span>
          <input v-model="get_products_by_date" type="date" />
        </div>
        <div class="Left Reset-Filters">
          <span></span>
          <button @click="resetFilters" class="reset-button">
            <i class="fas fa-undo-alt"></i> Reset Filters
          </button>
        </div>
      </div>
      <div class="Top__Right">
        <ul>
          <li @click="add_product = true">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span>Add Product</span>
          </li>
          <li><i class="fas fa-upload"></i> <span>Import Product</span></li>
          <li><i class="fas fa-download"></i> <span>Export Product</span></li>
        </ul>
      </div>
    </div>
    <div class="Product-List__Bottom">
      <div class="Product Bottom">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Buy Turn</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Total Ratings</th>
              <th>Total Sold</th>
              <th>Created At</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="14">Đang tải sản phẩm...</td>
            </tr>

            <tr v-else-if="products.length === 0">
              <td colspan="14">Không tìm thấy sản phẩm nào.</td>
            </tr>

            <tr v-for="product in products" :key="product.id">
              <td>
                {{ product.id }}
              </td>
              <td>
                {{ product.name }}
              </td>
              <td class="img">
                <img :src="product.image" alt="" />
              </td>
              <td>
                {{ product.description?.slice(0, 70) }}
                {{ product.description?.length > 70 ? '...' : '' }}
              </td>
              <td>
                {{ product.buyturn }}
              </td>
              <td>
                {{ product.brand_id }}
              </td>
              <td>
                {{ product.category_id }}
              </td>
              <td>
                {{ product.rating }}
              </td>
              <td>
                {{ product.total_ratings }}
              </td>
              <td>
                {{ product.total_sold }}
              </td>
              <td>
                {{ product.created_at?.slice(0, 10) }}
              </td>
              <td>
                <i
                  :class="product.is_visible ? 'fa fa-eye' : 'fa fa-eye-slash'"
                ></i>
              </td>
              <td>
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="Pagination" v-if="total > pageSize">
          <ul>
            <li @click="Previous" :class="{ disabled: current_page === 1 }">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Previous
            </li>
            <li>
              <span> Page {{ current_page }} of {{ total_page }} </span>
            </li>
            <li @click="Next" :class="{ disabled: current_page >= total }">
              <i class="fa fa-arrow-right" aria-hidden="true"></i> Next
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Product-List {
  @include w-100-h-100;
  @include display-flex-column-between;

  .Product-List__Top {
    width: 100%;
    height: 7%;
    @include display-flex-row-between-center;

    .Top__Left {
      width: 40%;
      height: 100%;
      @include display-flex-row-between-center;

      .Left {
        width: 24%;
        height: 100%;
        @include display-flex-column-flexStart;

        span {
          height: 35%;
          font-size: var(--font-size-sm);
        }
      }

      .Select-Product {
        select {
          background: var(--bg-default);
          @include w-100-h-100;
          color: var(--text-default);
          font-size: var(--font-size-sm);
          border: none;
          border-radius: var(--radius-md);
          padding: 0px var(--padding-8);

          &:focus {
            outline: none;
          }
        }
      }

      .Product-Code {
        input {
          background: var(--bg-default);
          @include w-100-h-100;
          color: var(--text-default);
          font-size: var(--font-size-sm);
          border: none;
          border-radius: var(--radius-md);
          padding: 0px var(--padding-8);

          &:focus {
            outline: none;
          }
        }
      }

      .Date-Time {
        input {
          background: var(--bg-default);
          @include w-100-h-100;
          color: var(--text-default);
          font-size: var(--font-size-sm);
          border: none;
          border-radius: var(--radius-md);
          padding: 0px var(--padding-8);

          &:focus {
            outline: none;
          }
        }
      }

      .Reset-Filters {
        .reset-button {
          width: 100%;
          height: 65%;
          border-radius: var(--radius-md);
          padding: 0px var(--padding-8);
          border: none;
          flex: 1;
          background: var(--bg-default);
          cursor: pointer;
          color: var(--text-default);
          font-size: var(--font-size-sm);

          &:hover {
            background-color: var(--bg-page);
          }
        }
      }
    }

    .Top__Right {
      width: 27%;
      height: 80%;

      ul {
        @include w-100-h-100;
        @include display-flex-row-between-center;
        gap: 1rem;
        font-size: var(--font-size-sm);

        li {
          @include display-flex-row-between-center;
          border-radius: var(--radius-md);
          height: 100%;
          width: 100%;
          list-style: none;
          cursor: pointer;
          transition: var(--transition-sm);
          background: var(--btn-primary);
          color: var(--text-active);
          transition: var(--transition-md);

          &:hover {
            color: var(--text-active);
            background: var(--btn-primary-hover);
          }

          i {
            height: 100%;
            width: 25%;
            @include display-flex-center-center;
          }

          span {
            height: 100%;
            flex: 1;
            @include display-flex-left-center;
          }
        }
      }
    }
  }

  .Product-List__Bottom {
    width: 100%;
    height: 92%;
    background: var(--bg-default);
    border-radius: var(--radius-md);

    .Product {
      @include w-100-h-100;
      @include display-flex-column-between-center;

      table {
        table-layout: fixed;
        border-collapse: collapse;

        thead {
          width: 100%;
          height: 5%;

          tr {
            th {
              width: 10%;
              padding: var(--padding-12) var(--padding-16);
              text-align: center;
              font-weight: 600;
              color: var(--table-header-text);
              font-size: var(--font-size-sm);
              border-bottom: 1px solid var(--table-border);
            }
          }
        }

        tbody {
          @include w-100-h-100;

          tr {
            height: 48px !important;
            border-bottom: 1px solid var(--table-border);
            table-layout: fixed;

            &:hover {
              background-color: var(--table-row-hover);
            }

            td {
              text-overflow: ellipsis;
              vertical-align: middle;
              text-align: center;
              padding: var(--padding-4) var(--padding-8);
              font-size: var(--font-size-sm);
              color: var(--table-text);
              line-height: 1;

              &:last-child {
                i {
                  cursor: pointer;
                  color: var(--table-icon);
                  transition: var(--transition-sm);

                  &:hover {
                    color: var(--table-icon-hover);
                  }
                }
              }
            }

            .img {
              @include display-flex-center-center;

              img {
                width: 75%;
              }
            }
          }
        }
      }

      .Pagination {
        width: 100%;
        height: 5%;
        @include display-flex-jus-center;

        ul {
          @include display-flex-ali-center;
          gap: 24px;
          font-size: var(--font-size-sm);

          li {
            cursor: pointer;
            transition: var(--transition-sm);

            &:hover {
              color: var(--btn-primary-hover);
            }
          }

          .disabled {
            cursor: default;
            color: var(--text-default);

            &:hover {
              color: var(--text-default);
            }
          }
        }
      }
    }
  }
}
</style>
