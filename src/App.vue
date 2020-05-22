<template>
  <div class="main">
    <div class="wrapper">
      <Loading v-if="getShowLoading" />
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"
              ><i class="fas fa-bars"></i
            ></a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="index3.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">Contact</a>
          </li>
        </ul>

        <!-- SEARCH FORM -->
        <form class="form-inline ml-3">
          <div class="input-group input-group-sm">
            <input
              class="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div class="input-group-append">
              <button class="btn btn-navbar" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>

        <!-- Right navbar links -->
        <div class="ml-auto mr-2" v-if="getAuthUser">
          <router-link class="mr-3" to="me">
            {{ `${getAuthUser.firstName} ${getAuthUser.lastName}` }}
          </router-link>
          <button type="button" class="btn btn-danger" @click="logout">Logout</button>
        </div>
        <div class="ml-auto mr-2" v-else>
          <router-link class="ml-auto mr-2" :to="{ name: 'Login' }">
            Login
          </router-link>
        </div>
      </nav>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->
      <SideNav />

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0 text-dark text-capitalize"></h1>
              </div>
              <!-- /.col -->
              <div class="col-sm-6"></div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
        <div class="content">
          <router-view />
        </div>
      </div>
      <!-- /.content-wrapper -->

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->

      <!-- Main Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import SideNav from './components/shared/SideNav';
import Footer from './components/shared/Footer';
import Loading from './components/shared/Loading';
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    SideNav,
    Footer,
    Loading
  },
  computed: {
    ...mapGetters(['getShowLoading', 'getIsLogin', 'getAuthUser'])
  },
  data() {
    return {
      breadcrumbs: {
        full: '',
        array: []
      }
    };
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['setIsLogin', 'setAuthUser'])
  }
};
</script>

<style lang="scss">
@import './assets/css/adminlte.css';
</style>
