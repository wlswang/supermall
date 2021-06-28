import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, playload) {
    // 1. 查找之前数组中是否有该商品
    let oldProduct= context.state.cartList.find(item => item.id === playload.iid)
    // 2. 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      playload.count = 1
      // context.state.cartList.push(playload)
      context.commit(ADD_TO_CART, playload)
    }
  }
}
