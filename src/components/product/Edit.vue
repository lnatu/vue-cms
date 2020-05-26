<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="account">
            <div class="account-top d-flex">
              <img
                class="account-picture"
                src="../../assets/img/avatar5.png"
                alt=""
              />
            </div>
            <div v-if="product">
              <div class="account-form mt-4">
                <form action="">
                  <div class="form-group row">
                    <div class="col-6">
                      <label for="sku">SKU</label>
                      <input
                        id="sku"
                        class="form-control"
                        type="text"
                        name="sku"
                        :value="product.sku"
                        disabled
                      />
                    </div>
                    <div class="col-6">
                      <label for="name">Name</label>
                      <input
                        v-model="product.name"
                        id="name"
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-6">
                      <label for="quantity">Quantity</label>
                      <input
                        v-model="product.quantity"
                        id="quantity"
                        class="form-control"
                        type="number"
                        name="quantity"
                        min="0"
                      />
                    </div>
                    <div class="col-6">
                      <label for="price">Price</label>
                      <input
                        v-model="product.price"
                        id="price"
                        class="form-control"
                        type="number"
                        name="price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-6">
                      <label for="category">Category</label>
                      <select
                        v-model="product.category._id"
                        name="category"
                        id="category"
                        class="form-control"
                      >
                        <option
                          v-for="(category, index) in categories"
                          :key="index"
                          :value="category._id"
                        >
                          {{ category.name.toUpperCase() }}
                        </option>
                      </select>
                    </div>
                    <div class="col-6">
                      <label for="supplier">Supplier</label>
                      <select
                        v-model="product.supplier._id"
                        name="supplier"
                        id="supplier"
                        class="form-control"
                      >
                        <option
                          v-for="supplier in suppliers"
                          :key="supplier._id"
                          :value="supplier._id"
                        >
                          {{ supplier.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-12">
                      <label for="description">Description</label>
                      <textarea
                        v-model="product.description"
                        class="no-resize form-control"
                        name="description"
                        id="description"
                        rows="10"
                        placeholder="Description..."
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div class="save-changes float-right">
                <button
                  @click="updateProductAction(product)"
                  type="button"
                  class="btn btn-primary"
                >
                  Save changes
                </button>
                <button class="btn btn-outline-danger ml-2">Reset</button>
              </div>
            </div>
            <div v-else class="mt-3">
              <h3 class="mb-0">No product found</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProductEdit',
  data() {
    return {
      product: null,
      categories: [],
      suppliers: []
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions([
      'fetchProduct',
      'fetchAllCategories',
      'fetchAllSuppliers',
      'updateProduct'
    ]),
    async showProduct() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchProduct(this.$route.params.id);
        this.product = response.data.data.product;
        this.setShowLoading(false);
      } catch (err) {
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.setShowLoading(false);
      }
    },
    async showCategories() {
      const response = await this.fetchAllCategories();
      this.categories = response.data.data.categories;
    },
    async showSuppliers() {
      const response = await this.fetchAllSuppliers();
      this.suppliers = response.data.data.suppliers;
    },
    async updateProductAction(product) {
      this.setShowLoading(true);
      try {
        const response = await this.updateProduct({ id: product._id, product });
        this.$router.push({
          name: 'productList',
          query: { page: 1, limit: 20 }
        });
      } catch (err) {
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.setShowLoading(false);
      }
    }
  },
  created() {
    this.showCategories();
    this.showSuppliers();
    this.showProduct();
  }
};
</script>

<style scoped></style>
