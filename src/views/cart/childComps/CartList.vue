<template>
  <div class="cart-list">
    <Scroll class="content cart-scroll" ref="scroll">
      <div v-if="cartList.length ===0" class="empty">购物车空空如也！！</div>
      <CartListItem v-for="(item,index) in cartList" :key="index" :cartItem="item" v-else></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated() {
    //开始时没有数据，默认可滚动的区域是0，
    // 插入数据后，better-scroll并不知道，所以仍然认为可滚动区域还是0
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  position: relative;
  height: calc(100% - 44px);
}
.content {
  position: absolute;
  overflow: hidden;
  top: 0px;
  bottom: 89px;
  left: 0;
  right: 0;
}
.empty {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
