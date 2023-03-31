##### 9. tps-visual-select

排序组件

<template>
  <my-container>
    <component-tps-visual-select-demo></component-tps-visual-select-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-visual-select-demo.vue

###### 使用说明

| 参数        | 说明                 | 类型         | 值      |
| ----------- | -------------------- | ------------ | ------- |
| loadCount   | 一次加载多少条数据   | `number`     | 20      |
| allowCreate | 是否允许手段创建条目 | `boolean`    | false   |
| field       | options 字段配置     | `object`     | null    |
| options     | 相同 id 会同步更新   | `Array<any>` | null    |
| placeholder | 占位符               | `string`     | 请选择  |
| width       | 空间宽               | `string`     | `160px` |

###### event

| 事件     | 说明               | 参数     | 返回值 |
| -------- | ------------------ | -------- | ------ |
| `change` | 绑定值改变时触发。 | 选中的值 |        |
