/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-14
 * @Description  : 格式化函数
 *
 * @ Love and Peace
 */

export default {
  // 根据状态码格式化状态
  setRenderData(statusNum) {
    switch (statusNum) {
      case 1:
        return '待审核'
      case 2:
        return '审核通过'
      case 3:
        return '审核不通过'
      default:
        return '未获取状态'
    }
  },

  // 根据状态格式化样式
  setRenderDataStyle(statusString) {
    switch (statusString) {
      case '待审核':
        return 'status-red'
      case '审核通过':
        return 'status-blue'
      case '审核不通过':
        return 'status-yellow'
      default:
        return ''
    }
  },
}
