<template>
  <div class="bottom-bar">
    <div class="checked">
      <CheckButton :isChecked="isSelectAll" class="checked-button" @click.native="checkAll"></CheckButton>
      <div>全选</div>
    </div>
    <div class="total">合计：￥{{totalPrice}}</div>
    <div class="calculate" @click="goCalculate">去计算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.newPrice * item.count;
        }, 0);
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (!this.$store.state.cartList.length) {
        return false;
      } else {
        return !this.$store.state.cartList.find((item) => {
          return !item.checked;
        });
      }
    },
  },
  methods: {
    checkAll() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => {
          return (item.checked = false);
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          return (item.checked = true);
        });
      }
    },
    goCalculate() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择结算的商品", 1500);
      }
    },
  },
  components: {
    CheckButton,
  },
};
</script>

<style scoped>
.bottom-bar {
  font-size: 14px;
  display: flex;
  width: 100%;
  height: 40px;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 49px;
  background-color: #fff;
}
.checked {
  display: flex;
  height: 40px;
  align-items: center;
  width: 80px;
}
.checked-button {
  margin: 0px 5px;
}
.total {
  line-height: 40px;
  flex: 1;
}
.calculate {
  line-height: 40px;
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: #fb5100;
}
</style>
