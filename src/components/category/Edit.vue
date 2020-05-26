<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="account">
            <div class="account-top d-flex">
              <h2 class="mb-0">Edit category</h2>
            </div>
            <div v-if="category">
              <div class="account-form mt-4">
                <form action="">
                  <div class="form-group row">
                    <div class="col-6">
                      <label for="name">Name</label>
                      <input
                        v-model="category.name"
                        id="name"
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="save-changes float-right">
                <button
                  @click="performUpdateCategory(category)"
                  type="button"
                  class="btn btn-primary"
                >
                  Save changes
                </button>
                <button class="btn btn-outline-danger ml-2">Reset</button>
              </div>
            </div>
            <div v-else>
              No category found
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
  name: 'CategoryEdit',
  data() {
    return {
      category: null
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchCategory', 'updateCategory']),
    async showCategory() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchCategory(this.$route.params.id);
        this.category = response.data.data.category;
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
    async performUpdateCategory(category) {
      this.setShowLoading(true);
      try {
        const response = await this.updateCategory({
          id: category._id,
          category
        });
        this.$router.push({
          name: 'categoryList',
          query: { page: 1, limit: 20 }
        });
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
    this.showCategory();
  }
};
</script>

<style scoped></style>
