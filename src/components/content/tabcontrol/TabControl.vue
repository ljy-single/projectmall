<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" :key="index" class="tab-control-item">
      <span :class="{active:index===currentIndex}" @click="itemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  justify-content: space-around;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item span {
  padding: 0px 3px 3px;
}
.tab-control-item .active {
  color: #ff8d99;
  border-bottom: 2px solid #ff8d99;
}
</style>
