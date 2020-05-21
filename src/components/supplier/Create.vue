<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header pt-0 pb-0 border-bottom-0">
          <ul class="account-tab list-unstyled d-flex m-0">
            <li @click="tabToggle" :class="{ active: tabShow }">
              <i class="fas fa-user"></i>
              <span class="ml-2">Supplier</span>
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
                <h3 class="account-name">That Name Huh</h3>
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
                      v-model="supplier.name"
                      @input="$v.supplier.name.$touch()"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                    <div v-if="$v.supplier.name.$error">
                      <span
                        v-if="!$v.supplier.name.required"
                        class="text-danger"
                      >
                        Supplier name is required
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="email">Email</label>
                    <input
                      v-model="supplier.email"
                      @input="$v.supplier.email.$touch()"
                      id="email"
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <div v-if="$v.supplier.email.$error">
                      <span
                        v-if="!$v.supplier.email.required"
                        class="text-danger"
                      >
                        Supplier name is required
                      </span>
                      <span v-if="!$v.supplier.email.email" class="text-danger">
                        Email not valid
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <label for="phone">Phone</label>
                    <input
                      v-model="supplier.phone"
                      @input="$v.supplier.phone.$touch()"
                      id="phone"
                      class="form-control"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                    />
                    <div v-if="$v.supplier.phone.$error">
                      <span
                        v-if="!$v.supplier.phone.required"
                        class="text-danger"
                      >
                        Supplier phone is required
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                @click="createSupplierAction"
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
              <button class="btn btn-primary">Save changes</button>
              <button class="btn btn-outline-danger ml-2">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'SupplierCreate',
  computed: {
    isFormValid() {
      return this.$v.supplier.$invalid;
    }
  },
  data() {
    return {
      tabShow: true,
      supplier: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  validations: {
    supplier: {
      name: { required },
      email: {
        required,
        email
      },
      phone: { required }
    }
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['createSupplier']),
    async createSupplierAction() {
      this.setShowLoading(true);
      const id = await this.createSupplier(this.supplier);
      this.$router.push({ name: 'supplierDetail', params: { id } });
    },
    tabToggle() {
      this.tabShow = !this.tabShow;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
