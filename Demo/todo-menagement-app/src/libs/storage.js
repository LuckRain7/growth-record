/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-03 12:19:44
 */

const FLAG = 'RECORD-DATA'

// 设置储存信息
function setInfo(time, title = '', content = '') {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)
  if (!DATA_KEYS.includes(time)) {
    DATA[time] = []
  }
  let ARR = DATA[time]
  ARR.push({
    id: ARR.length === 0 ? 1 : parseInt(ARR[ARR.length - 1].id) + 1,
    title,
    content,
    time: getMinutes(),
  })

  localStorage.setItem(FLAG, JSON.stringify(DATA))
  return true
}

// 获取数据
function getInfo(time, id) {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)

  if (!DATA_KEYS.includes(time)) return null

  DATA = DATA[time]
  if (typeof id !== 'undefined') {
    DATA = DATA.find(item => {
      return parseInt(item.id) === parseInt(id)
    })
  }
  return DATA
}

// 删除信息
function deleteInfo(time, id) {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)

  if (!DATA_KEYS.includes(time)) return false

  let ARR = DATA[time]

  ARR = ARR.filter(item => {
    return parseInt(item.id !== parseInt(id))
  })

  DATA[time] = ARR
  localStorage.setItem(FLAG, JSON.stringify(DATA))

  return true
}

// 获取 小时和分钟
function getMinutes() {
  let time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes()

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes

  return `${hours}:${minutes}`
}

//  格式化日期
function formatData(time) {
  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  return `${year}/${month}/${day}`
}

// 格式化时间
function formatTime(time) {
  return time
    .split('/')
    .map(item => {
      if (item.length < 2) {
        return '0' + item
      }
      return item
    })
    .join('/')
}

export default {
  formatData,
  formatTime,
  set: setInfo,
  get: getInfo,
  del: deleteInfo,
}
