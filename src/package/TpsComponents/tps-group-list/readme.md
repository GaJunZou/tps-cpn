```html
<template>
  <div>
    <div>已选中：{{value}}</div>
    <tps-group-list
      v-model="value"
      :options="treeData"
      :placeholder="'这是placeholder'"
      :size="'small'"
      :label="'选择器'"
      :width="'450px'"
      :rowsCount="4"
      :rowsWidth="'auto'"
      :expand="false"
    ></tps-group-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        treeData: [
          {
            value: 1,
            label: 'A',
            children: [],
          },
          {
            value: 2,
            label: 'B',
            children: [],
          },
          {
            value: 3,
            label: 'C',
            children: [],
          },
        ],
      };
    },
    created() {
      this.createData();
    },
    methods: {
      createData() {
        this.treeData.forEach((v) => {
          let i = 200;
          while (i > 0) {
            v.children.push({
              value: (Math.random() * 10).toFixed(8),
              label: (Math.random() * 10).toFixed(8),
              children: [],
            });
            i--;
          }
        });
      },
    },
  };
</script>
```

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
