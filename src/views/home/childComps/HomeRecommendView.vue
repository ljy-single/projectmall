<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  font-size: 14px;
  text-align: center;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  margin: 0 5px;
}
.recommend-item img {
  width: 100%;
  margin-bottom: 3px;
}
</style>
