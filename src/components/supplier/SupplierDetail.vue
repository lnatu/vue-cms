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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SupplierDetail',
  computed: {
    ...mapGetters(['getSupplier'])
  },
  methods: {
    ...mapActions(['fetchSupplier'])
  },
  created() {
    this.fetchSupplier(this.$route.params.id);
  }
};
</script>

<style scoped></style>
