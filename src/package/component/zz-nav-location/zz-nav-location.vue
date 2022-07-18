<template>
  <div id="my-nav" :style="{ height: height, width: width }">
    <div ref="content" @scroll="scrollNav()" class="nav-content" :style="{ flex: leftFlex }">
      <slot></slot>
    </div>
    <div :style="{ width: width, flex: rightFlex }" class="nav-location">
      <div class="main-panel">
        <slot name="main"></slot>
      </div>
      <div class="timeline-panel">
        <el-timeline>
          <el-timeline-item
            class="location-item"
            v-for="(item, index) in activities"
            :style="{ color: item.textColor }"
            :key="index"
            :size="'large'"
            :color="item.pointColor"
            @click.native="clickNav(index)"
          >
            {{ item.title }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../util.js';
export default {
  name: 'zz-nav-location',
  data() {
    return {
      activities: [],
      contentScrollTop: '',
      contentHeightTotal: 0,
      contentHeightList: [],
      stamp: new Date().getTime(),
      scrollNav: debounce(() => {
        this.contentScrollTop = this.$refs.content.scrollTop;
      }, 200),
      leftFlex: 6,
      rightFlex: 1,
    };
  },
  props: {
    color: {
      type: String,
      default: '#409eff',
    },
    width: {
      type: String,
      default: 'auto',
    },
    height: {
      type: String,
      default: '800px',
    },
    flexScale: {
      type: String,
      default: '4:1',
    },
  },
  watch: {
    contentScrollTop: {
      handler(newVal) {
        let origin = 0;
        for (let i in this.contentHeightList) {
          origin += this.contentHeightList[i];
          if (origin > newVal) {
            this.changeColor(i);
            break;
          }
        }
      },
    },
  },
  created() {
    const flex = this.flexScale.split(':');
    this.leftFlex = flex[0];
    this.rightFlex = flex[1];
  },
  mounted() {
    this.initData();
    this.contentHeightList.forEach((v) => (this.contentHeightTotal += v));
  },
  methods: {
    initData() {
      const content = this.$refs.content.children;
      for (const i in content) {
        if (!isNaN(+i)) {
          // 有 i = length 属性
          const c = content[i].getAttribute('title');
          content[i].setAttribute('id', this.stamp + `-${i}`);
          this.contentHeightList.push(content[i].offsetHeight);
          this.activities.push({
            title: c,
            pointColor: i == 0 ? this.color : '',
            textColor: i == 0 ? this.color : '',
          });
        }
      }
    },
    clickNav(index) {
      // 滚动距离
      let height = 0;
      let heightList = [];
      for (let i = 0; i < this.contentHeightList.length; i++) {
        if (i < index) {
          height += this.contentHeightList[i];
          heightList.push(this.contentHeightList[i]);
        } else {
          break;
        }
      }
      this.$refs.content.scrollTop = height + 10 * heightList.length + 8;
      // 颜色变化
      this.changeColor(index);
    },
    changeColor(index) {
      const activity = this.activities.find((v) => v.pointColor);
      activity.pointColor = '';
      activity.textColor = '';
      this.activities[index].pointColor = this.color;
      this.activities[index].textColor = this.color;
    },
  },
};
</script>

<style lang="less" scoped>
@import url('./zz-nav-location.less');
</style>
