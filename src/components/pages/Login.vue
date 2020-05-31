<template>
  <div id="login">
    <div class="login-page">
      <div class="form">
        <h2>Login</h2>
        <form class="login-form text-left">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              class="form-control"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              class="form-control"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            @click.prevent="loginAction"
            class="btn btn-primary w-100 mt-4"
          >
            login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setAuthUser', 'setIsLogin']),
    ...mapActions(['login']),
    async loginAction() {
      this.setShowLoading(true);
      try {
        const user = await this.login(this.user);
        localStorage.setItem('user', JSON.stringify(user));
        this.setAuthUser(user);
        this.$router.push({ name: 'home' });
        this.$router.go();
        this.setShowLoading(false);
      } catch (err) {
        console.log(err.response);
        this.setShowLoading(false);
      }
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

#login {
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
}

.login-page {
  width: 100%;
  max-width: 460px;
  margin: auto;
  background: none;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 100%;
  margin: 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: '';
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
</style>
