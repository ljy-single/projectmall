<template>
  <div id="detail">
    <DetailNavBar @topItemClick="topItemClick" ref="navbar"></DetailNavBar>
    <Scroll
      ref="scroll"
      class="detail-scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
    >
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommendInfo" ref="recommend"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";
// 1.引入Toast组件的方法，被引用toast插件的方法替换
// import Toast from "components/common/toast/Toast";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { backTop } from "common/mixin";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],
      getthemeTopYs: null,
      currentIndex: 0,
      // message: "",
      // show: false,
    };
  },
  mixins: [backTop],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.请求详情页的数据
    getDetailData(this.iid).then((res) => {
      const data = res.data.result;
      // 1.获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 1.第一次获取，值不对
      // 原因：this.$refs.params.$el压根没有渲染

      // this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      this.$nextTick(() => {
        // 2. 第二次获取，值依然不对
        // 根据最新的数据，对应的DOM渲染出来了
        // 但是图片依然没有加载完成（此时获取的offsetTop不包含图片）
        // offsetTop值不对，一般情况下都是因为图片
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    });
    // 3.请求详情页推荐的数据
    getRecommend().then((res) => {
      this.recommendInfo = res.data.data.list;
    });
    // 4.给getthemeTopYs赋值
    this.getthemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 200);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 3.第三次获取
      this.getthemeTopYs();
    },
    topItemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 1.获取Y值
      const positionY = -position.y;
      // 2.判断
      const length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i == length - 1 && positionY >= this.themeTopYs[length - 1]))
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
    },
    // 加入购物车
    addToCart() {
      //1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车
      // 3.弹出添加成功信息
      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 1500);
      });
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    // 监听图片加载事件
    this.$bus.$on("detailItemImgLoad", () => {
      refresh();
    });

    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 8;
  background-color: #fff;
}
.detail-scroll {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
