<template>
  <div class="row">
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list clearfix">
          <div class="form-group w-25 float-left">
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
          <div class="form-group w-25 float-left ml-3">
            <button type="button" class="btn btn-primary">Search</button>
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!categories">
              <td colspan="3"><h3 class="mb-0">No data</h3></td>
            </tr>
            <tr v-else v-for="(category, index) in categories" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ category.name }}</td>
              <td>
                <a class="text-danger" href="#">
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'categoryEdit', params: { id: category._id } }"
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
                name: 'categoryList',
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
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'CategoryList',
  data() {
    return {
      categories: null,
      pages: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchAllCategories']),
    async showCategories() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchAllCategories(this.$route.query);
        this.categories = response.data.data.categories;
        this.pages = Math.ceil(
          response.data.pages / parseInt(this.$route.query.limit)
        );
        this.setShowLoading(false);
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
    this.showCategories();
  },
  watch: {
    $route() {
      this.showCategories();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
