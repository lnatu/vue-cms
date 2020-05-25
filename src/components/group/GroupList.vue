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
          <div class="form-group w-25 ml-4 float-left">
            <button @click="searchGroup" type="button" class="btn btn-primary">
              Search
            </button>
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Group name</th>
              <th scope="col">Group roles</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllGroups.length <= 0">
              <td colspan="4">No data</td>
            </tr>
            <tr v-else v-for="(group, index) in getAllGroups" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ group.name }}</td>
              <td class="g-roles">
                <span v-for="(role, roleIndex) in group.roles" :key="roleIndex">
                  {{ role }}
                </span>
              </td>
              <td>
                <a
                  @click.prevent="deleteGroupAction(group)"
                  class="text-danger"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'groupEdit', params: { id: group._id } }"
                >
                  <i class="fas fa-user-edit"></i>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'GroupList',
  computed: {
    ...mapGetters(['getAllGroups'])
  },
  data() {
    return {
      searchString: ''
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchAllGroups', 'deleteGroup']),
    async deleteGroupAction(group) {
      this.setShowLoading(true);
      try {
        await this.deleteGroup(group._id);
        this.fetchAllGroups();
        this.$toasted.show(`Group ${group.name} deleted`, {
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
    },
    searchGroup() {
      if (this.searchString) {
        this.$router.push({
          name: 'groupList',
          query: { search: this.searchString }
        });
      }
    }
  },
  created() {
    this.fetchAllGroups({ params: this.$route.query });
  },
  watch: {
    $route() {
      this.fetchAllGroups({ params: this.$route.query });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
.g-roles span + span {
  &::before {
    content: '/';
  }
}
</style>
