<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="getProduct">
            <figure>
              <img
                class="img-fluid"
                src="./../../assets/img/bg/bg-hd.jpg"
                alt="bg hd"
              />
            </figure>
            <p>
              <span><strong>SKU:</strong></span> {{ getProduct.sku }}
            </p>
            <p>
              <span><strong>Name:</strong></span> {{ getProduct.name }}
            </p>
            <p>
              <span><strong>Price:</strong></span>
              <span class="ml-1 text-success">$ {{ getProduct.price }}</span>
            </p>
            <p>
              <span><strong>Category:</strong></span>
              {{ getProduct.category.name }}
            </p>
            <p>
              <span><strong>Supplier:</strong></span>
              {{ getProduct.supplier.name }}
            </p>
            <p>
              <span><strong>In stock:</strong></span> {{ getProduct.quantity }}
            </p>
            <p class="mb-0">
              <span><strong>Description:</strong></span>
              {{ getProduct.description }}
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  computed: {
    ...mapGetters(['getProduct'])
  },
  methods: {
    ...mapActions(['fetchProduct'])
  },
  created() {
    this.fetchProduct(this.$route.params.id);
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
