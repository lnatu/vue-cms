<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="purchase">
            <h3 class="mb-4">Edit Purchase 👻</h3>
            <div class="form-group">
              <label for="createdBy">Created by</label>
              <input
                id="createdBy"
                class="form-control"
                name="createdBy"
                type="text"
                readonly
                :value="
                  `${purchase.createdBy.firstName} ${purchase.createdBy.lastName}`
                "
              />
            </div>
            <div class="mt-4 clearfix">
              <ul
                v-for="item in purchaseDetailArr"
                :key="item._id"
                class="list-group"
              >
                <li class="list-group-item">
                  <span>{{ item.product.name }}</span>
                  <span class="text-danger text-bold ml-2 mr-2">x</span>
                  <span style="font-size: 20px; font-weight: 700;">
                    {{ item.quantity }}
                  </span>
                  <span class="text-danger text-bold ml-2 mr-2">x</span>
                  <span
                    class="text-success"
                    style="font-size: 20px; font-weight: 700;"
                  >
                    $ {{ item.product.price }}
                  </span>
                  <span
                    @click="removePurchaseItem(item.product._id)"
                    class="text-danger float-right"
                    style="cursor: pointer; font-size: 25px;"
                  >
                    <i class="fas fa-trash-alt" />
                  </span>
                </li>
              </ul>
              <h2 class="float-right text-success text-bold mt-3">
                Total: $ {{ totalPrice }}
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
                    <td>
                      <span
                        style="font-size: 18px;"
                        :class="{ 'badge badge-danger': product.quantity <= 0 }"
                      >
                        {{ product.name }}
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
                        @click="addPurchaseItem(product)"
                        type="button"
                        class="btn btn-success"
                      >
                        <i class="fas fa-plus" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="clearfix mt-4">
                <button
                  @click="updatePurchaseAction"
                  type="button"
                  class="btn btn-info float-right"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <h3 class="mb-0">No purchase found 😴</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'PurchaseEdit',
  data() {
    return {
      purchase: null,
      purchaseDetailArr: null,
      products: null,
      totalPrice: 0
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions([
      'fetchPurchase',
      'fetchAllProducts',
      'createPurchasesDetail',
      'updatePurchasesDetail',
      'updatePurchase'
    ]),
    async showPurchase() {
      this.setShowLoading(true);
      try {
        const response1 = await this.fetchPurchase(this.$route.params.id);
        const response2 = await this.fetchAllProducts();

        this.purchase = response1.data.data.purchase;
        this.products = response2.data.data.products;
        this.purchaseDetailArr = [...this.purchase.purchaseDetail];
        this.calculateTotal();
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
    },
    async updatePurchaseAction() {
      this.setShowLoading(true);
      try {
        if (this.purchaseDetailArr.length === 0) {
          this.setShowLoading(false);
          this.$toasted.show('Please choose some item', {
            theme: 'bubble',
            position: 'bottom-right',
            duration: 5000
          });
          return;
        }

        let purchaseDetailArr = [];
        let purchaseDetailArr2 = [];
        this.purchaseDetailArr.forEach(item => {
          if (item.create) {
            purchaseDetailArr.push({
              product: item.product._id,
              quantity: item.quantity
            });
          }

          if (item.update) {
            purchaseDetailArr2.push({
              id: item._id,
              purchaseDetail: {
                product: item.product._id,
                quantity: item.quantity
              }
            });
          }
        });

        const promises = purchaseDetailArr.map(async item =>
          this.createPurchasesDetail({
            product: item.product,
            quantity: item.quantity
          })
        );

        const promises2 = purchaseDetailArr2.map(async item => {
          if (item._id) {
            return await this.updatePurchasesDetail(item);
          }
        });

        const responses = await Promise.all(promises);
        responses.forEach(res =>
          this.purchase.purchaseDetail.push({
            _id: res.data.data.purchaseDetail._id
          })
        );

        const res = await this.updatePurchase({
          id: this.purchase._id,
          purchase: this.purchase
        });

        this.$router.push({
          name: 'purchaseDetail',
          params: { id: res.data.data.purchase._id }
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
    },
    removePurchaseItem(id) {
      this.purchase.purchaseDetail.forEach((item, index, arr) => {
        if (id === item.product._id) {
          arr.splice(index, 1);
        }
      });

      this.purchaseDetailArr.forEach((item, index, arr) => {
        if (id === item.product._id) {
          arr.splice(index, 1);
        }
      });

      this.calculateTotal();
    },
    addPurchaseItem(item) {
      let index;
      const itemCheck = this.purchaseDetailArr.filter((purchaseItem, i) => {
        if (purchaseItem.product._id === item._id) {
          index = i;
          return purchaseItem;
        }
      });

      if (itemCheck.length > 0) {
        this.purchaseDetailArr[index].quantity++;
        this.purchaseDetailArr[index].update = true;
      } else {
        this.purchaseDetailArr.push({
          product: item,
          quantity: 1,
          create: true
        });
      }

      this.calculateTotal();
    },
    calculateTotal() {
      this.totalPrice = 0;
      this.purchaseDetailArr.forEach(item => {
        this.totalPrice += item.product.price * item.quantity;
      });
    }
  },
  created() {
    this.showPurchase();
  }
};
</script>

<style scoped></style>
