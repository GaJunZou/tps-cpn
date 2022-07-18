<template>
  <div class="tps-input">
    <el-input :placeholder="placeholder" v-model.trim="inputValue" :readonly="readonly" clearable>
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
      if (this.value === '') return 0;
      return this.value.split(',').filter((v) => v).length;
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
