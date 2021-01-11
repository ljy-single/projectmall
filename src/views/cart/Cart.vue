<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  data() {
    return {};
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    },
    // 也可以用vuex的getters，辅助函数mapGetters见官网
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
};
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.nav-bar {
  background-color: #ff8d99;
  color: #fff;
  position: relative;
  z-index: 10;
}
</style>
