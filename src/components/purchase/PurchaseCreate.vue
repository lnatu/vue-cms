<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3 class="mb-0">Create purchase 🤑</h3>
        </div>
        <div class="card-body">
          <div class="account clearfix">
            <div class="account-form">
              <form action="">
                <div class="form-group row">
                  <div class="col-6">
                    <label for="name">Creator</label>
                    <input
                      :value="`${user.firstName} ${user.lastName}`"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      readonly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            v-if="Object.values(purchaseItems).length > 0"
            class="in-purchase mt-4 clearfix"
          >
            <h3>Buying...</h3>
            <ul
              v-for="item in purchaseItems"
              :key="item._id"
              class="list-group"
            >
              <li class="list-group-item">
                <span>{{ item.name }}</span>
                <span class="text-danger text-bold ml-2 mr-2">x</span>
                <span style="font-size: 20px; font-weight: 700;">
                  {{ item.quantity }}
                </span>
                <span class="text-danger text-bold ml-2 mr-2">x</span>
                <span
                  class="text-success"
                  style="font-size: 20px; font-weight: 700;"
                >
                  $ {{ item.price }}
                </span>
                <span
                  @click="removePurchaseItem(item.product)"
                  class="text-danger float-right"
                  style="cursor: pointer; font-size: 25px;"
                >
                  <i class="fas fa-trash-alt" />
                </span>
              </li>
            </ul>
            <h2 class="float-right text-success text-bold mt-3 mb-4">
              Total: $ {{ purchaseTotal }}
            </h2>
          </div>
          <div class="products mt-4">
            <h3 class="mt-4">All products</h3>
            <table class="table table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Name</th>
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
                      @click="addPurchaseItem(product)"
                      type="button"
                      class="btn btn-success"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="save-changes float-right mt-4">
            <button
              @click="createPurchaseDetailAction()"
              class="btn btn-primary"
            >
              Save changes
            </button>
            <button class="btn btn-outline-danger ml-2">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PurchaseCreate',
  computed: {
    ...mapGetters(['getAuthUser'])
  },
  data() {
    return {
      user: '',
      products: null,
      purchaseItems: {},
      purchaseTotal: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions([
      'fetchAllProducts',
      'createPurchasesDetail',
      'createPurchases',
      'updateProductQuantity'
    ]),
    addPurchaseItem(item) {
      if (this.purchaseItems[item._id]) {
        this.purchaseItems[item._id].quantity += 1;
      } else {
        this.$set(this.purchaseItems, item._id, {
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
      this.calcPurchaseTotal();
    },
    removePurchaseItem(id) {
      this.$delete(this.purchaseItems, id);
      this.calcPurchaseTotal();
    },
    calcPurchaseTotal() {
      this.purchaseTotal = 0;
      for (const item in this.purchaseItems) {
        this.purchaseTotal +=
          this.purchaseItems[item].quantity * this.purchaseItems[item].price;
      }
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
    async createPurchaseDetailAction() {
      this.setShowLoading(true);
      try {
        let awaitPurchaseItemCreate = [];
        let createdPurchaseDetail = [];
        for (const item in this.purchaseItems) {
          awaitPurchaseItemCreate.push(
            await this.createPurchasesDetail(this.purchaseItems[item])
          );
        }

        const response = await Promise.all(awaitPurchaseItemCreate);
        response.forEach(res => {
          createdPurchaseDetail.push(res.data.data.purchaseDetail._id);
        });

        if (createdPurchaseDetail.length === 0) {
          this.$toasted.show('Please choose some item', {
            theme: 'bubble',
            position: 'bottom-right',
            duration: 5000
          });
          this.setShowLoading(false);
          return;
        }

        await this.createPurchases({
          createdBy: this.user._id,
          purchaseDetail: createdPurchaseDetail
        });

        for (const id in this.purchaseItems) {
          await this.updateProductQuantity({
            id,
            quantity: this.purchaseItems[id].quantity
          });
        }

        this.setShowLoading(false);
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
    this.user = this.getAuthUser;
    this.showProducts();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
