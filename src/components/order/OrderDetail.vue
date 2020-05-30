<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="order">
            <p>
              <span><strong>Order ID:</strong></span> {{ order._id }}
            </p>
            <p>
              <span><strong>Created date:</strong></span>
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </p>
            <p>
              <span><strong>Created by:</strong></span>
              {{ `${order.createdBy.firstName} ${order.createdBy.lastName}` }}
            </p>
            <p>
              <span><strong>Ship date:</strong></span>
              {{ new Date(order.shipDate).toLocaleDateString() }}
            </p>
            <p>
              <span><strong>Status:</strong></span>
              <span :class="showStatus(order.status)" class="ml-1 text-capitalize">{{ order.status }}</span>
            </p>
            <p>
              <span><strong>Customer:</strong></span>
              {{ `${order.customer.firstName} ${order.customer.lastName}` }}
            </p>
            <p>
              <span><strong>Total:</strong></span>
              <span class="ml-1 text-success">$ {{ order.totalPrice }}</span>
            </p>
            <p><strong>Items</strong></p>
            <table class="table table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Supplier</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(orderDetail, index) in order.orderDetail"
                  :key="orderDetail._id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ orderDetail.product.sku }}</td>
                  <td>{{ orderDetail.product.name }}</td>
                  <td>{{ orderDetail.quantity }}</td>
                  <td>{{ orderDetail.product.price }}</td>
                  <td>{{ orderDetail.product.category.name }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'supplierDetail',
                        params: { id: orderDetail.product.supplier._id }
                      }"
                    >
                      {{ orderDetail.product.supplier.name }}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h3 class="mb-0">No order found 😱</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'OrderDetail',
  data() {
    return {
      order: null,
      status: ['order success', 'packing', 'on delivery', 'delivery successful']
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchOrder']),
    showStatus(status) {
      let statusCode = '';
      switch (status) {
        case 'order success':
          statusCode = 'badge badge-primary';
          break;
        case 'packing':
          statusCode = 'badge badge-warning';
          break;
        case 'on delivery':
          statusCode = 'badge badge-info';
          break;
        case 'delivery successful':
          statusCode = 'badge badge-success';
          break;
        default:
          statusCode = 'badge badge-primary';
      }
      return statusCode;
    },
    async showOrder() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchOrder(this.$route.params.id);
        this.order = response.data.data.order;
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
    this.showOrder();
  }
};
</script>

<style scoped>
p {
  font-size: 18px;
}
p > span {
  font-size: 22px;
}
</style>
