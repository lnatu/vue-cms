<template>
  <div class="row">
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list">
          <div class="form-group w-25">
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order ID</th>
              <th scope="col">Created by</th>
              <th scope="col">Customer</th>
              <th scope="col">Ship date</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Created date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="getAllOrders.length === 0">
              <td colspan="9">No data</td>
            </tr>
            <tr v-else v-for="(order, index) in getAllOrders" :key="order.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ order._id }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'userDetail',
                    params: { id: order.createdBy._id }
                  }"
                >
                  {{
                    `${order.createdBy.firstName} ${order.createdBy.lastName}`
                  }}
                </router-link>
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'userDetail',
                    params: { id: order.customer._id }
                  }"
                >
                  {{ `${order.customer.firstName} ${order.customer.lastName}` }}
                </router-link>
              </td>
              <td>{{ new Date(order.shipDate).toLocaleDateString() }}</td>
              <td class="text-success text-bold">$ {{ order.totalPrice }}</td>
              <td>
                <span :class="showStatus(order.status)" style="font-size: 18px;">{{
                  order.status
                }}</span>
              </td>
              <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
              <td>
                <router-link
                  :to="{ name: 'orderDetail', params: { id: order._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OrderList',
  computed: {
    ...mapGetters(['getAllOrders'])
  },
  data() {
    return {
      status: ['order success', 'packing', 'on delivery', 'delivery successful']
    };
  },
  methods: {
    ...mapActions(['fetchAllOrders']),
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
    }
  },
  created() {
    this.fetchAllOrders();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
