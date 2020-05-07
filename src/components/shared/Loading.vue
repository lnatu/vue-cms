<template>
  <div class="loading">
    <img
      class="account-picture"
      src="../../assets/img/loading/loading.svg"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: 'Loading'
};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  z-index: 9999;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, .6);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
