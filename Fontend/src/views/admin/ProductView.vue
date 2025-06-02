<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);
const total = ref(0);
const currentPage = ref(1);
const loading = ref(true);
const perPage = 10;

const getProducts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/products?page=${currentPage.value}`
  );
  products.value = res.data.products ?? [];
  total.value = res.data.total ?? 0;
};

const Previous = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getProducts();
  }
};

const Next = () => {
  if (currentPage.value * perPage < total.value) {
    currentPage.value++;
    getProducts();
  }
};
onMounted(getProducts);

const Search = async (event) => {
  const query = event.target.value;
  currentPage.value = 1;
  loading.value = true;
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      params: { page: currentPage.value, search: query },
    });
    products.value = res.data.products ?? [];
    total.value = res.data.total ?? 0;
  } catch (err) {
    console.log("❌ Lỗi:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="Product-View">
    <div class="Pro Product-View__Top">
      <div class="Product-View__Top__Left">
        <div class="Title">Products</div>
        <div class="Text">An overview of recent data of products.</div>
      </div>
      <div class="Product-View__Top__Right">
        <ul>
          <li><i class="fa fa-plus" aria-hidden="true"></i> Add Product</li>
          <li>
            <i class="fa fa-upload" aria-hidden="true"></i> Import Product
          </li>
          <li>
            New Product <i class="fa fa-angle-down" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="Pro Product-View__Bottom">
      <div class="Product-View__Bottom__Top">
        <div class="Text">
          <div class="Title">All Products</div>
          <div class="Content">Keep track of recent product data.</div>
        </div>
        <div class="Search">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="Tìm kiếm..." @input="Search" />
        </div>
      </div>
      <div class="Product-View__Bottom__Bottom">
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
              <td>{{ product.description }}</td>
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
        <div class="Pagination" v-if="total > perPage">
          <ul>
            <li @click="Previous" :class="{ disabled: currentPage === 1 }">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Previous
            </li>
            <li>
              Showing entries {{ (currentPage - 1) * perPage + 1 }} to
              {{ Math.min(currentPage * perPage, total) }} of {{ total }}
            </li>
            <li
              @click="Next"
              :class="{ disabled: currentPage * perPage >= total }"
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
.Product-View {
  width: 100%;
  height: 100%;
  @include display-flex-column;

  .Pro {
    width: 100%;
  }

  .Product-View__Top {
    @include display-flex-row-between;
    margin: 0px 0px var(--margin-32) 0px;

    .Product-View__Top__Left {
      width: auto;
      @include display-flex-column;

      .Title {
        font-size: var(--font-size-xxl);
        font-weight: bold;
        margin: 0px 0px var(--margin-4) 0px;
      }
    }

    .Product-View__Top__Right {
      width: 25%;

      ul {
        width: 100%;
        height: 100%;
        list-style: none;
        @include display-flex-row-between-center;

        li {
          width: 32%;
          height: 100%;
          cursor: pointer;
          @include display-flex-row-evenly-center;
          border-radius: var(--radius-lg);
          background-color: var(--bg-default);
        }
      }
    }
  }

  .Product-View__Bottom {
    background-color: var(--bg-default);
    @include display-flex-column;
    padding: 0px var(--padding-24) 0px var(--padding-24);
    border-radius: var(--radius-lg);

    .Product-View__Bottom__Top {
      width: 100%;
      height: auto;
      height: var(--height-80);
      @include display-flex-row-between-center;

      .Text {
        width: auto;
        height: 100%;
        @include display-flex-column-jusCenter;

        .Title {
          font-size: var(--font-size-xl);
          font-weight: bold;
        }
      }

      .Search {
        height: 70%;
        width: 14%;
        border: 2px solid var(--border-default);
        @include display-flex-row-evenly-center;
        border-radius: var(--radius-lg);

        .fa {
          width: 15%;
          height: 80%;
          border-radius: var(--radius-xxl);
          @include display-flex-center-center;
          background-color: var(--bg-page);
        }

        input {
          height: 50%;
          border: none;

          &:focus {
            outline: none;
            border-bottom: 1px solid var(--border-default);
          }
        }
      }
    }

    .Product-View__Bottom__Bottom {
      border: 1px solid red;
      width: 100%;

      table {
        height: 100%;
        width: 100%;
        border-collapse: collapse;
        background-color: var(--bg-surface);
        box-shadow: var(--shadow-sm);
        border-radius: var(--radius-md);
        overflow: hidden;

        thead {
          height: auto;
          width: 100%;
          background-color: var(--table-header-bg);

          th {
            text-align: center;
            padding: 12px 16px;
            font-weight: 600;
            color: var(--table-header-text);
            font-size: 14px;
            border-bottom: 1px solid var(--table-border-color);
          }
        }

        tbody {
          width: 100%;
          border: 1px solid red;
          tr {
            border-bottom: 1px solid var(--table-border-color);

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
}
</style>
