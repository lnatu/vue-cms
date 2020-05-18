<template>
  <div class="row">
    <div class="col-12">
      <div class="card filter-room">
        <div class="card-header filter-room__header">
          <h5 class="mb-0">Filters</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <p class="mb-0 text-filter">Role</p>
              <select
                v-model="filter.role"
                @change="filterRole"
                class="form-control border-dark"
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="manger">Manager</option>
                <option value="staff">Staff</option>
                <option value="user">User</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list">
          <div class="form-group w-25">
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllUsers.length === 0">
              <td colspan="5" class="text-bold">No data</td>
            </tr>
            <tr v-else v-for="(user, index) in getAllUsers" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <span class="text-bold">{{ user.firstName }}</span>
                <span class="ml-1">{{ user.lastName }}</span>
              </td>
              <td class="text-primary">{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <router-link
                  :to="{ name: 'userDetail', params: { id: user._id } }"
                >
                  <i class="fas fa-eye"></i>
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
                name: 'userList',
                query: { page, limit: $route.query.limit }
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
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserList',
  data() {
    return {
      pages: 0,
      filter: {
        role: 'all'
      }
    };
  },
  computed: {
    ...mapGetters(['getAllUsers'])
  },
  methods: {
    ...mapMutations(['setAllUsers', 'setShowLoading']),
    ...mapActions(['fetchUsers']),
    showData() {
      const query = this.$route.query;
      let queryString = '';
      for (let item in query) {
        queryString += `${item}=${query[item]}&`;
      }
      queryString = queryString.substring(0, queryString.length - 1);
      const _this = this;
      this.fetchUsers(queryString).then(res => {
        this.setAllUsers(res.data.users)
        if (res.results > 0) {
          _this.pages = Math.ceil(res.pages / parseInt(query.limit));
        }
        this.setShowLoading(false);
      });
    },
    filterRole() {
      let query = { ...this.$route.query, role: this.filter.role };
      this.$router.push({ name: 'userList', query });
    }
  },
  created() {
    this.showData();
  },
  watch: {
    $route() {
      this.showData();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
