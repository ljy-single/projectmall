export default {
  // mutations唯一的目的就是修改state的状态
  // mutations中的事件完成的操作尽可能的单一

  /* addCart(state, payload) {
    let oldProduct = null;
    for (let item of state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item
      }
    }
    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      state.cartList.push(payload)
    }
  } */
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, payload) {
    // 决定商品是否选中，默认未选中
    payload.checked = false;
    state.cartList.push(payload)
  },
  modifyChecked(state, payload) {
    const oldProduct = state.cartList.find((item) => {
      return item.iid === payload.iid
    })
    oldProduct.checked = !oldProduct.checked
  }
}
