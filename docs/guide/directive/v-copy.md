##### 1.`v-copy`

点击文本复制

<template>
  <my-container>
    <directive-tps-copy-demo></directive-tps-copy-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/directive/tps-copy-demo.vue

用法：

- 1 ：`v-copy="data"`:气泡显示`data`，点击复制`data`
- 2 ：`v-copy="{prepend: 'sku:', value: data}"`: 气泡显示`sku:data`，点击复制`data`。

注意：该指令会把当前的元素替换掉，后续或使用 vnode 渲染并修改原有元素。
