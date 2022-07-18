
##### 2. tpsDateFormat

格式化时间

<template>
  <my-container>
    <filter-tps-date-format-demo></filter-tps-date-format-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/filter/tps-date-format-demo.vue

`tpsDateFormat`可把字符串进行格式化。

该字符串需要符合要求：`new Date(str)`可成功转为时间对象。

`tpsDateFormat`的一个额外参数是格式化字符串，默认为`yyyy-MM-dd hh:mm:ss`。