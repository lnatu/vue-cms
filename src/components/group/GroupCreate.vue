<template>
  <div class="col-12">
    <div class="card">
      <div class="card-header pt-0 pb-0 border-bottom-0">
        <ul class="account-tab list-unstyled d-flex m-0">
          <li @click="tabToggle" :class="{ active: tabShow }">
            <i class="fas fa-user"></i>
            <span class="ml-2">Group</span>
          </li>
          <li @click="tabToggle" :class="{ active: !tabShow }">
            <i class="fas fa-info"></i>
            <span class="ml-2">Information</span>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div v-if="tabShow" class="account clearfix">
          <div class="account-top d-flex">
            <img
              class="account-picture"
              src="../../assets/img/avatar5.png"
              alt=""
            />
            <div class="account-action">
              <h3 class="account-name">Group avatar</h3>
              <div class="action">
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
                  <label for="name">Name</label>
                  <input
                    v-model="group.name"
                    @input="$v.group.name.$touch()"
                    id="name"
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                  <div v-if="$v.group.name.$error">
                    <span v-if="!$v.group.name.required" class="text-danger">
                      Group name is required
                    </span>
                  </div>
                </div>
                <div class="col-6">
                  <label class="d-block" for="name">Role</label>
                  <div class="form-check form-check-inline mt-2">
                    <input
                      v-model="group.roles"
                      @change="$v.group.roles.$touch()"
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
                  <div v-if="$v.group.roles.$error">
                    <span v-if="!$v.group.roles.required" class="text-danger">
                      Roles is required
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="save-changes float-right">
            <button
              @click="createGroupAction"
              :disabled="isFormValid"
              class="btn btn-primary"
            >
              Save changes
            </button>
            <button class="btn btn-outline-danger ml-2">Reset</button>
          </div>
        </div>

        <div v-else class="account">
          <div class="account-form">
            <form action="">
              <div class="form-group row">
                <div class="col-12">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    class="form-control no-resize"
                    type="text"
                    name="description"
                    placeholder="Group description"
                    rows="7"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="save-changes float-right">
            <button class="btn btn-primary">Save changes</button>
            <button class="btn btn-outline-danger ml-2">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'GroupCreate',
  computed: {
    isFormValid() {
      return this.$v.group.$invalid;
    }
  },
  data() {
    return {
      tabShow: true,
      group: {
        name: '',
        roles: []
      }
    };
  },
  validations: {
    group: {
      name: {
        required
      },
      roles: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['createGroup']),
    tabToggle() {
      this.tabShow = !this.tabShow;
    },
    createGroupAction() {
      let roles = [];
      this.group.roles.forEach(name => {
        roles.push(name);
      });
      this.group.roles = roles;
      this.createGroup(this.group);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
