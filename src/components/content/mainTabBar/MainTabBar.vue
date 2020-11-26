<template>
  <div>
    <TabBar>
      <TabBarItem path="/home">
        <img slot="item-icon" src="~assets/img/tab-bar/shouye.png" />
        <img slot="item-icon2" src="~assets/img/tab-bar/shouye2.png" />
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category">
        <img slot="item-icon" src="~assets/img/tab-bar/fenlei.png" />
        <img slot="item-icon2" src="~assets/img/tab-bar/fenlei2.png" />
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart">
        <img slot="item-icon" src="~assets/img/tab-bar/shop-car.png" />
        <img slot="item-icon2" src="~assets/img/tab-bar/shop-car2.png" />
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile">
        <img slot="item-icon" src="~assets/img/tab-bar/me.png" />
        <img slot="item-icon2" src="~assets/img/tab-bar/me2.png" />
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
import TabBar from "components/common/tab-bar/TabBar.vue";
import TabBarItem from "components/common/tab-bar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
