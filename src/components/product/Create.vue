<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header pt-0 pb-0 border-bottom-0">
          <ul class="account-tab list-unstyled d-flex m-0">
            <li @click="tabToggle" :class="{ active: tabShow }">
              <i class="fas fa-user"></i>
              <span class="ml-2">Product</span>
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
                    <label for="sku">SKU</label>
                    <input
                      v-model="product.sku"
                      @input="$v.product.sku.$touch()"
                      id="sku"
                      class="form-control"
                      type="text"
                      name="sku"
                      disabled
                    />
                    <div v-if="$v.product.sku.$error">
                      <span v-if="!$v.product.sku.required" class="text-danger">
                        SKU is required
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="name">Name</label>
                    <input
                      v-model="product.name"
                      @input="$v.product.name.$touch()"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                    <div v-if="$v.product.name.$error">
                      <span
                        v-if="!$v.product.name.required"
                        class="text-danger"
                      >
                        Product name is required
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="quantity">Quantity</label>
                    <input
                      v-model="product.quantity"
                      @input="$v.product.quantity.$touch()"
                      id="quantity"
                      class="form-control"
                      type="number"
                      name="quantity"
                      min="0"
                    />
                    <div v-if="$v.product.quantity.$error">
                      <span
                        v-if="!$v.product.quantity.required"
                        class="text-danger"
                      >
                        Product quantity is required
                      </span>
                      <span
                        v-if="!$v.product.quantity.minValue"
                        class="text-danger"
                        >Product quantity must be greater than 0
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="price">Price</label>
                    <input
                      v-model="product.price"
                      @input="$v.product.price.$touch()"
                      id="price"
                      class="form-control"
                      type="number"
                      name="price"
                      min="0"
                    />
                    <div v-if="$v.product.price.$error">
                      <span
                        v-if="!$v.product.price.required"
                        class="text-danger"
                      >
                        Product Price is required
                      </span>
                      <span
                        v-if="!$v.product.price.minValue"
                        class="text-danger"
                        >Product quantity must be greater than 0
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="category">Category</label>
                    <select
                      v-model="product.category"
                      @input="$v.product.category.$touch()"
                      name="category"
                      id="category"
                      class="form-control"
                    >
                      <option
                        v-for="category in getAllCategories"
                        :key="category._id"
                        :value="category._id"
                        >{{ category.name.toUpperCase() }}
                      </option>
                    </select>
                    <div v-if="$v.product.category.$error">
                      <span
                        v-if="!$v.product.category.required"
                        class="text-danger"
                      >
                        Product category is required
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <label for="supplier">Supplier</label>
                    <select
                      v-model="product.supplier"
                      @change="$v.product.supplier.$touch()"
                      name="supplier"
                      id="supplier"
                      class="form-control"
                    >
                      <option
                        v-for="supplier in getAllSuppliers"
                        :key="supplier._id"
                        :value="supplier._id"
                        >{{ supplier.name }}
                      </option>
                    </select>
                    <div v-if="$v.product.supplier.$error">
                      <span
                        v-if="!$v.product.supplier.required"
                        class="text-danger"
                      >
                        Product supplier is required
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <label for="description">Description</label>
                    <textarea
                      v-model="product.description"
                      @input="$v.product.description.$touch()"
                      class="no-resize form-control"
                      name="description"
                      id="description"
                      rows="10"
                      placeholder="Description..."
                    />
                    <div v-if="$v.product.description.$error">
                      <span
                        v-if="!$v.product.description.required"
                        class="text-danger"
                      >
                        Product description is required
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                @click="createProductAction"
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
                      <label class="form-check-label" for="female">
                        Female
                      </label>
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
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProductCreate',
  computed: {
    ...mapGetters(['getAllCategories', 'getAllSuppliers']),
    isFormValid() {
      return this.$v.product.$invalid;
    }
  },
  data() {
    return {
      tabShow: true,
      product: {
        sku: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        category: '',
        supplier: ''
      }
    };
  },
  validations: {
    product: {
      sku: {
        required
      },
      name: {
        required
      },
      description: {
        required
      },
      quantity: {
        required,
        minValue: minValue(1)
      },
      price: {
        required,
        minValue: minValue(1)
      },
      category: {
        required
      },
      supplier: {
        required
      }
    }
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setAllCategories', 'setAllSuppliers']),
    ...mapActions(['fetchAllCategories', 'fetchAllSuppliers', 'createProduct']),
    tabToggle() {
      this.tabShow = !this.tabShow;
    },
    generateId() {
      return (
        'SKU-' +
        Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()
      );
    },
    async createProductAction() {
      this.setShowLoading(true);
      try {
        const response = await this.createProduct(this.product);
        const id = response.data.data.product._id;
        this.$router.push({ name: 'productDetail', params: { id } });
      } catch (err) {
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.setShowLoading(false);
      }
    }
  },
  created() {
    this.product.sku = this.generateId();
    this.setShowLoading(true);
    Promise.all([this.fetchAllCategories(), this.fetchAllSuppliers()])
      .then(res => {
        const categories = res[0].data.data.categories;
        const suppliers = res[1].data.data.suppliers;

        this.setAllCategories(categories);
        this.setAllSuppliers(suppliers);

        this.product.category = categories[0]._id;
        this.product.supplier = suppliers[0]._id;

        this.setShowLoading(false);
      })
      .catch(error => {
        console.error(error.response);
      });
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
