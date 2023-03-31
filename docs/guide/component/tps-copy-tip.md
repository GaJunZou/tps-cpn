##### 10. tps-copy-tip

提示组件、可复制

<template>
  <my-container>
    <component-tps-copy-tip-demo></component-tps-copy-tip-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-copy-tip-demo.vue

###### 使用说明

| 参数      | 说明                  | 类型      | 值    |
| --------- | --------------------- | --------- | ----- |
| tip       | 提示文本              | `string`  | null  |
| copyValue | 点击复制时的文本      | `string`  | null  |
| question  | 是否在后面添加`?`icon | `boolean` | false |
| slot      | 正文                  | `Dom`     | null  |

###### event

| 事件   | 说明                 | 参数     | 返回值 |
| ------ | -------------------- | -------- | ------ |
| `copy` | 点击复制成功时触发。 | 复制的值 |        |
