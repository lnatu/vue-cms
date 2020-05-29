<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="purchase">
            <p>
              <span><strong>Purchase ID:</strong> {{ purchase._id }}</span>
            </p>
            <p>
              <span>
                <strong>Created date:</strong>
                {{ new Date(purchase.createdAt).toLocaleDateString() }}
              </span>
            </p>
            <p>
              <span>
                <strong>Created by:</strong>
                <router-link
                  :to="{
                    name: 'userDetail',
                    params: { id: purchase.createdBy._id }
                  }"
                >
                  {{
                    `${purchase.createdBy.firstName} ${purchase.createdBy.lastName}`
                  }}
                </router-link>
              </span>
            </p>
            <p>
              <span><strong>Total:</strong></span>
              <span class="ml-1 text-success text-bold"
                >$ {{ purchase.totalPrice }}</span
              >
            </p>
            <p class="mt-lg-5"><strong>Items</strong></p>
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
                  v-for="(purchase, index) in purchase.purchaseDetail"
                  :key="purchase._id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ purchase.product.sku }}</td>
                  <td>{{ purchase.product.name }}</td>
                  <td>{{ purchase.quantity }}</td>
                  <td>{{ purchase.product.price }}</td>
                  <td>{{ purchase.product.category.name }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'supplierDetail',
                        params: { id: purchase.product.supplier._id }
                      }"
                    >
                      {{ purchase.product.supplier.name }}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h3 class="mb-0">No purchase found 😱</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'PurchaseDetail',
  data() {
    return {
      purchase: null
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchPurchase']),
    async showPurchase() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchPurchase(this.$route.params.id);
        this.purchase = response.data.data.purchase;
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
    this.showPurchase();
  }
};
</script>

<style scoped></style>
