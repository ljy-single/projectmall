<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt />
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="sells-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td :class="{'score-better':item.isBetter}" class="score">{{item.score}}</td>
            <td>
              <span
                :class="{'better-more':item.isBetter}"
                class="better"
              >{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <span class="enter-shop">进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  data() {
    return {};
  },
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 20px 10px;
  border-top: 8px solid #eef;
  border-bottom: 8px solid #eef;
}
.shop-top {
  margin-bottom: 20px;
}
.shop-top img {
  width: 50px;
  border: 1px solid #ccc;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.shop-middle {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  font-size: 14px;
}
.shop-middle .shop-middle-left {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.shop-middle-left > div {
  padding-top: 15px;
  padding-right: 15px;
  line-height: 1.5;
}
.shop-middle-left .info-goods {
  border-right: 2px solid #eee;
}
.shop-middle-right {
  margin-left: 5px;
}
.shop-middle-right tr {
  line-height: 1.5;
}
.shop-middle-right td {
  padding-right: 5px;
}
.score {
  color: green;
}
.better {
  background-color: green;
  color: #fff;
}
.score-better {
  color: rgb(241, 76, 76);
}
.better-more {
  background-color: rgb(241, 76, 76);
}
.shop-bottom {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
.enter-shop {
  padding: 5px 20px;
  background-color: #eee;
  border-radius: 10px;
}
</style>
