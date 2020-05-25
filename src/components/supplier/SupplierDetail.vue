<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="getSupplier">
            <figure>
              <img
                class="img-fluid"
                src="./../../assets/img/bg/bg-hd.jpg"
                alt="bg hd"
              />
            </figure>
            <p>
              <span><strong>Name:</strong></span> {{ getSupplier.name }}
            </p>
            <p>
              <span><strong>Email:</strong></span>
              <span class="ml-1 text-primary">{{ getSupplier.email }}</span>
            </p>
            <p>
              <span><strong>Phone:</strong></span>
              {{ getSupplier.phone }}
            </p>
          </div>
          <div v-else>
            <h3 class="text-danger mb-0">No supplier found 😤</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'SupplierDetail',
  computed: {
    ...mapGetters(['getSupplier'])
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setSupplier']),
    ...mapActions(['fetchSupplier']),
    async showSupplier() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchSupplier(this.$route.params.id);
        const supplier = response.data.data.supplier;
        this.setSupplier(supplier);
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
    this.showSupplier();
  }
};
</script>

<style scoped></style>
