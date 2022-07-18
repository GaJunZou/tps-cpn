##### 5.`tps-nav-location`

一个可定位组件。

<template>
  <my-container>
    <component-tps-nav-location-demo></component-tps-nav-location-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/component/tps-nav-location-demo.vue

`tps-nav-location` | 参数 | 说明 | 类型 | 值 | | --------- | ------------------------ | ------ | --------- | | color | 右边内容轴活跃时文字颜色 | string | '#409eff' | | width | 整个 nav-location 的宽。 | string | '100%' | | height | 整个 nav-location 的高。 | string | '800px' | | flexScale | 左右内容的比例。 | string | '6:1' |

slot | slot name | 说明 | | --------- | -------------------- | | main | 右边展示的主要内容。 |

`tps-nav-item` | 参数 | 说明 | 类型 | 值 | | --------- | -------------------------------------------- | ------- | ------ | | showTitle | 是否显示卡片的 title | Boolean | `true` | | title | 右边内容轴的标题，同时也是左边对应卡片的标题 | string | '' | | info | 标题旁边的文本 | string | '' |
