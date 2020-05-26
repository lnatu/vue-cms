<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div v-if="!user">
            <h3 class="mb-0">No user found</h3>
          </div>
          <div v-else class="account">
            <div class="account-left">
              <div class="account-thumbnail">
                <img
                  class="account__avatar"
                  src="../../assets/img/avatar04.png"
                  alt="avatar"
                />
              </div>
              <div class="account-detail">
                <div class="account-detail__row">
                  <p class="account-detail__dn">Name</p>
                  <p class="account-detail__tn">
                    <span class="text-bold">{{ user.firstName }}</span>
                    <span class="ml-1">{{ user.lastName }}</span>
                  </p>
                </div>
                <div class="account-detail__row">
                  <p class="account-detail__dn">Email</p>
                  <p class="account-detail__tn text-primary">
                    {{ user.email }}
                  </p>
                </div>
                <div class="account-detail__row">
                  <p class="account-detail__dn">Group</p>
                  <p class="account-detail__tn">{{ user.group.name }}</p>
                </div>
              </div>
            </div>
            <div class="account-right"></div>
          </div>
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
      user: null
    };
  },
  methods: {
    ...mapMutations(['setShowLoading']),
    ...mapActions(['fetchUser']),
    async showUser() {
      this.setShowLoading(true);
      try {
        const response = await this.fetchUser(this.$route.params.id);
        this.user = response.data.data.user;
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
    this.showUser();
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
