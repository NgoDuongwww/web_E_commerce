<template>
  <div class="Product-View">
    <div class="Pro Product-View__Top">
      <div class="Product-View__Top__Left">
        <div class="Title">Products</div>
        <div class="Text">An overview of recent data of products.</div>
      </div>
      <div class="Product-View__Top__Right">
        <ul>
          <li>Add Product</li>
          <li>Import Product</li>
          <li>New Product</li>
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
          <input type="text" placeholder="Search" />
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
            <tr>
              <td>1</td>
              <td>Product 1</td>
              <td>Image 1</td>
              <td>Description 1</td>
              <td>Buy Turn 1</td>
              <td>Brand 1</td>
              <td>Category 1</td>
              <td>Rating 1</td>
              <td>Total Ratings 1</td>
              <td>Total Sold 1</td>
              <td>Created At 1</td>
              <td>Visible 1</td>
              <td>
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="Pagination">
          <ul>
            <li>
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Previous
            </li>
            <li>Showing entries 1 to 10 of 100</li>
            <li><i class="fa fa-arrow-right" aria-hidden="true"></i> Next</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.Product-View {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;

  .Pro {
    width: 100%;
    height: 100%;
  }

  .Product-View__Top {
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .Product-View__Top__Left {
      display: flex;
      flex-direction: column;

      .Title {
        font-size: var(--font-size-xxl);
        font-weight: bold;
        margin: 0px 0px var(--margin-4) 0px;
      }
    }

    .Product-View__Top__Right {
      width: 25%;
      border: 1px solid red;

      ul {
        width: 100%;
        height: 100%;
        list-style: none;

        li {
          width: 27%;
          border: 1px solid red;
        }
      }
    }
  }

  .Product-View__Bottom {
    display: flex;
    flex-direction: column;

    .Product-View__Bottom__Top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
