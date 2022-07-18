##### 6. `tps-layout`

集成`tps-search-bar`、`el-table`、`el-pagination`的组件。

<template>
  <my-container>
    <component-tps-layout-demo></component-tps-layout-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-layout-demo.vue

`tps-layout` props

| 参数           | 说明                                        | 类型    | 值                                          |
| -------------- | ------------------------------------------- | ------- | ------------------------------------------- | --- | --------- | --------------------------------------------------- | --------------- | --------------------- |
| height         | 该组件总高度，为 auto 时视内容高度。        | string  | `'auto'`                                    |
| showPagination | 是否展示分页                                | boolean | `true`                                      |
| currentPage    | 当前页，与 el-pagination 配置保持一致。     | number  | 1                                           |
| pageSize       | 一页数据量，与 el-pagination 配置保持一致。 | number  | 50                                          |     | pageSizes | 可选择的一页数据量，与 el-pagination 配置保持一致。 | `Array<number>` | `[20, 100, 300, 500]` |
| total          | 数据总量，与 el-pagination 配置保持一致。   | number  | 500                                         |
| layout         | 与 el-pagination 配置保持一致。             | string  | `'total, sizes, prev, pager, next, jumper'` |

`slot`

| slot name  | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| search-bar | 搜索栏，建议使用`<tps-search-bar>`，已编写对应的自适应样式 |
| table      | 表格内容                                                   |

`tps-search-bar` event

| 参数        | 说明           | $event |
| ----------- | -------------- | ------ |
| searchEvent | 点击搜索触发。 | null   |
| resetEvent  | 点击重置触发。 | null   |

`tps-search-item` (`tps-search-item`通常在`tps-search-bar`里使用) props

| 参数  | 说明 | 类型   | 值     |
| ----- | ---- | ------ | ------ |
| width | 宽   | string | 'auto' |
