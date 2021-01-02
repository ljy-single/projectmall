export default {
  addCart(context, payload) {
    //查看购物车中是否有这个商品
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find((item) => {
        return item.iid === payload.iid
      })
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1;
        context.commit('addToCart', payload)
        resolve('加入购物车成功')
      }
    })
  }
}
