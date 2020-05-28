<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="account">
            <div class="account-top d-flex">
              <h3>Create category</h3>
            </div>
            <div class="account-form mt-4">
              <form action="">
                <div class="form-group row">
                  <div class="col-6">
                    <label for="name">Name</label>
                    <input
                      v-model="category.name"
                      @input="$v.category.name.$touch()"
                      id="name"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                    <div v-if="$v.category.name.$error">
                      <span
                        v-if="!$v.category.name.required"
                        class="text-danger"
                      >
                        Category name is required
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="save-changes float-right">
              <button
                @click="createCategoryAction(category)"
                type="button"
                class="btn btn-primary"
                :disabled="isFormValid"
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
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'CategoryCreate',
  computed: {
    isFormValid() {
      return this.$v.category.$invalid;
    }
  },
  data() {
    return {
      category: {
        name: ''
      }
    };
  },
  validations: {
    category: {
      name: {
        required
      }
    }
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['createCategory']),
    async createCategoryAction() {
      this.setShowLoading(true);
      try {
        const response = await this.createCategory(this.category);
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
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
