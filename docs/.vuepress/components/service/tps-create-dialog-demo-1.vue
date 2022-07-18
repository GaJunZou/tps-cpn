<template>
  <div>
    <ul>
      <el-button @click="useType(1)">普通文字</el-button>
      <el-button @click="useType(2)">组件</el-button>
      <el-button @click="useType(3)">渲染函数</el-button>
      <el-button @click="useType(4)">JSX</el-button>
    </ul>
  </div>
</template>
<script>
import cpn from './tps-create-dialog-demo-cpn.vue';
export default {
  components: { cpn },
  data() {
    return {
      type: '使用普通文字',
    };
  },
  methods: {
    useType(type) {
      switch (type) {
        case 1:
          this.type = '使用普通文字';
          break;
        case 2:
          this.type = cpn;
          break;
        case 3:
          this.type = (h) => {
            return h('h1', {
              style: { color: '#f56c6c' },
              domProps: { innerHTML: '这是使用渲染函数打开的dialog' },
            });
          };
          break;
        case 4:
          // 此时script标签添加参数 lang="jsx"
          this.type = (h) => {
            return (
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            );
          };
          break;
      }
      this.openDialog();
    },
    openDialog() {
      this.tpsCreateDialog({
        title: '服务式弹窗基本使用',
        content: this.type,
        params: {
          name: 'loki',
          height: '179cm',
          weight: '60kg',
        },
        footer: false,
        onConfirm: (res) => {
          console.log('点击确认时回调');
          inst.close();
        },
        onCancel: (res) => {
          console.log('点击取消时回调');
          inst.close();
        },
        closed: () => {
          console.log('弹窗关闭后回调');
        },
      });
    },
  },
};
</script>