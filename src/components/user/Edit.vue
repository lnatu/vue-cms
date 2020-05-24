<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="Object.keys(user).length === 0">
            <h3 class="mb-0">No user found 😁</h3>
          </div>
          <div v-else class="account clearfix">
            <div class="account-top d-flex">
              <img
                class="account-picture"
                src="../../assets/img/avatar5.png"
                alt=""
              />
              <div class="account-action">
                <h3 class="account-name ml-4">
                  <span class="font-weight-bold mr-2">{{
                    user.firstName
                  }}</span>
                  <span class="font-weight-normal">{{ user.lastName }}</span>
                </h3>
                <div class="action ml-4">
                  <button class="btn btn-success">Change avatar</button>
                  <button class="btn btn-outline-danger ml-3">
                    Remove avatar
                  </button>
                </div>
              </div>
            </div>
            <div class="account-form mt-4">
              <form action="">
                <div class="form-group row">
                  <div class="col-6">
                    <label for="firstName">First name</label>
                    <input
                      v-model="user.firstName"
                      id="firstName"
                      class="form-control"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col-6">
                    <label for="lastName">Last name</label>
                    <input
                      v-model="user.lastName"
                      id="lastName"
                      class="form-control"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="email">Email</label>
                    <input
                      v-model="user.email"
                      id="email"
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="col-6">
                    <label for="group">Group</label>
                    <select
                      v-model="user.group._id"
                      name="group"
                      id="group"
                      class="form-control"
                    >
                      <option
                        v-for="group in getAllGroups"
                        :key="group._id"
                        :value="group._id"
                      >
                        {{ group.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                @click="editUserAction(user)"
                type="button"
                class="btn btn-primary"
              >
                Save changes
              </button>
              <button class="btn btn-outline-danger ml-2">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'UserEdit',
  computed: {
    ...mapGetters(['getUser', 'getAllGroups'])
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setUser', 'setUpdatedUserId']),
    ...mapActions(['fetchUser', 'deleteUser', 'fetchAllGroups', 'editUser']),
    async showUser() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchUser(this.$route.params.id);
        const user = response.data.data.user;
        this.setUser(user);
        if (this.getUser) {
          this.user = this.getUser;
        }
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
    async editUserAction(user) {
      this.setShowLoading(true);
      try {
        const response = await this.editUser({ id: user._id, inputs: user });
        this.setUpdatedUserId(response.data.data.user._id);
        this.$router.push({ name: 'userList', query: { page: 1, limit: 20 } });
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
    this.fetchAllGroups();
    this.showUser();
  }
};
</script>

<style scoped></style>
