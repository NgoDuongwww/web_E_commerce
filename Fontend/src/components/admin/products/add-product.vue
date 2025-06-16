<template>
  <div class="add-product">
    <form class="add-product-form">
      <div class="form-grid">
        <!-- Cột trái -->
        <div class="form-column">
          <!-- Tên sản phẩm -->
          <div class="form-group">
            <label>Tên sản phẩm</label>
            <input type="text" placeholder="Vivo V24 5G" />
          </div>

          <!-- Ảnh -->
          <div class="form-group">
            <label>Ảnh sản phẩm</label>
            <input type="file" />
          </div>

          <!-- Mô tả -->
          <div class="form-group">
            <label>Mô tả</label>
            <textarea rows="5" placeholder="Mô tả sản phẩm..." />
          </div>

          <!-- Thương hiệu -->
          <div class="form-group">
            <label>Thương hiệu</label>
            <select>
              <option disabled selected>-- Chọn thương hiệu --</option>
              <option value="1">Apple</option>
              <option value="2">Samsung</option>
              <option value="3">Xiaomi</option>
              <option value="4">Vivo</option>
            </select>
          </div>

          <!-- Danh mục -->
          <div class="form-group">
            <label>Danh mục</label>
            <select>
              <option disabled selected>-- Chọn danh mục --</option>
              <option value="1">Điện thoại</option>
              <option value="2">Máy tính bảng</option>
            </select>
          </div>
        </div>

        <!-- Cột phải -->
        <div class="form-column">
          <!-- Thuộc tính -->
          <div class="form-group">
            <label>Thuộc tính kỹ thuật</label>
            <div class="attribute-list">
              <div class="attribute-item">
                <input
                  type="text"
                  placeholder="Tên thuộc tính (VD: Màn hình)"
                />
                <input
                  type="text"
                  placeholder="Giá trị (VD: 6.5 inch AMOLED)"
                />
              </div>
            </div>
          </div>

          <!-- Biến thể -->
          <div class="form-group">
            <label>Biến thể</label>
            <div class="variant-list">
              <div class="variant-item">
                <input type="text" placeholder="Tên biến thể (VD: RAM)" />
                <input type="text" placeholder="Giá trị (VD: 8GB, 12GB)" />
              </div>
            </div>
          </div>

          <!-- Giá trị biến thể -->
          <div class="form-group">
            <label>Phiên bản sản phẩm</label>
            <div class="variant-values-list">
              <div class="variant-values-item">
                <input type="text" placeholder="Kết hợp (VD: 8GB,128GB)" />
                <input type="number" placeholder="Giá" />
                <input type="number" placeholder="Giá gốc" />
                <input type="number" placeholder="Tồn kho" />
                <input type="text" placeholder="SKU" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nút submit -->
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .add-product-form {
    max-width: 800px;
    padding: 2rem;
    background: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .form-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;

      label {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      input,
      select,
      textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
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

    .form-actions {
      margin-top: 2rem;
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
