```html
<template>
  <div>
    <tps-checkbox-list
      :options="options"
      :placeholder="'这是placeholder'"
      :size="'small'"
      :label="'多选选择器'"
      :width="'450px'"
      :rowsCount="4"
      :pageSize="60"
      v-model="value"
    ></tps-checkbox-list>
    <div>{{ value }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        options: [],
      };
    },
    mounted() {},
    methods: {
      createdData() {
        let i = 200;
        const options = [];
        while (i > 0) {
          options.push({
            value: (Math.random() * 10).toFixed(5),
            label: (Math.random() * 10).toFixed(5),
          });
          i--;
        }
        this.value = [options[0].value];
        this.options = options;
      },
    },
  };
</script>
```

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

参数类型

```ts
interface Options {
  value: string | number;
  label: string;
}
```
