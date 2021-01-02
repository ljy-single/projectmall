<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :title="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabShow"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" class="home-swiper" @imgSwiperLoad="imgSwiperLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 给组件添加点击事件，需要添加.native修饰符 -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeData } from "network/home.js";
import { debounce } from "common/utils";
import { backTop } from "common/mixin";
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
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
    };
  },
  // 混入回到顶部
  mixins: [backTop],
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
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    // 监听图片加载事件
    this.$bus.$on("homeItemImgLoad", () => {
      refresh();
    });
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 300);
    // },
    // contentScroll(position) {
    //   // 1.判断backTop是否显示
    //   this.isShowBackTop = -position.y > 1000;
    //   // 2.决定tabControl是否吸顶
    //   this.isTabShow = -position.y > this.tabOffsetTop;
    // },
    loadMore() {
      // 加载更多
      this.getHomeData(this.currentType);
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶
      this.isTabShow = -position.y > this.tabOffsetTop;
    },
    imgSwiperLoad() {
      // 轮播图图片加载完成，获取tabControl的offerTop的值
      // $el,是获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        //当数据加载完毕以后通知better-scroll
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-bar {
  background-color: #ff8d99;
  color: #fff;
  /* 使用原生滚动时用 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
/* .home-swiper {
  padding-top: 44px;
} */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 8;
} */
.tab-control {
  position: relative;
  z-index: 10;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
