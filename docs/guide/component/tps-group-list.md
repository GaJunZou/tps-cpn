##### 2. `tps-group-list`

一个封装`tps-checkbox-panel`的多选类别选择器。

<template>
  <my-container>
    <component-tps-group-list-demo></component-tps-group-list-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-group-list-demo.vue

使用说明

| 参数        | 说明                                     | 类型                     | 默认值          |
| ----------- | ---------------------------------------- | ------------------------ | --------------- |
| v-model     | 选中的条目值                             | `Array<any>`             | [ ]             |
| options     | 必填，根据改 options 显示数据            | `Array<ChildrenOptions>` | [ ]             |
| fieldConfig | 字段映射配置                             | `FieldConfig`            | `defaultConfig` |
| rowsCount   | 每行显示条目数                           | number                   | 4               |
| rowsWidth   | 每个条目宽,可传带单位的宽如'120px','10%' | string                   | 'auto'          |
| placeholder | 占位提示文字                             | atring                   | ''              |
| label       | 选择器左边的说明文字,如传入空则不显示    | string                   | ''              |
| width       | 选择器的宽                               | string                   | '200px'         |
| expand      | 是否默认展开                             | boolean                  | false           |
| multiple    | 是否多选                                 | boolean                  | true            |

```ts
interface Options {
  value: string | number;
  label: string;
}

interface ChildrenOptions {
  value: string | number;
  label: string;
  children: Array<Options>;
}

interface FieldConfig {
  value: string;
  label: string;
  children: string;
}

const defaultConfig: FieldConfig = {
  value: 'value',
  label: 'label',
  children: 'children',
};
```
