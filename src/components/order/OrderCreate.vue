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
                    <label for="customer">Customer</label>
                    <select
                      v-model="order.customer"
                      name="customer"
                      id="customer"
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
                      type="date"
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
                        <span class="text-success text-bold">
                          $ {{ order.productPrice }}
                        </span>
                        <span
                          @click="removeOrderDetail(order.productId)"
                          class="badge badge-danger float-right"
                          style="font-size: 18px; cursor: pointer;"
                        >
                          <i class="fas fa-trash-alt" />
                        </span>
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
                        <tr v-if="!products">
                          <td colspan="8">No data</td>
                        </tr>
                        <tr
                          v-else
                          v-for="(product, index) in products"
                          :key="product._id"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ product.sku }}</td>
                          <td>{{ product.name }}</td>
                          <td>
                            <span
                              style="font-size: 17px"
                              :class="{
                                'badge badge-danger': 0 >= product.quantity
                              }"
                            >
                              {{
                                `${
                                  0 >= product.quantity
                                    ? 'out of stock'
                                    : product.quantity
                                }`
                              }}
                            </span>
                          </td>
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
                              :disabled="0 >= product.quantity"
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
              <button @click="resetOrder" class="btn btn-outline-danger ml-2">
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
  name: 'OrderCreate',
  computed: {
    ...mapGetters([
      'getAuthUser',
      'getAllProducts',
      'getAllUsers',
      'getAllCustomers'
    ])
  },
  data() {
    return {
      tabShow: true,
      products: null,
      orderDetail: {},
      total: 0,
      creatorName: '',
      orderQuantity: [],
      order: {
        createdBy: '',
        customer: '',
        orderDetail: [],
        shipDate: ''
      }
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setCustomers', 'setAllUsers']),
    ...mapActions([
      'createOrderDetail',
      'createOrder',
      'fetchAllProducts',
      'fetchCustomers',
      'fetchUsers',
      'updateProductQuantity'
    ]),
    resetOrder() {
      this.orderDetail = {};
    },
    removeOrderDetail(id) {
      this.$delete(this.orderDetail, id);
      this.calcTotal();
    },
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
      const customers = response.data.data.customers;
      this.order.customer = customers[0]._id;
      this.setCustomers(customers);
    },
    async showProducts() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchAllProducts();
        this.products = response.data.data.products;
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
    async createOrderDetailAction() {
      this.setShowLoading(true);
      try {
        let orderDetailItem = [];
        for (let order in this.orderDetail) {
          const { productId, quantity } = this.orderDetail[order];
          orderDetailItem.push(
            this.createOrderDetail({ product: productId, quantity })
          );
          this.orderQuantity.push({ product: productId, quantity });
        }

        const response = await Promise.all(orderDetailItem);
        response.forEach(item => {
          this.order.orderDetail.push(item.data.data.orderDetail._id);
        });
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
          const awaitQuantity = this.orderQuantity.map(
            async item =>
              await this.updateProductQuantity({
                id: item.product,
                quantity: -item.quantity
              })
          );
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
    this.showProducts();
    this.order.createdBy = this.getAuthUser._id;
    this.creatorName = `${this.getAuthUser.firstName} ${this.getAuthUser.lastName}`;
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
