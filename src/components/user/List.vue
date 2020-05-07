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
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="roleFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="roleFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Admin</a>
                  <a class="dropdown-item" href="#">User</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Status</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="statusFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="statusFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Active</a>
                  <a class="dropdown-item" href="#">Deactivated</a>
                  <a class="dropdown-item" href="#">Blocked</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Verified</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="verifyFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="verifyFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Yes</a>
                  <a class="dropdown-item" href="#">No</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Department</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="departmentFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="departmentFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Sales</a>
                  <a class="dropdown-item" href="#">Development</a>
                  <a class="dropdown-item" href="#">Management</a>
                </div>
              </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserList',
  computed: {
    ...mapGetters(['getAllUsers'])
  },
  methods: {
    ...mapActions(['fetchUsers'])
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
