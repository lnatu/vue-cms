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
          <div class="form-group w-25 ml-3 float-left">
            <button
              @click="searchSupplier"
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
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllSuppliers.length === 0">
              <td colspan="5">No data</td>
            </tr>
            <tr
              v-else
              v-for="(supplier, index) in getAllSuppliers"
              :key="supplier._id"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.email }}</td>
              <td>{{ supplier.phone }}</td>
              <td>
                <router-link
                  :to="{ name: 'supplierDetail', params: { id: supplier._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
                <a
                  @click.prevent="deleteSupplierAction(supplier)"
                  class="text-danger ml-4"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'supplierEdit', params: { id: supplier._id } }"
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
                name: 'supplierList',
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
  name: 'SupplierList',
  computed: {
    ...mapGetters(['getAllSuppliers'])
  },
  data() {
    return {
      searchString: '',
      pages: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setAllSuppliers']),
    ...mapActions(['fetchAllSuppliers', 'deleteSupplier']),
    async showSuppliers() {
      try {
        const query = this.$route.query;
        this.setShowLoading(true);
        const response = await this.fetchAllSuppliers(this.$route.query);
        const suppliers = response.data.data.suppliers;
        this.pages = Math.ceil(response.data.pages / parseInt(query.limit));
        this.setAllSuppliers(suppliers);
        this.setShowLoading(false);
      } catch (err) {
        this.setShowLoading(false);
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
      }
    },
    searchSupplier() {
      if (this.searchString) {
        const query = { ...this.$route.query, search: this.searchString };
        this.$router.push({
          name: 'supplierList',
          query
        });
      }
    },
    async deleteSupplierAction(supplier) {
      this.setShowLoading(true);
      try {
        await this.deleteSupplier(supplier._id);
        this.showSuppliers();
        this.$toasted.show(`${supplier.name} deleted`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
      } catch (err) {
        this.setShowLoading(false);
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
      }
    }
  },
  created() {
    this.showSuppliers();
  },
  watch: {
    $route() {
      this.showSuppliers();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
