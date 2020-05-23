<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header pt-0 pb-0 border-bottom-0">
          <ul class="account-tab list-unstyled d-flex m-0">
            <li @click="tabToggle" :class="{ active: tabShow }">
              <i class="fas fa-user"></i>
              <span class="ml-2">Account</span>
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
                <h3 class="account-name">
                  <span class="font-weight-bold mr-2">{{
                    user.firstName
                  }}</span>
                  <span class="font-weight-normal">{{ user.lastName }}</span>
                </h3>
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
                    <label for="firstName">First name</label>
                    <input
                      v-model="user.firstName"
                      @input="$v.user.firstName.$touch()"
                      id="firstName"
                      class="form-control"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                    />
                    <div v-if="$v.user.firstName.$error">
                      <span
                        v-if="!$v.user.firstName.required"
                        class="text-danger"
                      >
                        First name is required
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="status">Status</label>
                    <select name="status" id="status" class="form-control">
                      <option value="1">Active</option>
                      <option value="2">Deactivated</option>
                      <option value="3">Blocked</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="lastName">Last name</label>
                    <input
                      v-model="user.lastName"
                      @input="$v.user.lastName.$touch()"
                      id="lastName"
                      class="form-control"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                    />
                    <div v-if="$v.user.lastName.$error">
                      <span
                        v-if="!$v.user.lastName.required"
                        class="text-danger"
                      >
                        Last name is required
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="group">Group</label>
                    <select
                      v-model="user.group"
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
                <div class="form-group row">
                  <div class="col-12">
                    <label for="email">Email</label>
                    <input
                      v-model="user.email"
                      @input="$v.user.email.$touch()"
                      id="email"
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <div v-if="$v.user.email.$error">
                      <span v-if="!$v.user.email.required" class="text-danger">
                        Email is required
                      </span>
                      <span v-if="!$v.user.email.email" class="text-danger">
                        Email is not valid
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="password">Password</label>
                    <input
                      v-model="user.password"
                      @input="$v.user.password.$touch()"
                      id="password"
                      class="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <div v-if="$v.user.password.$error">
                      <span
                        v-if="!$v.user.password.required"
                        class="text-danger"
                      >
                        Password is required
                      </span>
                      <span
                        v-if="!$v.user.password.minLength"
                        class="text-danger"
                      >
                        Password must be 8 characters long
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="passwordConfirm">Password confirm</label>
                    <input
                      v-model="user.passwordConfirm"
                      @input="$v.user.passwordConfirm.$touch()"
                      id="passwordConfirm"
                      class="form-control"
                      type="password"
                      name="passwordConfirm"
                      placeholder="Password confirm"
                    />
                    <div v-if="$v.user.passwordConfirm.$error">
                      <span
                        v-if="!$v.user.passwordConfirm.required"
                        class="text-danger"
                      >
                        Confirm your password
                      </span>
                      <span v-if="!$v.user.password.sameAs" class="text-danger">
                        Password doesn't match
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                class="btn btn-primary"
                @click="createUserAction"
                :disabled="isFormValid"
              >
                Save changes
              </button>
              <button class="btn btn-outline-danger ml-2" @click="resetInput">
                Reset
              </button>
            </div>
          </div>

          <div v-else class="account">
            <div class="account-form">
              <form action="">
                <div class="form-group row">
                  <div class="col-6">
                    <label for="birthday">Birthday</label>
                    <input
                      id="birthday"
                      class="form-control"
                      type="text"
                      name="birthday"
                      placeholder="Birthday"
                    />
                  </div>
                  <div class="col-6">
                    <label for="addressLine">Address line</label>
                    <input
                      id="addressLine"
                      class="form-control"
                      type="text"
                      name="addressLine"
                      placeholder="Address line"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="mobile">Mobile</label>
                    <input
                      id="mobile"
                      class="form-control"
                      type="text"
                      name="mobile"
                      placeholder="Mobile"
                    />
                  </div>
                  <div class="col-6">
                    <label for="city">City</label>
                    <select name="city" id="city" class="form-control">
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">Staff</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label class="d-block" for="">Gender</label>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                      />
                      <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                      />
                      <label class="form-check-label" for="female"
                        >Female</label
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="country">Country</label>
                    <select name="country" id="country" class="form-control">
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                      <option value="3">Staff</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button class="btn btn-primary">
                Save changes
              </button>
              <button class="btn btn-outline-danger ml-2">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'UserCreate',
  computed: {
    ...mapGetters(['getAllGroups']),
    isFormValid() {
      return this.$v.user.$invalid;
    }
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        group: '',
        isActive: true
      },
      tabShow: true
    };
  },
  validations: {
    user: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs('password')
      },
      group: {
        required
      }
    }
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['createUser', 'fetchAllGroups']),
    resetInput() {
      Object.keys(this.user).forEach(key => {
        if (key !== 'isActive') {
          this.user[key] = '';
        }
      });
    },
    createUserAction() {
      this.setShowLoading(true);
      this.createUser(this.user).then(id => {
        this.setShowLoading(false);
        this.$router.push({ name: 'userDetail', params: { id } });
      });
    },
    tabToggle() {
      this.tabShow = !this.tabShow;
    }
  },
  created() {
    this.fetchAllGroups().then(groups => {
      this.user.group = groups[0]._id;
    });
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
