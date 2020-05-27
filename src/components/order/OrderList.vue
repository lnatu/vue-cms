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
            <tr v-if="!orders">
              <td colspan="9">No data</td>
            </tr>
            <tr v-else v-for="(order, index) in orders" :key="order.id">
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
                <span
                  :class="showStatus(order.status)"
                  style="font-size: 18px;"
                  >{{ order.status }}</span
                >
              </td>
              <td>{{ new Date(order.createdAt).toLocaleDateString() }}</td>
              <td>
                <router-link
                  :to="{ name: 'orderDetail', params: { id: order._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
                <a
                  class="text-danger ml-4"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'orderEdit', params: { id: order._id } }"
                >
                  <i class="fas fa-user-edit"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <nav v-if="pages > 0" aria-label="Page navigation example">
          <ul class="pagination mt-5">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <router-link
              v-for="page in pages"
              :key="page"
              :to="{
                name: 'orderList',
                query: {
                  page,
                  limit: $route.query.limit,
                  search: $route.query.search
                }
              }"
              active-class="active"
              exact
              tag="li"
              class="page-item"
            >
              <a class="page-link">{{ page }}</a>
            </router-link>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'OrderList',
  computed: {
    ...mapGetters(['getAllOrders'])
  },
  data() {
    return {
      orders: null,
      pages: 0,
      status: ['order success', 'packing', 'on delivery', 'delivery successful']
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
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
    },
    async showOrders() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchAllOrders(this.$route.query);
        this.pages = Math.ceil(
          response.data.pages / parseInt(this.$route.query.limit)
        );
        this.orders = response.data.data.orders;
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
    this.showOrders();
  },
  watch: {
    $route() {
      this.showOrders();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
