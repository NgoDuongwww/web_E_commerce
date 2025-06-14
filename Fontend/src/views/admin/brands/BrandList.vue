<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/api/axios.js'

const brands = ref([])
const current_page = ref(1)
const total_page = ref(0)
const total = ref(0)
const pageSize = 10
const loading = ref(true)

const getBrands = async () => {
  const res = await api.get(
    `/admin/brands`,
    // ↳ Yêu cầu api tới server
    {
      params: {
        // ↳ Tham số tìm kiếm (truyền query parameters)
        page: current_page.value ?? 1, // "/admin/brands?page=1"
      },
    }
  )

  // Sau khi gọi API thông cong, cập nhật dữ liệu
  brands.value = res.data.brands
  current_page.value = res.data.current_page
  total_page.value = res.data.total_page
  total.value = res.data.total
  loading.value = false
}
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
                {{ product.description?.length > 70 ? '...' : '' }}
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
