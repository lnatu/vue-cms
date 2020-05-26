<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="product">
            <figure>
              <img
                class="img-fluid"
                src="./../../assets/img/bg/bg-hd.jpg"
                alt="bg hd"
              />
            </figure>
            <p>
              <span><strong>SKU:</strong></span> {{ product.sku }}
            </p>
            <p>
              <span><strong>Name:</strong></span> {{ product.name }}
            </p>
            <p>
              <span><strong>Price:</strong></span>
              <span class="ml-1 text-success">$ {{ product.price }}</span>
            </p>
            <p>
              <span><strong>Category:</strong></span>
              {{ product.category.name }}
            </p>
            <p>
              <span><strong>Supplier:</strong></span>
              {{ product.supplier.name }}
            </p>
            <p>
              <span><strong>In stock:</strong></span> {{ product.quantity }}
            </p>
            <p class="mb-0">
              <span><strong>Description:</strong></span>
              {{ product.description }}
            </p>
          </div>
          <div v-else>
            <h3 class="text-danger mb-0">No product found 😤</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchProduct']),
    async showProduct() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchProduct(this.$route.params.id);
        this.product = response.data.data.product;
        this.setShowLoading(false);
      } catch (err) {
        this.$toasted.show(err.response.data.message, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.setShowLoading(false);
      }
    }
  },
  created() {
    this.showProduct();
  }
};
</script>

<style scoped>
p {
  font-size: 18px;
}

p span {
  font-size: 22px;
}
</style>
