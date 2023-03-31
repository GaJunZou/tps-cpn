<template>
  <div class="tps-input">
    <el-input
      :placeholder="placeholder"
      v-model.trim="inputValue"
      :readonly="readonly"
      clearable
      :maxlength="maxlength"
    >
      <template slot="append" v-if="limit">{{ inputLength }}/{{ limit }}</template>
      <template slot="append" v-else>{{ inputLength }}项</template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    limit: {
      type: Number,
      default: 100,
    },
    value: {
      type: String,
      default: '2222',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    inputLength() {
      if (this.inputValue === '') return 0;
      return this.inputValue.split(',').filter((v) => v).length;
    },
    maxlength() {
      if (this.limit && this.inputLength === this.limit) {
        return this.inputValue.length;
      }
      return null;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.tps-input {
  width: 240px;
}
</style>
