##### 1.`tpsEmpty`

使用`tpsEmpty`可以把空值处理成 `--` 。

```html
<template>
  <div>
    <p class="txt-blue">{{ data | tpsEmpty }}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: '',
      };
    },
  };
</script>
```

##### 2.`tpsDateFormat`

使用该管道可以格式化时间。

```html
<template>
  <div>
    <p class="txt-blue">{{ data1 | tpsDateFormat }}</p>
    <p class="txt-blue">{{ data2 | tpsDateFormat('yyyy-MM-dd') }}</p>
    <p class="txt-blue">{{ data3 | tpsDateFormat('MM-dd hh:mm') }}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data1: new Date(),
        data2: '2022-05-20 11:57:56',
        data3: 1653271889125,
      };
    },
  };
</script>
```

`tpsDateFormat`可把可以转化成时间对象的字符串（即`new Date()`可成功转为事件对象）进行格式化。

`tpsDateFormat`的一个额外参数是格式化字符串，默认为`yyyy-MM-dd hh:mm:ss`。
