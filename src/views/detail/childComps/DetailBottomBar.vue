<template>
  <div class="bottom-bar">
    <div class="left">
      <div>
        <img src="~assets/img/common/service2.svg" v-if="true" alt />
        <img src="~assets/img/common/service.svg" v-else alt />
        <p class="service">客服</p>
      </div>
      <div>
        <img src="~assets/img/common/shop2.svg" v-if="false" alt />
        <img src="~assets/img/common/shop.svg" v-else alt />
        <p>店铺</p>
      </div>
      <div>
        <img src="~assets/img/common/collect2.svg" v-if="false" alt />
        <img src="~assets/img/common/collect.svg" v-else alt />
        <p>收藏</p>
      </div>
    </div>
    <div class="right">
      <div class="add-shop" @click="addToCart">加入购物车</div>
      <div class="purchase">购买</div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailBottomBar",
  data() {
    return {};
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 58px;
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
}
.left {
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex: 1;
}
.left > div {
  text-align: center;
  flex: 1;
}
.left img {
  width: 24px;
  vertical-align: middle;
  margin-top: 10px;
}
.right {
  flex: 1;
  font-size: 15px;
  line-height: 58px;
  display: flex;
  text-align: center;
}
.right > div {
  width: 50%;
}
.right .add-shop {
  background-color: #ffdd10;
}
.right .purchase {
  background-color: #ff779b;
  color: #fff;
}
.service {
  color: #ff779b;
}
</style>
