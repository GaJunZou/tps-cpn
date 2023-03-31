##### 8. tps-sorter

排序组件

<template>
  <my-container>
    <component-tps-sorter-demo></component-tps-sorter-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-sorter-demo.vue

###### 使用说明

| 参数 | 说明               | 类型    | 值      |
| ---- | ------------------ | ------- | ------- | ---- |
| id   | 相同 id 会同步更新 | `number | string` | null |

###### event

| 事件   | 说明            | 参数 | 返回值 |
| ------ | --------------- | ---- | ------ |
| `asc`  | 点击`^`时触发。 |      | 'asc'  |
| `desc` | 点击`v`时触发。 |      | 'desc' |
