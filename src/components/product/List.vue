<template>
  <div class="row">
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list clearfix">
          <div class="form-group w-25 float-left">
            <input
              v-model="searchString"
              type="text"
              class="form-control"
              placeholder="Search..."
            />
          </div>
          <div class="form-group w-25 float-left ml-3">
            <button
              @click="performSearch"
              type="button"
              class="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">SKU</th>
              <th scope="col">Name</th>
              <th scope="col">quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Supplier</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllProducts.length === 0">
              <td colspan="8"><h2 class="mb-0">No data 😤</h2></td>
            </tr>
            <tr v-for="(product, index) in getAllProducts" :key="product._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ product.sku }}</td>
              <td>{{ product.name }}</td>
              <td>
                <span
                  style="font-size: 17px"
                  :class="{
                    'badge badge-danger': 0 >= product.quantity
                  }"
                >
                  {{
                    `${
                      0 >= product.quantity ? 'out of stock' : product.quantity
                    }`
                  }}
                </span>
              </td>
              <td>{{ product.price }}</td>
              <td v-if="product.category">{{ product.category.name }}</td>
              <td v-else>
                <span style="font-size: 16px;" class="badge badge-danger">
                  No category found
                </span>
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'supplierDetail',
                    params: { id: product.supplier._id }
                  }"
                >
                  {{ product.supplier.name }}
                </router-link>
              </td>
              <td>
                <router-link
                  :to="{ name: 'productDetail', params: { id: product._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
                <a
                  @click.prevent="deleteProductAction(product)"
                  class="text-danger ml-4"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'productEdit', params: { id: product._id } }"
                >
                  <i class="fas fa-user-edit"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <nav v-if="pages > 0" aria-label="Page navigation example">
          <ul class="pagination mt-5">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <router-link
              v-for="page in pages"
              :key="page"
              :to="{
                name: 'productList',
                query: {
                  page,
                  limit: $route.query.limit,
                  search: $route.query.search
                }
              }"
              active-class="active"
              exact
              tag="li"
              class="page-item"
            >
              <a class="page-link">{{ page }}</a>
            </router-link>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters(['getAllProducts'])
  },
  data() {
    return {
      searchString: '',
      pages: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setAllProducts']),
    ...mapActions(['fetchAllProducts', 'deleteProduct']),
    performSearch() {
      if (this.searchString) {
        let query = { ...this.$route.query, search: this.searchString };
        this.$router.push({ name: 'productList', query });
      }
    },
    async showAllProducts() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchAllProducts(this.$route.query);
        const products = response.data.data.products;
        this.pages = Math.ceil(
          response.data.pages / parseInt(this.$route.query.limit)
        );
        this.setAllProducts(products);
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
    async deleteProductAction(product) {
      this.setShowLoading(true);
      try {
        await this.deleteProduct(product._id);
        this.$toasted.show(`${product.name} deleted`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.showAllProducts();
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
    this.showAllProducts();
  },
  watch: {
    $route() {
      this.showAllProducts();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
