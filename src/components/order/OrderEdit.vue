<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">Edit order 🤭</h2>
        </div>
        <div v-if="order" class="card-body">
          <div class="row">
            <div class="col-6">
              <label for="createdBy">Created by</label>
              <input
                id="createdBy"
                class="form-control"
                name="createdBy"
                type="text"
                :value="
                  `${order.createdBy.firstName} ${order.createdBy.lastName}`
                "
                readonly
              />
            </div>
            <div class="col-6">
              <label for="customer">Customer</label>
              <select
                v-model="order.customer._id"
                name="customer"
                id="customer"
                class="form-control"
              >
                <option
                  v-for="customer in customers"
                  :key="customer._id"
                  :value="customer._id"
                >
                  {{ `${customer.firstName} ${customer.lastName}` }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <label for="shipDate">Ship date</label>
              <input
                v-model="order.shipDate"
                id="shipDate"
                class="form-control"
                name="shipDate"
                type="date"
              />
            </div>
            <div class="col-6">
              <label for="status">Status</label>
              <select
                v-model="order.status"
                name="status"
                id="status"
                class="form-control"
              >
                <option value="order success"> Order Success</option>
                <option value="packing">Packing</option>
                <option value="on delivery">On Delivery</option>
                <option value="delivery successful">
                  Delivery Successful
                </option>
              </select>
            </div>
            <div class="col-12">
              <h3 class="text-danger mt-3">Ordered item</h3>
              <ul class="list-group mb-3">
                <li
                  v-for="item in orderDetailArr"
                  :key="item._id"
                  class="list-group-item"
                >
                  <span class="text-bold" style="font-size: 22px;">
                    {{ item.product.name }}
                  </span>
                  <span class="ml-2 mr-2">x</span>
                  <span>{{ item.quantity }}</span>
                  <span class="ml-2 mr-2">x</span>
                  <span class="text-success text-bold">
                    $ {{ item.product.price }}
                  </span>
                  <span
                    @click="removeOrderDetailItem(item._id)"
                    class="badge badge-danger float-right"
                    style="font-size: 18px; cursor: pointer;"
                  >
                    <i class="fas fa-trash-alt" />
                  </span>
                </li>
              </ul>
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
                        @click="
                          addOrderDetailItem({ item: product, quantity: 1 })
                        "
                        type="button"
                        :disabled="0 >= product.quantity"
                        class="btn btn-success"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="cta mt-3 float-right">
                <button
                  @click="updateOrderAction"
                  type="button"
                  class="btn btn-info"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-body">
          <h3 class="mb-0 text-danger">Order not found 🤕</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'OrderEdit',
  data() {
    return {
      order: null,
      products: null,
      customers: null,
      orderDetailArr: null,
      orderDetail: {},
      currentLength: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions([
      'fetchAllProducts',
      'fetchOrder',
      'fetchCustomers',
      'updateOrder',
      'createOrderDetail',
      'updateOrderDetail',
      'updateProductQuantity'
    ]),
    removeOrderDetailItem(id) {
      this.orderDetailArr.forEach(async (item, index, array) => {
        if (item._id === id) {
          array.splice(index, 1);
          await this.updateProductQuantity({
            id: item.product._id,
            quantity: item.quantity
          });
        }
      });

      this.order.orderDetail.forEach((item, index, array) => {
        if (item._id === id) {
          array.splice(index, 1);
        }
      });
    },
    addOrderDetailItem({ item, quantity }) {
      const filter = this.orderDetailArr.filter(
        order => order.product._id === item._id
      );
      if (filter.length > 0) {
        this.orderDetailArr.forEach(order => {
          if (order.product._id === item._id) {
            order.quantity += 1;
            if (!order.addedQty) {
              order.addedQty = 0;
            }

            order.addedQty += 1;
          }
        });
      } else {
        this.orderDetailArr.push({
          id: item._id,
          product: item,
          quantity,
          addNew: true,
          addedQty: 1
        });
      }
    },
    async showAllData() {
      this.setShowLoading(true);
      try {
        const response1 = await this.fetchOrder(this.$route.params.id);
        const response2 = await this.fetchAllProducts();
        const response3 = await this.fetchCustomers();
        const responseArr = await Promise.all([
          response1,
          response2,
          response3
        ]);
        this.order = responseArr[0].data.data.order;
        this.products = responseArr[1].data.data.products;
        this.customers = responseArr[2].data.data.customers;
        this.orderDetailArr = [...this.order.orderDetail];
        this.order.shipDate = new Date(
          new Date(this.order.shipDate).getTime() -
            new Date(this.order.shipDate).getTimezoneOffset() * 60000
        )
          .toISOString()
          .split('T')[0];
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
    async updateOrderAction() {
      this.setShowLoading(true);
      try {
        let newOrderDetail = [];
        const updateOrderDetailPromise = this.orderDetailArr.map(async item => {
          if (item.addNew) {
            newOrderDetail.push({
              product: item.product._id,
              quantity: item.quantity
            });
          } else {
            const res = await this.updateOrderDetail({
              id: item._id,
              orderDetail: {
                product: item.product._id,
                quantity: item.quantity
              }
            });

           if (item.addedQty) {
             await this.updateProductQuantity({
               id: item.product._id,
               quantity: -item.addedQty
             });
           }

            return res;
          }
        });

        const newOrderDetailPromises = newOrderDetail.map(async item => {
          if (item.quantity) {
            await this.updateProductQuantity({
              id: item.product,
              quantity: -item.quantity
            });
            return await this.createOrderDetail(item);
          }
        });
        const newOrderDetailResponses = await Promise.all(
          newOrderDetailPromises
        );

        newOrderDetailResponses.forEach(item => {
          this.order.orderDetail.push(item.data.data.orderDetail._id);
        });

        const response = await this.updateOrder({
          id: this.order._id,
          order: this.order
        });

        this.$router.push({
          name: 'orderDetail',
          params: { id: response.data.data.order._id }
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
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
    this.showAllData();
  }
};
</script>

<style scoped></style>
