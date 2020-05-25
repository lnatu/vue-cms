<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="account clearfix">
            <div class="account-top d-flex">
              <img
                style="height: 300px;"
                class="img-fluid account-picture"
                src="../../assets/img/bg/bg.png"
                alt=""
              />
            </div>
            <div class="account-form mt-4">
              <form v-if="supplier" action="">
                <div class="form-group row">
                  <div class="col-6">
                    <label for="name">Name</label>
                    <input
                      v-model="supplier.name"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div class="col-6">
                    <label for="email">Email</label>
                    <input
                      v-model="supplier.email"
                      id="email"
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <label for="phone">Phone</label>
                    <input
                      v-model="supplier.phone"
                      id="phone"
                      class="form-control"
                      type="text"
                      name="phone"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </form>
              <div v-else>
                No supplier found
              </div>
            </div>
            <div class="save-changes float-right">
              <button
                @click="updateSupplierAction(supplier)"
                type="button"
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
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'SupplierEdit',
  computed: {},
  data() {
    return {
      supplier: null
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchSupplier', 'updateSupplier']),
    async showSupplier() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchSupplier(this.$route.params.id);
        this.supplier = response.data.data.supplier;
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
    async updateSupplierAction(supplier) {
      this.setShowLoading(true);
      try {
        const response = await this.updateSupplier({
          id: supplier._id,
          supplier
        });
        this.$toasted.show(`${supplier.name} updated`, {
          theme: 'bubble',
          position: 'bottom-right',
          duration: 5000
        });
        this.$router.push({ name: 'supplierList' });
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
