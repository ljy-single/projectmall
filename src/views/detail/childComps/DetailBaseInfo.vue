<template>
  <!-- 如果是空对象不进行渲染 Object.keys 获取对象的属性个数 -->
  <div class="totalInfo" v-if="Object.keys(goods).length !== 0">
    <p class="proInfo">{{goods.title}}</p>
    <div class="priceInfo">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="purInfo">
      <div>{{goods.columns[0]}}</div>
      <div>{{goods.columns[1]}}</div>
      <div>{{goods.services[goods.services.length-1].name}}</div>
    </div>
    <div class="logistics">
      <div>
        <img :src="goods.services[0].icon" alt />
        <span>{{goods.services[0].name}}</span>
      </div>
      <div>
        <img :src="goods.services[1].icon" alt />
        <span>{{goods.services[1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.totalInfo {
  padding: 0 5px;
  position: relative;
}
.proInfo {
  font-weight: 700;
  padding: 10px 0;
  line-height: 1.5;
}
.priceInfo {
  margin-bottom: 15px;
}
.newPrice {
  color: var(--color-high-text);
  font-weight: 700;
  font-size: 20px;
}
.oldPrice {
  text-decoration: line-through;
  margin: 0 5px;
}
.discount {
  position: absolute;
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 14px;
  padding: 0 3px;
  border-radius: 14px;
}
.purInfo,
.logistics {
  display: flex;
  justify-content: space-between;
}
.purInfo {
  font-size: 12px;
  color: #888;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.logistics {
  font-size: 14px;
  padding: 20px 0 20px;
}
.logistics img {
  width: 14px;
  vertical-align: middle;
  margin-top: -3px;
}
</style>
