# vue-customizable-formula-tables

> 基于 Ant Design of Vue 可自定义公式的计算表格

## 思路

> 1. 实现表格字段的添加
>
> 2. 实现计算公式的自定义

### 1. 实现表格字段的添加

```javascript
// 添加字段
addNewFieldHandle() {
    // * 进行重复 dataIndex 的检测（全英文检测 ✔️ | 唯一性检测 ✔️ ）
    const addNewField = this.addNewField

    // 1、对 dataIndex 进行 全英文检测
    if (this.isAllEnglish(addNewField.dataIndex)) {
    // ✅
    // 进行对象深拷贝（基于JSON方案）  解决提示重复问题
    const newField = JSON.parse(JSON.stringify(addNewField))
    const length = this.columns.length

    // 2、对唯一性进行检测
    if (this.isOneOfColumns(addNewField.dataIndex)) {
        //  唯一性 ✅
        console.log('唯一标识')

        this.columns.splice(length - 1, 0, newField) // 插入表头数据(总金额前一个位置)

        // 在表内添加字段 及 初始化数据
        this.data.forEach(item => {
        item[newField.dataIndex] = 0
        })
    } else {
        //  唯一性 ：
        this.$message.error('发现字段标识出现重复，请重新填写')
    }
    } else {
    // 不是全英文 提示重新填写
    this.$message.error('字段标识 请输入全英文字符')
    }
},
```

### 2. 实现计算公式的自定义

```javascript


// 实现公式的计算
GOGO() {
    // 1、拿到公式 字段对应表

    let formula = this.formula,
    columns = this.columns,
    columnsMap = {}

    // 1.1 针对地段表进行格式化 键值对形式

    columns.forEach(item => {
    columnsMap[item.title] = item.dataIndex
    })

    // 2、进行 中文与英文字段之间的转换
    // 总钱数=苹果单价*苹果数量+香蕉单价*香蕉数量
    // =>  item.money=item.appleMoney*item.appleNums+item.bananaMoney*item.bananaNums

    for (let key in columnsMap) {
    let re = null
    eval('re = /' + key + '/g')

    formula = formula.replace(re, 'item.' + columnsMap[key])
    }

    console.log(formula)

    // 3、eval 执行

    data.forEach(item => {
    eval(formula)
    })
},
```
