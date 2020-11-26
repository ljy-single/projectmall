<template>
  <div class="goods-list">
    <GoodsListItem v-for="(item,index) in goods" :key="index" :goodsItem="item"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  padding: 0px 2px;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
