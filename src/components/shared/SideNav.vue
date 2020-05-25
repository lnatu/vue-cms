<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="../../assets/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      />
      <span class="brand-text font-weight-light">THAT CMS</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="../../assets/img/user2-160x160.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">Tu</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Users
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'userList', query: { page: 1, limit: 20 } }"
                  class="nav-link"
                >
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'userCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create new</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-layer-group"></i>
              <p>
                Group
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'groupList' }" class="nav-link">
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'groupCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create new</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-parachute-box"></i>
              <p>
                Suppliers
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'supplierList', query: { page: 1, limit: 20 } }"
                  class="nav-link"
                >
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'supplierCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create new</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-atom"></i>
              <p>
                Products
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'productList' }" class="nav-link">
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'productCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create new</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cannabis"></i>
              <p>
                Category
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'categoryList' }" class="nav-link">
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'categoryCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-credit-card"></i>
              <p>
                Purchase
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'purchaseList' }" class="nav-link">
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'purchaseCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-box-open"></i>
              <p>
                Order
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'orderList' }" class="nav-link">
                  <i class="fas fa-list nav-icon"></i>
                  <p>List</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'orderCreate' }" class="nav-link">
                  <i class="fas fa-pencil-alt nav-icon"></i>
                  <p>Create new</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: 'SideNav'
};
</script>

<style scoped lang="scss">
.nav-treeview {
  margin-left: 25px;
}
</style>
