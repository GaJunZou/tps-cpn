<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="props.title"
    :width="props.width"
    :fullscreen="props.fullscreen"
    :top="props.top"
    :modal="props.modal"
    :modalAppendToBody="props.modalAppendToBody"
    :appendToBody="props.appendToBody"
    :lockScroll="props.lockScroll"
    :customClass="props.customClass"
    :closeOnClickModal="props.closeOnClickModal"
    :closeOnPressEscape="props.closeOnPressEscape"
    :showClose="props.showClose"
    :beforeClose="props.beforeClose"
    :center="props.center"
    :destroyOnClose="props.destroyOnClose"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
  >
    <component :is="props.content" v-bind="props.params" :dialog.sync="dialog"></component>
    <span v-if="props.footer" slot="footer" class="dialog-footer">
      <el-button @click="cancel()">
        {{ props.cancelText }}
      </el-button>
      <el-button type="primary" @click="confirm()">
        {{ props.okText }}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      data: {},
      dialog: {},
    };
  },
  mounted() {
    this.dialogVisible = true;
    this.dialog.props = this.props;
    this.dialog.methods = {
      open: this.open,
      opened: this.opened,
      close: this.close,
      closed: this.closed,
      onConfirm: this.confirm,
      onCancel: this.cancel,
    };
    console.log(this.props);
  },
  props: {
    props: {
      type: Object,
    },
  },
  methods: {
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
    confirm() {
      this.$emit('onConfirm', this);
    },
    cancel() {
      this.$emit('onCancel', this);
    },
  },
};
</script>
