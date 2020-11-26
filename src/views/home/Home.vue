<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeSwiper :banners="banners" class="home-swiper"></HomeSwiper>
    <HomeRecommendView :recommends="recommends"></HomeRecommendView>
    <TabControl :title="['流行','新款','详情']" class="tab-control" @tabClick="tabClick"></TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeData } from "network/home.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求首页数据
    this.getHomeMultidata();
    // 2.请求首页商品数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  methods: {
    // 事件处理相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    TabControl,
    GoodsList,
  },
};
</script>

<style scoped>
#home {
  height: 15000px;
}
.home-bar {
  background-color: #ff8d99;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.home-swiper {
  padding-top: 44px;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 8;
}
</style>
