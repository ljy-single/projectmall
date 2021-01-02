<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
};
</script>

<style scoped>
.navbar {
  height: 44px;
  line-height: 44px;
  text-align: center;
  display: flex;
  box-shadow: 0 2px 1px rgba(100, 100, 100, 0.2);
}
.navbar .center {
  flex: 1;
}
.navbar .left,
.navbar .right {
  width: 60px;
}
</style>
