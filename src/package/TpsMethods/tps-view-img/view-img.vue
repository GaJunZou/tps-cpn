<template>
  <div v-if="visiable" ref="imageContainer" class="view-image">
    <div class="mask"></div>
    <button @click="plus()" class="el-carousel__arrow plus">
      <i class="el-icon-zoom-in"></i>
    </button>
    <button @click="sub()" class="el-carousel__arrow sub">
      <i class="el-icon-zoom-out"></i>
    </button>
    <button @click="close()" class="el-carousel__arrow close">
      <i class="el-icon-close"></i>
    </button>
    <el-carousel trigger="click" :interval="0" class="custom-carousel" @change="changeIndex">
      <el-carousel-item v-for="(item, index) in imageList" :key="index">
        <div class="image-wrapper">
          <img class="image" @load="loadImage" ref="image" :src="item.url" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visiable: false,
      activeIndex: 0,
    };
  },
  props: {
    imageList: {
      type: Array,
      required: true,
      validator: (arr) => {
        return arr.every((v) => Object.prototype.hasOwnProperty.call(v, 'url'));
      },
    },
  },
  mounted() {
    document.removeEventListener('keydown', this.close, true);
    document.addEventListener('keydown', this.close, true);
    this.$nextTick(() => {
      this.handlerCustomCarousel();
      // this.addScrollEvent();
    });
  },
  methods: {
    loadImage() {
      this.calcTop(0);
    },
    close(e) {
      if (!e) {
        this.visiable = false;
        return;
      }
      if (e.keyCode === 27) {
        this.visiable = false;
      }
    },
    changeIndex(e) {
      this.activeIndex = e;
      this.calcTop(e);
    },
    calcTop(index, init = true) {
      const image = this.$refs.image[index];
      const container = this.$refs.imageContainer;
      let top;
      if (image.height > container.clientHeight) {
        if (init) {
          top = '0px';
          image.height = container.clientHeight;
        }
      } else {
        top = container.clientHeight / 2 - image.height / 2 + 'px';
      }
      image.parentNode.style.top = top;
    },
    calcSize(index, opt) {
      const image = this.$refs.image[index];
      const container = this.$refs.imageContainer;
      const maxWidth = Math.floor(container.clientWidth * 0.8);
      if (opt) {
        if (image.width < maxWidth) {
          image.height += 250;
        }
      } else {
        if (image.width > maxWidth / 4) {
          image.height -= 250;
        }
      }
      if (image.width > maxWidth) {
        image.width = maxWidth;
      }
      this.calcTop(this.activeIndex, false);
    },
    plus() {
      this.calcSize(this.activeIndex, true);
    },
    sub() {
      this.calcSize(this.activeIndex, false);
    },
    handlerCustomCarousel() {
      const btnList = document.querySelector('.custom-carousel').querySelectorAll('.el-carousel__button');
      for (let index = 0; index < btnList.length; index++) {
        const img = document.createElement('img');
        img.setAttribute('src', this.imageList[index].url);
        img.style.width = '30px';
        img.style.height = '30px';
        btnList[index].appendChild(img);
      }
    },
    addScrollEvent() {
      const carouselItemList = document.querySelectorAll('.custom-carousel .el-carousel__item');
      for (const [key, value] of Object.entries(carouselItemList)) {
        value.addEventListener(
          'mousewheel',
          (e) => {
            this.calcSize(key, e.deltaY > 0);
            e.preventDefault();
          },
          true
        );
      }
    },
  },
};
</script>
<style lang="less">
.view-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  // height: 100vh;
  .close {
    position: absolute;
    right: 0;
    top: 20px;
    z-index: 10;
  }
  .plus {
    position: fixed;
    z-index: 10;
    bottom: 22px;
    right: 20px;
    top: calc(100% - 25px);
  }
  .sub {
    position: fixed;
    z-index: 10;
    bottom: 22px;
    right: 60px;
    top: calc(100% - 25px);
  }
  .custom-carousel .el-carousel__container {
    height: 100vh;
    .el-carousel__item {
      overflow-y: scroll;
    }
    .el-carousel__item::-webkit-scrollbar {
      width: 0px;
    }
  }
  .image-wrapper {
    width: 80%;
    /* margin: auto; */
    position: absolute;
    left: calc(10%);
    .image {
      display: block;
      margin: auto;
      object-fit: contain;
      max-width: 100%;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
    overflow: hidden;
  }
}
</style>
