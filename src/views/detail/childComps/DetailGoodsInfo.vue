<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clearfix">
      <div class="start">
        <div></div>
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end">
        <div></div>
      </div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        :src="item"
        alt
        v-for="(item,index) in detailInfo.detailImage[0].list"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter: 0,
      imgLength: 0,
    };
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // this.counter++;
      // if (this.counter === this.imgLength) {
      // 所有图片加载完成
      this.$emit("imageLoad");
      // }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.info-desc,
.info-key {
  padding: 0 10px;
}
.info-desc {
  font-size: 14px;
}
.info-key {
  margin-bottom: 10px;
}
.start,
.end {
  width: 100px;
  height: 2px;
  background-color: #ccc;
  margin: 20px 0;
  position: relative;
}
.start > div,
.end > div {
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #000;
}
.start > div {
  top: -4px;
  left: 0;
}
.end > div {
  right: 0;
}
.end {
  float: right;
}
.info-list img {
  width: 100%;
}
</style>
