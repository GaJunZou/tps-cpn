```html
<template>
  <div>
    <p class="txt-blue" v-copy="data"></p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: '3.1415926535',
      };
    },
  };
</script>
```

用法：

- 1 ：`v-copy="data"`:气泡显示`data`，点击复制`data`
- 2 ：`v-copy="{prepend: 'sku:', value: data}"`: 气泡显示`sku:data`，点击复制`data`。

注意：该指令会把当前的元素替换掉，后续或使用 vnode 渲染并修改原有元素。
