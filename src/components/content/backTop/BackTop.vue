<template>
  <div class="back-top">
    <img src="~assets/img/common/backtop.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 80px;
}
.back-top img {
  width: 30px;
}
</style>
