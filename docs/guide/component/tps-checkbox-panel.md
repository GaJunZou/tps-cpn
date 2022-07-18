# 1. `tps-checkbox-panel`

一个使用 grid 布局的多选数据面板,你需要设置父标签的宽高以限制`tps-checkbox-panel`的大小。

<template> 
<my-container> 
<component-tps-checkbox-panel-demo></component-tps-checkbox-panel-demo> 
</my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-checkbox-panel-demo.vue

使用说明

| 参数 | 说明 | 类型 | 值 |
| --- | --- | --- | --- |
| v-model | 与 options 进行双向绑定，会修改 options 的 checked 属性，代表已选中。 | `Array<Options>` | [ ] |
| options | 必填，根据改 options 显示数据 | `Array<Options>` | [ ] |
| deep | 是否深拷贝 options。此时父组件的 options 与`tps-checkbox-panel`的 options 地址不一样。 | `boolean` | true |
| rowsCount | 每行显示 item 数 | number | 4 |
| rowsWidth | 每个 item 宽,可传带单位的宽如'120px','10%' | string | 'auto' |
| multiple | 是否多选 | boolean | true |
| fieldConfig | 字段配置 | Object | `{value: 'value', label: 'label'} ` |

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| `$refs.search(text)` | text:搜索的字符串 | 返回搜索结果。 |
| `$refs.updateView()` | -- | 刷新组件状态。由于 vue 双向绑定原理，导致父组件的 options 更新时`tps-checkbox-panel`的试图没有同步更新，需要手动刷新。 |

```ts
interface Options {
  value: string | number;
  label: string;
}
```
