<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-size">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  data() {
    return {};
  },
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info {
  padding: 0 20px;
  border-top: 5px solid #eee;
  border-bottom: 5px solid #eee;
}
.info-size,
.info-param {
  width: 100%;
  text-align: left;
  line-height: 2.5;
  font-size: 14px;
}

.info-param .info-param-key {
  padding-right: 30px;
  white-space: nowrap;
}
.info-param .param-value {
  color: var(--color-high-text);
  line-height: 1.2;
}
.info-img img {
  width: 100%;
}
</style>
