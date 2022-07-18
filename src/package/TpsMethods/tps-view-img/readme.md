```html
<template>
  <div>
    <el-button @click="viewImg">查看图片</el-button>
    <div>
      <img v-for="(url, index) in imageList" :key="index" :src="url" style="height: 30px; width: 30px; margin: 5px" />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imageList: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://img.zcool.cn/community/01ce2d5c088693a80120925271464c.jpg@1280w_1l_2o_100sh.jpg',
        ],
      };
    },
    methods: {
      viewImg() {
        try {
          this.tpsViewImg(
            this.imageList.map((v) => {
              return { url: v };
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>
```

`imageView(imageList: Array<url: string>): void {...}`
