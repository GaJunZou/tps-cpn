```html
<template>
  <div>
    <el-popover trigger="click">
      <tps-tree :fieldConfig="field" :options="treeData" v-model="data"></tps-tree>
      <el-button type="primary" slot="reference">点击打开树选择器</el-button>
    </el-popover>
    <div style="height: 200px; overflow: scroll">{{ data }}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [3],
        field: {
          children: 'subs',
          label: 'name',
          id: 'value',
        },
        treeData: [
          {
            value: '1',
            name: 'adf',
            subs: [
              {
                value: '2',
                name: 'fgf',
                subs: [
                  {
                    value: '3',
                    name: 'rty',
                    subs: [],
                  },
                  {
                    value: '4',
                    name: 'er3',
                    subs: [],
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  };
</script>
```

使用说明

| 参数          | 说明                                           | 类型                 | 值      |
| ------------- | ---------------------------------------------- | -------------------- | ------- |
| v-model       | 选中的条目值                                   | `Array<any>`         | [ ]     |
| options       | 必填，根据该 options 显示数据                  | `Array<TreeOptions>` | [ ]     |
| showSearch    | 是否需要搜索器功能                             | `Boolean`            | `true`  |
| showFooter    | 是否需要预览选中项                             | `Boolean`            | `true`  |
| bodyMaxHeight | 控件最大宽度                                   | `String`             | `600px` |
| footerHeight  | 预览区最大高度                                 | `String`             | `100px` |
| fieldConfig   | 树形结构的字段配置，根据该配置渲染树形结构页面 | `FieldConfig`        | [ ]     |

```ts
interface FieldConfig {
  id: string; // 树形结构的唯一字段，默认为 "id"
  label: string; // 显示options名称的字段，默认为 "name"
  children: TreeItem; // 树形结构的子节点字段，默认为 "childrens"
}

interface TreeOptions {
  id: string | number;
  label: string;
  children: Array<TreeOptions>;
}
```
