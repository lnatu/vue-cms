<template>
  <div class="row">
    <div class="col-12">
      <div v-if="getUser" class="card">
        <div class="card-header">
          <h3 class="mb-0">Account</h3>
        </div>
        <div class="card-body">
          <div class="account">
            <div class="account-left">
              <div class="account-thumbnail">
                <img
                  class="account__avatar"
                  src="../../assets/img/avatar04.png"
                  alt="avatar"
                />
                <div class="account-cta mt-3">
                  <button class="btn btn-success mr-3">
                    <i class="fas fa-pencil-alt"></i>
                    Edit
                  </button>
                  <button
                    class="btn btn-outline-danger"
                    @click="deleteUserAction"
                  >
                    <i class="fas fa-trash-alt"></i>
                    Delete
                  </button>
                </div>
              </div>
              <div class="account-detail">
                <div class="account-detail__row">
                  <p class="account-detail__dn">Name</p>
                  <p class="account-detail__tn">
                    <span class="text-bold">{{ getUser.firstName }}</span>
                    <span class="ml-1">{{ getUser.lastName }}</span>
                  </p>
                </div>
                <div class="account-detail__row">
                  <p class="account-detail__dn">Email</p>
                  <p class="account-detail__tn text-primary">
                    {{ getUser.email }}
                  </p>
                </div>
                <div class="account-detail__row">
                  <p class="account-detail__dn">Role</p>
                  <p class="account-detail__tn">{{ getUser.role }}</p>
                </div>
              </div>
            </div>
            <div class="account-right"></div>
          </div>
        </div>
      </div>
      <div v-else class="card">
        <div class="card-header">
          <h3 class="mb-0">User not found 😥</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'UserDetail',
  computed: {
    ...mapGetters(['getUser'])
  },
  data() {
    return {
      userId: this.$route.params.id
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchUser', 'deleteUser']),
    deleteUserAction() {
      this.deleteUser(this.userId).then(data => {
        this.$router.go(0);
      });
    }
  },
  created() {
    this.fetchUser(this.userId);
  }
};
</script>

<style scoped lang="scss">
.account {
  display: flex;

  &-thumbnail {
    flex: 0 0 15%;
  }

  &__avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }

  &-left {
    flex: 1;
    display: flex;
  }

  &-detail {
    width: 100%;

    &__row + &__row {
      margin-top: 10px;
    }

    &__row {
      display: flex;
      align-items: center;
    }

    &__dn {
      font-weight: 700;
      font-size: 18px;
      width: 7%;
    }

    &__tn {
      font-size: 14px;
    }

    p {
      margin-bottom: 0;
    }
  }
}
</style>
