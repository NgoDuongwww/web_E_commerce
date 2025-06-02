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

const Search = async (event) => {
  const query = event.target.value;
  current_page.value = 1;
  loading.value = true;
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
      params: { page: current_page.value, search: query },
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
        <div class="Title">An overview of recent data of products.</div>
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
  </div>
</template>

<style lang="scss" scoped>
.Product-View {
  @include w-100-h-100;
  @include display-flex-column;

  .Pro {
    width: 100%;
  }

  .Product-View__Top {
    height: 5%;
    @include display-flex-row-between;
    margin: 0px 0px var(--margin-8) 0px;

    .Product-View__Top__Left {
      width: auto;
      @include display-flex-row;

      .Title {
        font-size: var(--font-size-lg);
        font-weight: bold;
      }
    }

    .Product-View__Top__Right {
      width: 25%;

      ul {
        @include w-100-h-100;
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
    height: 95%;
    background-color: var(--bg-default);
    @include display-flex-column-between;
    padding: 0px var(--padding-24) 0px var(--padding-24);
    border-radius: var(--radius-lg);

    .Product-View__Bottom__Top {
      width: 100%;
      height: 6%;
      @include display-flex-row-between-center;

      .Text {
        @include w-auto-h-100;
        @include display-flex-column-jusCenter;

        .Title {
          font-size: var(--font-size-xl);
          font-weight: bold;
        }
      }

      .Search {
        height: 80%;
        width: 13%;
        border: 2px solid var(--border-default);
        @include display-flex-row-evenly-center;
        border-radius: var(--radius-lg);

        .fa {
          width: 12%;
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
      width: 100%;
      height: 93%;

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
}
</style>
