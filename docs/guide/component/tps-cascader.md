##### 7. `tps-cascader`

<template>
  <my-container>
    <component-tps-cascader-demo></component-tps-cascader-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-cascader-demo.vue

###### 使用说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中条目的值 | `Array<any>` | `[]` |
| options | 必填，根据改 options 显示数据 | `Array<ChildrenOptions>` | `[]` |
| placeholder | 占位提示文字 | string | `''` |
| multiple | 多选模式 | boolean | `false` |
| expandTrigger | cascader 面板的展开方式，值为`click`或`hover` | string | `'click'` |
| fieldConfig | options 的字段配置 | `FieldConfig` | `defaultConfig` |
| multiple | 是否多选 | boolean | `false` |
| lazy | 是否开启懒加载 | `Boolean` | `false` |
| lazyLoad | 懒加载时加载数据的方法，使用方式见下面`lazyLoadTree`。 <br/>第一个参数为当前点击的节点。<br/>第二个参数为回调函数，用于异步返回数据。 | `Function` | `(node, resolve) => {}` |
| lazySearch | 懒加载时搜索数据的方法，使用方式见下面`lazySearchTree`。 <br/>第一个参数为搜索关键词。<br/>第二个参数为回调函数，用于异步返回数据。 | `Function` | `(node, resolve) => {}` |
| currentLabel | 如果是懒加载模式时，组件是无法找到 v-model 对应的树节点。<br/>currentLabel 作为组件显示的选中值。 | `String` | `''` |

注意：

- 1、多选模式是时`v-model`返回的值是数组，单选模式返回的字符串或数字。
- 2、但需要给某项设置不可选时，给他添加 disabled 属性，或者指定不可选的字段。

###### event

| 事件             | 说明                         | 参数 | 返回值   |
| ---------------- | ---------------------------- | ---- | -------- |
| `getCheckedNode` | 获取当前节点数组的其他信息。 | --   | 节点数组 |

参数类型

```ts
interface ChildrenOptions {
  value: string | number;
  label: string;
  disabled: boolean;
  children: Array<ChildrenOptions>;
}

interface FieldConfig {
  value: string;
  label: string;
  children: string;
  disabled: string;
}

const defaultConfig: FieldConfig = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
};
```
