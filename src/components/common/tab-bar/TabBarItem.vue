<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 图片和文字都不是写死的，所以要用插槽 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon2"></slot>
    </div>
    <div :style="activeColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeFontColor: {
      type: String,
      default: "#db341e",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeColor() {
      return this.isActive ? { color: this.activeFontColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
}
/* 活动状态下的字体颜色也不能写死 */
/* .active {
  color: #db341e;
} */
</style>
