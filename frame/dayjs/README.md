dayjs

[GitHub](https://github.com/iamkun/dayjs) | [官网](https://day.js.org/zh-CN/)

## 安装

```bash
npm i dayjs -s
#or
yarn add dayjs
```

## 使用

```javascript
// 获取或设置月份。
// 月份是从 0 开始计算的，即 1 月是 0。
dayjs().month()
dayjs().month(0)

// 获取或设置年份。
dayjs().year()
dayjs().year(2000)

// 获取或设置日期
dayjs().date()
dayjs().date(1)
```

### 查询

```javascript
// 查询两个日期的先后顺序
dayjs().isBefore(dayjs('2011-01-01')) // 默认毫秒
dayjs().isAfter(dayjs('2011-01-01')) // 默认毫秒
```
