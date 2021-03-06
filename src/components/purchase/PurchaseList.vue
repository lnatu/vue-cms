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
              <th scope="col">Purchase ID</th>
              <th scope="col">Created by</th>
              <th scope="col">Created date</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!purchases">
              <td colspan="6">No data</td>
            </tr>
            <tr
              v-else
              v-for="(purchase, index) in purchases"
              :key="purchase._id"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ purchase._id }}</td>
              <td>
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
              </td>
              <td>{{ new Date(purchase.createdAt).toLocaleDateString() }}</td>
              <td>
                <span class="text-success text-bold"
                  >$ {{ purchase.totalPrice }}</span
                >
              </td>
              <td>
                <router-link
                  :to="{ name: 'purchaseDetail', params: { id: purchase._id } }"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
                <a
                  @click.prevent="deletePurchaseAction(purchase._id)"
                  class="text-danger ml-4"
                  href="#"
                >
                  <i class="fas fa-recycle"></i>
                </a>
                <router-link
                  class="ml-4 text-warning"
                  :to="{ name: 'purchaseEdit', params: { id: purchase._id } }"
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
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'PurchaseList',
  data() {
    return {
      purchases: null,
      searchString: '',
      pages: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchAllPurchases', 'deletePurchase']),
    async showAllPurchases() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchAllPurchases(this.$route.query);
        this.purchases = response.data.data.purchases;
        this.pages = Math.ceil(
          response.data.pages / parseInt(this.$route.query.limit)
        );
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
    async deletePurchaseAction(id) {
      this.setShowLoading(true);
      try {
        await this.deletePurchase(id);
        this.showAllPurchases();
        this.$toasted.show(`Purchase ${id} has been deleted successfully`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
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
    this.showAllPurchases();
  },
  watch: {
    $route() {
      this.showAllPurchases();
    }
  }
};
</script>

<style scoped></style>
