<template>
  <div class="row">
    <div class="col-12">
      <div class="card filter-room">
        <div class="card-header filter-room__header">
          <h5 class="mb-0">Filters</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <p class="mb-0 text-filter">Role</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="roleFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="roleFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Admin</a>
                  <a class="dropdown-item" href="#">User</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Status</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="statusFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="statusFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Active</a>
                  <a class="dropdown-item" href="#">Deactivated</a>
                  <a class="dropdown-item" href="#">Blocked</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Verified</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="verifyFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="verifyFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Yes</a>
                  <a class="dropdown-item" href="#">No</a>
                </div>
              </div>
            </div>
            <div class="col-3">
              <p class="mb-0 text-filter">Department</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary bg-transparent text-dark dropdown-toggle w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="departmentFilter"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  All
                </button>
                <div class="dropdown-menu" aria-labelledby="departmentFilter">
                  <a class="dropdown-item" href="#">All</a>
                  <a class="dropdown-item" href="#">Sales</a>
                  <a class="dropdown-item" href="#">Development</a>
                  <a class="dropdown-item" href="#">Management</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="bg-white p-3 rounded overflow-hidden">
        <div class="search-list">
          <div class="form-group w-25">
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
        </div>
        <table class="table table-bordered table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Handle</th>
              <th scope="col">Handle</th>
              <th scope="col">Handle</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupList'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common';
</style>
