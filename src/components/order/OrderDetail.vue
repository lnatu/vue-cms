<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="getOrder">
            <p>
              <span><strong>Order ID:</strong></span> {{ getOrder._id }}
            </p>
            <p>
              <span><strong>Created date:</strong></span>
              {{ new Date(getOrder.createdAt).toLocaleDateString() }}
            </p>
            <p>
              <span><strong>Created by:</strong></span>
              {{
                `${getOrder.createdBy.firstName} ${getOrder.createdBy.lastName}`
              }}
            </p>
            <p>
              <span><strong>Ship date:</strong></span>
              {{ new Date(getOrder.shipDate).toLocaleDateString() }}
            </p>
            <p>
              <span><strong>Customer:</strong></span>
              {{
                `${getOrder.customer.firstName} ${getOrder.customer.lastName}`
              }}
            </p>
            <p>
              <span><strong>Total:</strong></span>
              <span class="ml-1 text-success">$ {{ getOrder.totalPrice }}</span>
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
              <tr v-for="(orderDetail, index) in getOrder.orderDetail" :key="orderDetail._id">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OrderDetail',
  computed: {
    ...mapGetters(['getOrder'])
  },
  methods: {
    ...mapActions(['fetchOrder'])
  },
  created() {
    this.fetchOrder(this.$route.params.id);
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
