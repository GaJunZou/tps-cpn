```html
<template>
  <div>
    <tps-cascader v-model="data" :options="options"></tps-cascader>
    <div>{{ data }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fieldConfig: {
          value: 'id',
          label: 'name',
          children: 'sub',
          disabled: 'disabled',
        },
        data: null,
        options: [
          {
            id: 'zhinan',
            name: '指南',
            disabled: true,
            sub: [
              {
                id: 'shejiyuanze',
                name: '设计原则',
                sub: [
                  {
                    id: 'yizhi',
                    name: '一致',
                  },
                ],
              },
              {
                id: 'daohang',
                name: '导航',
                sub: [
                  {
                    id: 'cexiangdaohang',
                    name: '侧向导航',
                  },
                ],
              },
            ],
          },
          {
            id: 'ziyuan',
            name: '资源',
            sub: [
              {
                id: 'axure',
                name: 'Axure Components',
              },
              {
                id: 'sketch',
                name: 'Sketch Templates',
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

| 参数          | 说明                                          | 类型                     | 默认值          |
| ------------- | --------------------------------------------- | ------------------------ | --------------- |
| v-model       | 选中条目的值                                  | `Array<any>`             | `[]`            |
| options       | 必填，根据改 options 显示数据                 | `Array<ChildrenOptions>` | `[]`            |
| placeholder   | 占位提示文字                                  | string                   | `''`            |
| multiple      | 多选模式                                      | boolean                  | `false`         |
| expandTrigger | cascader 面板的展开方式，值为`click`或`hover` | string                   | `'click'`       |
| fieldConfig   | options 的字段配置                            | `FieldConfig`            | `defaultConfig` |

注意：

- 1、多选模式是时`v-model`返回的值是数组，单选模式返回的字符串或数字。
- 2、但需要给某项设置不可选时，给他添加 disabled 属性，或者指定不可选的字段。

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
