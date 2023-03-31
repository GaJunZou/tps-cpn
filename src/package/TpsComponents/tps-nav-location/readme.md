```html
<template>
  <div>
    <tps-nav-location>
      <div class="sku-main" slot="main">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill"></el-image>
      </div>
      <tps-nav-item
        v-for="(item, index) in navItems"
        :key="index"
        :title="item.title"
        :info="item.info"
        :showTitle="true"
      >
        <div :style="style">{{ item.title }}</div>
      </tps-nav-item>
    </tps-nav-location>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        style: {
          fontSize: '20px',
          width: '100%',
          height: item.height,
          backgroundColor: item.bgcolor,
        },
        navItems: [
          {
            name: '第一个',
            height: '300px',
            bgcolor: '#67c23a',
            title: '内容1',
          },
          {
            name: '第二个',
            height: '200px',
            bgcolor: '#e6a23c',
            title: '内容2',
          },
          {
            name: '第三个',
            height: '150px',
            bgcolor: '#f56c6c',
            title: '内容3',
          },
          {
            name: '第四个',
            height: '250px',
            bgcolor: '#909399',
            title: '内容4',
          },
          {
            name: '第五个',
            height: '300px',
            bgcolor: '#409eff',
            title: '内容5',
          },
          {
            name: '第六个',
            height: '120px',
            bgcolor: '#eee',
            title: '内容6',
          },
        ],
      };
    },
  };
</script>
```

`tps-nav-location` | 参数 | 说明 | 类型 | 值 | | --------- | ------------------------ | ------ | --------- | | color | 右边内容轴活跃时文字颜色 | string | '#409eff' | | width | 整个 nav-location 的宽。 | string | '100%' | | height | 整个 nav-location 的高。 | string | '800px' | | flexScale | 左右内容的比例。 | string | '6:1' |

slot | slot name | 说明 | | --------- | -------------------- | | main | 右边展示的主要内容。 |

`tps-nav-item` | 参数 | 说明 | 类型 | 值 | | --------- | -------------------------------------------- | ------- | ------ | | showTitle | 是否显示卡片的 title | Boolean | `true` | | title | 右边内容轴的标题，同时也是左边对应卡片的标题 | string | '' | | info | 标题旁边的文本 | string | '' |
