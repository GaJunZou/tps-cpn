<template>
  <div class="tip-box">
    <span class="tip-wrapper" @click="copyHandle" v-if="question">
      <slot></slot>
    </span>
    <el-tooltip :placement="placement" :visible-arrow="false">
      <div slot="content">
        <span v-if="tip">{{ tip }}</span>
      </div>
      <span @click="copyHandle">
        <span class="tip-wrapper" v-if="!question">
          <slot></slot>
        </span>
        <i v-if="question" class="icon el-icon-question"></i>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      activeClass: '',
      copy: false,
    };
  },
  props: {
    question: Boolean,
    copyValue: [],
    placement: String,
    tip: String,
  },
  mounted() {
    this.question = this.equal(this.question, '') ? true : this.question;
    this.copy = this.equal(this.copy, '') ? true : this.copy;
    this.question = !!this.question;
    this.copy = !!this.copy;
    if (this.copy) {
      this.title = '点击复制：' + this.value || '';
    }

    this.activeClass = { 'app-copy': this.copy, 'app-tip': true };
  },
  methods: {
    equal(a, b) {
      if (a === b) {
        return true;
      } else {
        return false;
      }
    },

    copyHandle() {
      if (this.copyValue) {
        const ele = document.createElement('input');
        document.body.append(ele);
        if (typeof this.copyValue === 'object') {
          ele.value = JSON.stringify(this.copyValue);
        } else {
          ele.value = this.copyValue;
        }
        ele.select();
        // lib.dom.d.ts(4605, 8): 该声明曾在此处标记为已弃用。
        document.execCommand('Copy');
        document.body.removeChild(ele);
        this.$message.success('复制成功！');
        this.$emit('copy', this.copyValue);
      }
    },
  },
};
</script>

<style scoped lang="less">
.tip-box {
  cursor: pointer;
  .icon {
    font-size: 16px;
    color: #909399;
  }
  .tip-wrapper {
    :first-child {
      display: inline-block;
    }
  }
}
.app-tip {
  cursor: pointer;
}

.app-copy {
  cursor: pointer;
}

.app-icon {
  font-size: 14px;
  color: grey;
}
</style>
