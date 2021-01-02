<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多 ></div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt v-for="(item,index) in commentInfo.images" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  data() {
    return {};
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 0 10px;
}
.info-header {
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.info-user {
  padding-top: 10px;
}
.info-user img {
  width: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-detail p {
  margin: 10px 0;
  font-size: 15px;
  line-height: 1.5;
}
.info-other {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}
.info-other .date {
  margin-right: 10px;
}
.info-imgs {
  margin-bottom: 20px;
}
.info-imgs img {
  width: 25%;
  margin-right: 3px;
}
</style>
