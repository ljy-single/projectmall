<template>
  <NavBar class="detail-tab">
    <div slot="left" class="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="center">
      <span
        :class="{avtive:currentIndex===index}"
        v-for="(item,index) in titles"
        :key="index"
        @click="itemClick(index)"
      >{{item}}</span>
    </div>
    <div slot="right"></div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("topItemClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.detail-tab {
  position: relative;
  font-size: 14px;
  background-color: #fff;
  z-index: 9;
}
.left img {
  width: 24px;
  vertical-align: middle;
}
.center {
  display: flex;
}
.center span {
  flex: 1;
}
.avtive {
  color: var(--color-high-text);
}
</style>
