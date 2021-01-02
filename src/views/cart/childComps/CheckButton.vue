<template>
  <div class="check-button">
    <img src="~assets/img/common/checked.svg" alt v-if="isChecked" />
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data() {
    return {};
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button img {
  width: 20px;
}
.check-button div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
</style>
