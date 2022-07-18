<template>
  <div class="box" :title="title">
    <transition name="fade">
      <el-card :body-style="bodyStyle" class="box-card" ref="card">
        <div slot="header" class="clearfix" v-if="showTitle">
          <span class="title">{{ title }}</span>
          <span class="info">{{ info }}</span>
          <el-button @click="expand" class="expand-btn" type="text">
            <strong :class="iconClass"></strong>
          </el-button>
        </div>
        <slot></slot>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'tps-nav-item',
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isExpand: true,
      iconClass: 'el-icon-plus',
      bodyStyle: {
        padding: '0px',
        margin: '10px',
        overflow: 'hidden',
        transition: 'height 0.2s',
      },
    };
  },
  methods: {
    expand() {
      const cardBody = this.$refs.card.$el.querySelector('.el-card__body');
      if (this.isExpand) {
        cardBody.style.height = '0px';
        this.iconClass = 'el-icon-minus';
      } else {
        cardBody.style.height = 'auto';
        this.iconClass = 'el-icon-plus';
      }
      this.isExpand = !this.isExpand;
    },
  },
};
</script>

<style>
.el-card__header {
  padding: 10px 20px;
}
.box-card {
  margin: 10px;
}
.title {
  color: #2878ff;
  font-weight: 700;
}
.info {
  margin-left: 10px;
  color: #606266;
}
.expand-btn {
  float: right;
  padding: 3px 0;
  font-weight: 700;
}
</style>
