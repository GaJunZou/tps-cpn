<template>
  <div>
    <!-- <el-tag effect="dark">
      {{ props.name || '标签' }}
    </el-tag> -->
    <el-drawer
      :visible.sync="drawerVisible"
      :append-to-body="props.appendToBody"
      :before-close="props.beforeClose"
      :close-on-press-escape="props.closeOnPressEscape"
      :custom-class="props.customClass"
      :destroy-on-close="props.destroyOnClose"
      :modal="props.modal"
      :modal-append-to-body="props.modalAppendToBody"
      :direction="props.direction"
      :show-close="props.showClose"
      :size="props.size"
      :title="props.title"
      :wrapper-closable="props.wrapperClosable"
      :with-header="props.withHeader"
      @open="open"
      @opened="opened"
      @close="close"
      @closed="closed"
    >
      <component ref="drawerContent" :is="props.content" v-bind="props.params"></component>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawerVisible: false,
      first: true,
    };
  },
  mounted() {},
  props: {
    props: {
      type: Object,
    },
  },
  methods: {
    bindEvent() {
      if (this.first) {
        this.$nextTick(() => {
          let content = this.$refs.drawerContent;
          for (const key in this.props.customEvent) {
            if (Object.hasOwnProperty.call(this.props.customEvent, key)) {
              const callback = this.props.customEvent[key];
              content.$on(key, callback);
            }
          }
        });
      }
      this.first = false;
    },
    show() {
      this.drawerVisible = true;
      this.bindEvent();
    },
    hidden() {
      this.drawerVisible = false;
    },
    open() {
      this.$emit('open');
    },
    opened() {
      this.$emit('opened');
    },
    close() {
      this.dialogVisible = false;
      this.$emit('close');
    },
    closed() {
      this.$emit('closed');
    },
  },
};
</script>
