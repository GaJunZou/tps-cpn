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

### 使用说明

#### props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中条目的值 | `Array<any>` | `[]` |
| options | 必填，根据改 options 显示数据 | `Array<ChildrenOptions>` | `[]` |
| placeholder | 占位提示文字 | string | `''` |
| multiple | 多选模式 | `Boolean` | `false` |
| expandTrigger | cascader 面板的展开方式，值为`click`或`hover` | string | `'click'` |
| fieldConfig | options 的字段配置 | `FieldConfig` | `defaultConfig` |
| lazy | 是否开启懒加载 | `Boolean` | `false` |
| lazyLoad | 懒加载时加载数据的方法，使用方式见下面`lazyLoadTree`。 <br/>第一个参数为当前点击的节点。<br/>第二个参数为回调函数，用于异步返回数据。 | `Function` | `(node, resolve) => {}` |
| lazySearch | 懒加载时搜索数据的方法，使用方式见下面`lazySearchTree`。 <br/>第一个参数为搜索关键词。<br/>第二个参数为回调函数，用于异步返回数据。 | `Function` | `(node, resolve) => {}` |
| currentLabel | 如果是懒加载模式时，组件是无法找到 v-model 对应的树节点。<br/>currentLabel 作为组件显示的选中值。 | `String` | `''` |

#### event

| 事件             | 说明                         | 参数 | 返回值   |
| ---------------- | ---------------------------- | ---- | -------- |
| `getCheckedNode` | 获取当前节点数组的其他信息。 | --   | 节点数组 |

#### 注意：

- 1、无论是多选模式还是单选模式`v-model`返回的值是数组。
- 2、但需要给某项设置不可选时，给他添加 disabled 属性，或者指定不可选的字段。

#### 参数类型

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

let id = 0;
lazyLoadTree(currentNode, resolve) {
  const { level } = currentNode;
  setTimeout(() => {
    const children = Array.from({ length: level + 1 }).map((item) => ({
      value: ++id,
      label: `选项${id}`,
      leaf: level >= 3,
    }));
    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
    resolve(children);
  }, 1000);
},

lazySearchTree(text, resolve) {
  fetchData().then((res) => {
    resolve(
      res.map((v) => {
        return {
          value: v.value,
          label: v.label,
          show: true,
        };
      })
    );
  });
},
```
