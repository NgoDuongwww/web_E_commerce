<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const products = ref([]); // ➡ Danh sách toàn bộ sản phẩm đang hiển thị (đã lọc)
const current_page = ref(1); // ➡ Trang hiện tại
const total_page = ref(0); // ➡ Tổng số trang
const total = ref(0); // ➡ Tổng số sản phân
const pageSize = 10; // ➡ Số sản phẩm trên 1 trang
const loading = ref(true); // ➡ Loading

const first_products = ref([]); // ➡ Danh sách toàn bộ sản phẩm ban đầu
const select = ref(""); // ➡ Danh sách sản phẩm tìm kiếm
const insertCode = ref(""); // ➡ Danh sách sản phân tìm kiếm theo id
const insertDate = ref(""); // ➡ Danh sách sản phân tìm kiếm theo ngày tạo

// Lấy danh sách sản phẩm
const getProducts = async () => {
  const res = await axios.get(
    // ↳ Gọi api từ server
    `${import.meta.env.VITE_API_URL}/admin/products?page=${current_page.value}`
    // ↳ import.meta.env.VITE_API_URL: Lấy url api từ file .env
  );

  // Nhận dữ liệu từ server
  products.value = res.data.products ?? [];
  current_page.value = res.data.current_page ?? 1;
  total_page.value = res.data.total_pages ?? 1;
  total.value = res.data.total ?? 0;
  loading.value = false;

  first_products.value = res.data.products ?? [];
};

// Lọc danh sách sản phẩm dựa trên các tiêu chí tìm kiếm
const filter_products = () => {
  products.value = first_products.value.filter((product) => {
    // ↳ Lọc sản phẩm theo tìm kiếm
    const selectProduct =
      select.value === "all" ||
      select.value === "" ||
      product.is_visible === (select.value === "1" ? true : false);

    // Lọc sản phẩm theo id
    const insertProduct =
      insertCode.value === "" || String(product.id).includes(insertCode.value);

    // Lọc sản phẩm theo ngày tạo
    const dateProduct =
      insertDate.value === "" ||
      product.created_at?.slice(0, 10).includes(insertDate.value);

    return selectProduct && insertProduct && dateProduct;
  });
};

// Theo dõi các biến, tự động lọc lại dữ liệu khi thay đổi điều kiện tìm kiếm.
watch([select, insertCode, insertDate], filter_products);

// Lùi trang hiện tại
const Previous = () => {
  if (current_page.value > 1) {
    current_page.value--;
    getProducts();
  }
};

// Sang trang hiện tại
const Next = () => {
  if (current_page.value * pageSize < total.value) {
    current_page.value++;
    getProducts();
  }
};

onMounted(getProducts); // ➡ Hook chạy sau khi component render lần đầu.
</script>

<template>
  <div class="Product-List">
    <div class="Product-List__Top">
      <div class="Top__Left">
        <div class="Left Select-Product">
          <span>Select Product</span>
          <select v-model="select">
            <option value="" disabled selected>Select One</option>
            <option value="all">All</option>
            <option value="1">Visible</option>
            <option value="0">Invisible</option>
          </select>
        </div>
        <div class="Left Product-Code">
          <span>Product Code</span>
          <input v-model="insertCode" type="text" placeholder="Product Code" />
        </div>
        <div class="Left Date-Time">
          <span>Date Time</span>
          <input v-model="insertDate" type="date" />
        </div>
      </div>
      <div class="Top__Right">
        <ul>
          <li>
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
              <td>{{ product.id }}</td>
              <td>
                {{ product.name }}
              </td>
              <td>
                {{ product.image }}
              </td>
              <td>
                {{ product.description?.slice(0, 70) }}
                {{ product.description?.length > 70 ? "..." : "" }}
              </td>
              <td>{{ product.buyturn }}</td>
              <td>{{ product.brand_id }}</td>
              <td>{{ product.category_id }}</td>
              <td>{{ product.rating }}</td>
              <td>{{ product.total_ratings }}</td>
              <td>{{ product.total_sold }}</td>
              <td>{{ product.created_at }}</td>
              <td>
                <i
                  :class="
                    product.is_visible
                      ? 'fa fa-eye text-green'
                      : 'fa fa-eye-slash text-red'
                  "
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
              <span>
                Page {{ current_page }} of {{ Math.ceil(total / pageSize) }}
              </span>
            </li>
            <li
              @click="Next"
              :class="{ disabled: current_page * pageSize >= total }"
            >
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
        width: 30%;
        height: 100%;
        @include display-flex-column-flexStart;

        span {
          height: 35%;
          font-size: var(--font-size-sm);
        }
      }

      .Select-Product {
        select {
          color: var(--text-default);
          font-size: var(--font-size-sm);
          width: 100%;
          flex: 1;
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
          color: var(--text-default);
          font-size: var(--font-size-sm);
          width: 100%;
          flex: 1;
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
          color: var(--text-default);
          font-size: var(--font-size-sm);
          width: 100%;
          flex: 1;
          border: none;
          border-radius: var(--radius-md);
          padding: 0px var(--padding-8);

          &:focus {
            outline: none;
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
          background: var(--btn-primary-bg);
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
    border-radius: var(--radius-md);
    background: var(--bg-default);
    width: 100%;
    height: 92%;

    .Bottom {
      @include w-100-h-100;
      @include display-flex-column-between-center;

      table {
        table-layout: fixed;
        border-collapse: collapse;

        thead {
          width: 100%;
          height: 5%;
          table-layout: fixed;

          th {
            width: 10%;
            padding: var(--padding-12) var(--padding-16);
            text-align: center;
            font-weight: 600;
            color: var(--table-header-text);
            font-size: 14px;
            border-bottom: 1px solid var(--table-border-color);
          }
        }

        tbody {
          width: 100%;
          height: auto;

          tr {
            height: 48px !important;
            border-bottom: 1px solid var(--table-border-color);
            table-layout: fixed;

            &:hover {
              background-color: var(--table-row-hover);
            }

            td {
              text-overflow: ellipsis;
              vertical-align: middle;
              height: 48px !important;
              text-align: center;
              padding: var(--padding-4) var(--padding-8);
              font-size: var(--font-size-sm);
              color: var(--table-text);
              line-height: 1;

              &:last-child {
                i {
                  cursor: pointer;
                  color: var(--table-icon-color);
                  transition: var(--transition-sm);

                  &:hover {
                    color: var(--table-icon-hover);
                  }
                }
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
          gap: 1.5rem;
          font-size: var(--font-size-sm);
        }

        li {
          @include display-flex-ali-center;
          gap: 0.4rem;
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
</style>
