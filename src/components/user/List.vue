<template>
  <div class="row">
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list clearfix">
          <div class="form-group w-25 float-left">
            <input
              v-model="seachString"
              type="text"
              class="form-control"
              placeholder="Search..."
            />
          </div>
          <div class="form-group w-25 float-left ml-3">
            <button @click="searchThat" class="btn btn-primary" type="button">
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
              <th scope="col">Group</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllUsers.length === 0">
              <td colspan="5" class="text-bold">No data</td>
            </tr>
            <tr
              v-else
              v-for="(user, index) in getAllUsers"
              :key="index"
              :class="{ 'bg-dark': getUpdatedUserId === user._id }"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <span class="text-bold">{{ user.firstName }}</span>
                <span class="ml-1">{{ user.lastName }}</span>
              </td>
              <td class="text-primary">{{ user.email }}</td>
              <td>{{ user.group.name }}</td>
              <td>
                <router-link
                  class="text-success"
                  :to="{ name: 'userDetail', params: { id: user._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
                <a
                  @click.prevent="deleteUserAction(user)"
                  class="text-danger ml-4"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'userEdit', params: { id: user._id } }"
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
                name: 'userList',
                query: {
                  page,
                  limit: $route.query.limit,
                  role: $route.query.role
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
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserList',
  data() {
    return {
      pages: 0,
      seachString: '',
      filter: {
        role: 'all'
      }
    };
  },
  computed: {
    ...mapGetters(['getAllUsers', 'getUpdatedUserId'])
  },
  methods: {
    ...mapMutations(['setAllUsers', 'setShowLoading', 'setUpdatedUserId']),
    ...mapActions(['fetchUsers', 'deleteUser']),
    async deleteUserAction(user) {
      this.setShowLoading(true);
      try {
        await this.deleteUser(user._id);
        this.showData();
        this.$toasted.show(`${user.firstName} ${user.lastName} deleted`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
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
    showData() {
      const query = this.$route.query;
      const _this = this;
      this.fetchUsers(query).then(res => {
        this.setAllUsers(res.data.users);
        if (res.results > 0) {
          _this.pages = Math.ceil(res.pages / parseInt(query.limit));
        }
        this.setShowLoading(false);
      });
    },
    searchThat() {
      let query = { ...this.$route.query, search: this.seachString };
      this.$router.push({ name: 'userList', query });
    },
    hideUpdatedId() {
      if (this.getUpdatedUserId) {
        this.$toasted.show('User updated', {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 3000
        });
        setTimeout(() => {
          this.setUpdatedUserId('');
        }, 3000);
      }
    }
  },
  created() {
    this.showData();
    this.hideUpdatedId();
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
tr {
  transition: all 0.3s;
}
</style>
