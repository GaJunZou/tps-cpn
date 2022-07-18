##### 3. `tps-checkbox-list`

<template>
  <my-container>
    <component-tps-checkbox-list-demo></component-tps-checkbox-list-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-checkbox-list-demo.vue

使用说明

| 参数        | 说明                                       | 类型             | 默认值  |
| ----------- | ------------------------------------------ | ---------------- | ------- |
| v-model     | 选中条目的值                               | `Array<any>`     | []      |
| options     | 必填，根据改 options 显示数据              | `Array<Options>` | []      |
| rowsCount   | 每行显示的条目数                           | number           | 4       |
| rowsWidth   | 每个 item 宽,可传带单位的宽如'120px','10%' | string           | '200px' |
| placeholder | 占位提示文字                               | string           | ''      |
| label       | 选择器左边的说明文字                       | string           | ''      |
| width       | 选择器的宽                                 | string           | '200px' |
| pageSize    | 每页数据量                                 | number           | 60      |
| multiple    | 是否多选                                   | boolean          | true    |

参数类型

```ts
interface Options {
  value: string | number;
  label: string;
}
```
