<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    // 滚动到哪个位置，经过多长时间
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    //当数据加载完毕以后通知better-scroll
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
  mounted() {
    // 1. 创建scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2. 监听滚动事件
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 3. 下拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  updated() {
    //重新计算高度
    this.scroll.refresh();
  },
};
</script>

<style scoped>
</style>
