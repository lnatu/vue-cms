<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header pt-0 pb-0 border-bottom-0">
          <ul class="account-tab list-unstyled d-flex m-0">
            <li @click="tabToggle" :class="{ active: tabShow }">
              <i class="fas fa-user"></i>
              <span class="ml-2">Order</span>
            </li>
            <li @click="tabToggle" :class="{ active: !tabShow }">
              <i class="fas fa-info"></i>
              <span class="ml-2">Shipping detail</span>
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
                    <label for="userName">Creator</label>
                    <input
                      id="userName"
                      class="form-control"
                      type="text"
                      name="userName"
                      :value="creatorName"
                      disabled
                    />
                  </div>
                  <div class="col-6">
                    <label for="status">Customer</label>
                    <select
                      v-model="order.customer"
                      name="status"
                      id="status"
                      class="form-control"
                    >
                      <option
                        v-for="customer in getAllCustomers"
                        :key="customer._id"
                        :value="customer._id"
                      >
                        {{ `${customer.firstName} ${customer.lastName}` }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-6">
                    <label for="name">Ship date</label>
                    <input
                      v-model="order.shipDate"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div
                    v-if="Object.keys(orderDetail).length > 0"
                    class="col-12"
                  >
                    <h3 class="text-danger mt-3">Ordered item</h3>
                    <ul class="list-group mb-3">
                      <li
                        v-for="(order, index) in orderDetail"
                        :key="index"
                        class="list-group-item"
                      >
                        <span class="text-bold" style="font-size: 22px;">
                          {{ order.productName }}
                        </span>
                        <span class="ml-2 mr-2">x</span>
                        <span>{{ order.quantity }}</span>
                        <span class="ml-2 mr-2">x</span>
                        <span class="text-success text-bold"
                          >$ {{ order.productPrice }}</span
                        >
                      </li>
                    </ul>
                    <h3 v-if="total > 0" class="mb-4 float-right">
                      <strong>Total:</strong>
                      <span class="ml-1 text-success">$ {{ total }}</span>
                    </h3>
                  </div>
                  <div class="col-12">
                    <h4>All products</h4>
                    <table class="table table-bordered table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">SKU</th>
                          <th scope="col">Name</th>
                          <th scope="col">In stock</th>
                          <th scope="col">Price</th>
                          <th scope="col">Category</th>
                          <th scope="col">Supplier</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(product, index) in getAllProducts"
                          :key="product._id"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ product.sku }}</td>
                          <td>{{ product.name }}</td>
                          <td>{{ product.quantity }}</td>
                          <td>{{ product.price }}</td>
                          <td>{{ product.category.name }}</td>
                          <td>
                            <router-link
                              :to="{
                                name: 'supplierDetail',
                                params: { id: product.supplier._id }
                              }"
                            >
                              {{ product.supplier.name }}
                            </router-link>
                          </td>
                          <td>
                            <button
                              type="button"
                              @click.prevent="
                                addOrderDetail(
                                  product._id,
                                  product.name,
                                  product.price,
                                  1
                                )
                              "
                              class="btn btn-success"
                            >
                              <i class="fas fa-plus"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                type="button"
                @click.prevent="createOrderDetailAction"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'OrderCreate',
  computed: {
    ...mapGetters(['getAuthUser', 'getAllProducts', 'getAllCustomers'])
  },
  data() {
    return {
      tabShow: true,
      orderDetail: {},
      total: 0,
      creatorName: '',
      order: {
        createdBy: '',
        customer: '',
        orderDetail: [],
        shipDate: ''
      }
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setCustomers']),
    ...mapActions([
      'createOrderDetail',
      'createOrder',
      'fetchAllProducts',
      'fetchCustomers'
    ]),
    addOrderDetail(productId, productName, productPrice, quantity) {
      if (this.orderDetail[productId]) {
        this.orderDetail[productId].quantity += 1;
      } else {
        this.$set(this.orderDetail, productId, {
          productId,
          productName,
          productPrice,
          quantity
        });
      }
      this.calcTotal();
    },
    calcTotal() {
      this.total = 0;
      for (let order in this.orderDetail) {
        this.total +=
          this.orderDetail[order].productPrice *
          this.orderDetail[order].quantity;
      }
    },
    async showCustomers() {
      const response = await this.fetchCustomers();
      const customers = response.data.data.users;
      this.order.customer = customers[0]._id;
      this.setCustomers(customers);
    },
    async createOrderDetailAction() {
      this.setShowLoading(true);
      let orderDetailItem = [];
      for (let order in this.orderDetail) {
        const { productId, quantity } = this.orderDetail[order];
        orderDetailItem.push(
          this.createOrderDetail({ product: productId, quantity })
        );
      }

      try {
        const response = await Promise.all(orderDetailItem);
        response.forEach(item => {
          this.order.orderDetail.push(item.data.data.orderDetail._id);
        });
      } catch (err) {
        console.log(err.response);
      }

      try {
        if (this.order.orderDetail.length === 0) {
          this.setShowLoading(false);
          this.$toasted.show('Please choose some product', {
            theme: 'bubble',
            position: 'bottom-right',
            duration: 5000
          });
        } else {
          const orderResponse = await this.createOrder(this.order);
          const orderId = orderResponse.data.data.order._id;
          this.$router.push({ name: 'orderDetail', params: { id: orderId } });
        }
      } catch (err) {
        this.setShowLoading(false);
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
      }
    },
    tabToggle() {
      this.tabShow = !this.tabShow;
    }
  },
  created() {
    this.showCustomers();
    this.fetchAllProducts();
    this.order.createdBy = this.getAuthUser._id;
    this.creatorName = `${this.getAuthUser.firstName} ${this.getAuthUser.lastName}`;
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
