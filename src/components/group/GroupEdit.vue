<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <div class="account clearfix">
          <div class="account-top d-flex">
            <img
              class="account-picture"
              src="../../assets/img/avatar5.png"
              alt=""
            />
            <div class="account-action">
              <h3 class="ml-4 account-name">Group avatar</h3>
              <div class="ml-4 action">
                <button class="btn btn-success">Change avatar</button>
                <button class="btn btn-outline-danger ml-3">
                  Remove avatar
                </button>
              </div>
            </div>
          </div>
          <div v-if="group" class="account-form mt-4">
            <form action="">
              <div class="form-group row">
                <div class="col-6">
                  <label for="name">Name</label>
                  <input
                    v-model="group.name"
                    id="name"
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div class="col-6">
                  <label class="d-block" for="name">Role</label>
                  <div class="form-check form-check-inline mt-2">
                    <input
                      v-model="group.roles"
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="admin"
                    />
                    <label class="form-check-label" for="inlineCheckbox1">
                      Admin
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="group.roles"
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="user"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      User
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="group.roles"
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="customer"
                    />
                    <label class="form-check-label" for="inlineCheckbox3">
                      Customer
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="group.roles"
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="staff"
                    />
                    <label class="form-check-label" for="inlineCheckbox4">
                      Staff
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="save-changes float-right">
            <button
              @click="updateGroup(group)"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
            <button class="btn btn-outline-danger ml-2">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'GroupEdit',
  computed: {
    ...mapGetters(['getGroup'])
  },
  data() {
    return {
      group: null
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setGroup']),
    ...mapActions(['fetchGroup', 'editGroup']),
    async showGroup() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchGroup(this.$route.params.id);
        const group = response.data.data.group;
        this.setGroup(group);
        this.group = this.getGroup;
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
    async updateGroup(group) {
      this.setShowLoading(true);
      try {
        const response = await this.editGroup({ id: group._id, group });
        this.$toasted.show(`Group ${group.name} updated`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.$router.push({ name: 'groupList' });
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
    this.showGroup();
  }
};
</script>

<style scoped></style>
