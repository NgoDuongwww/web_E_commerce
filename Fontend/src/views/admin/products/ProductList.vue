<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);
const current_page = ref(1);
const total_page = ref(0);
const total = ref(0);
const pageSize = 10;
const loading = ref(true);

const getProducts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/products?page=${current_page.value}`
  );
  products.value = res.data.products ?? [];
  current_page.value = res.data.current_page ?? 1;
  total_page.value = res.data.total_pages ?? 1;
  total.value = res.data.total ?? 0;
  loading.value = false;
};

const Previous = () => {
  if (current_page.value > 1) {
    current_page.value--;
    getProducts();
  }
};

const Next = () => {
  if (current_page.value * pageSize < total.value) {
    current_page.value++;
    getProducts();
  }
};
onMounted(getProducts);
</script>

<template>
  <div class="Product-List">
    <div class="Product-List__Top">
      <ul>
        <li><i class="fa fa-plus" aria-hidden="true"></i> Add Product</li>
        <li><i class="fas fa-upload"></i> Import Product</li>
      </ul>
    </div>
    <div class="Product-List__Bottom">
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
            <td>{{ product.name }}</td>
            <td>{{ product.image }}</td>
            <td>
              {{ product.description?.slice(0, 20)
              }}{{ product.description?.length > 20 ? "..." : "" }}
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
</template>

<style lang="scss" scoped>
.Product-List {
  @include w-100-h-100;
  @include display-flex-column-between;

  .Product-List__Top {
    width: 100%;
    height: 6%;
    @include display-flex-row-flexEnd-center;

    ul {
      width: 17%;
      height: 100%;
      @include display-flex-row-between-center;
      gap: 1rem;
      font-size: var(--font-size-sm);

      li {
        @include display-flex-row-center-center;
        border-radius: var(--radius-md);
        height: 100%;
        width: 100%;
        list-style: none;
        cursor: pointer;
        transition: var(--transition-sm);
        background: var(--btn-primary-bg);
        color: var(--text-default);
        transition: var(--transition-md);

        &:hover {
          color: var(--text-default);
          background: var(--btn-primary-hover);
        }

        i {
          height: 100%;
          width: 20%;
          @include display-flex-center-center;
        }
      }
    }
  }

  .Product-List__Bottom {
    width: 100%;
    height: 92%;

    table {
      @include w-100-h-100;
      border-collapse: collapse;
      background-color: var(--bg-surface);
      border-radius: var(--radius-md);

      thead {
        width: 100%;
        height: 10%;
        background-color: var(--table-header-bg);
        table-layout: fixed;

        th {
          width: 3%;
          padding: var(--padding-12) var(--padding-16);
          text-align: center;
          font-weight: 600;
          color: var(--table-header-text);
          font-size: 14px;
          border-bottom: 1px solid var(--table-border-color);
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid var(--table-border-color);
          table-layout: fixed;

          &:hover {
            background-color: var(--table-row-hover);
          }

          td {
            text-align: center;
            padding: var(--padding-12) var(--padding-16);
            font-size: var(--font-size-sm);
            color: var(--table-text);

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
      margin-top: var(--margin-16);
      @include display-flex-jus-center;

      ul {
        @include display-flex-ali-center;
        gap: 1.5rem;
        padding: var(--padding-12) var(--padding-16);
        background-color: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        font-size: var(--font-size-sm);
        color: var(--text-secondary); // #475569
      }

      li {
        @include display-flex-ali-center;
        gap: 0.4rem;
        cursor: pointer;
        transition: var(--transition-sm);

        &:hover {
          color: var(--btn-primary-hover);
        }

        &:nth-child(2) {
          cursor: default;
          color: var(--text-muted);
        }
      }
    }
  }
}
</style>
