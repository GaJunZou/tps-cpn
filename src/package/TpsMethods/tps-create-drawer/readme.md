### `createDrawer`

使用`createDrawer`创建服务式抽屉弹窗。支持所有`el-drawer`的 attribute,并且新增了部分 props。支持所有 Event。

#### 基本使用。

content 可以传入字符串、组件对象、渲染函数或 JSX 函数。其他参数见下表。

```html
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
        this.openDrawer();
      },
      openDrawer() {
        const drawer = this.tpsCreateDrawer({
          title: '服务式抽屉基本使用',
          content: this.type,
          size: '40%',
          customEvent: {
            submit(value) {
              console.log(value);
            },
          },
          onConfirm: (res) => {
            console.log('点击确认时回调');
            inst.close();
          },
          onCancel: (res) => {
            console.log('点击取消时回调');
            inst.close();
          },
          closed: () => {
            console.log('抽屉关闭后回调');
          },
        });
        drawer.show();
      },
    },
  };
</script>
```

#### cpn 组件如何调用 Drawer 方法

通过`customEvent`传入事件进行回调。

```html
<template>
  <div>
    <ul>
      <li>名字: {{ params.name }}</li>
      <li>身高: {{ params.height }}</li>
      <li>体重: {{ params.weight }}</li>
    </ul>
    <div class="btn-container">
      <el-button @click="ok" class="cu-btn" type="primary">确定</el-button>
      <el-button @click="close" class="cu-btn" type="plain">关闭</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      ok() {
        this.$emit('ok');
      },
      cancel() {
        this.$emit('close');
      },
    },
  };
</script>
```

#### 如何在创建弹窗的函数中关闭弹窗

`createDialog`创建弹窗实例后返回了该实例，可通过接收该实例以调用某些方法和属性。

```js
const inst = vm.tpsCreateDialog({
  title: 'test',
  content: 'something content',
  footer: false,
  onConfirm: (res) => {
    console.log('点击确认时回调');
    if (res) {
      inst.methods.close();
    } else {
      console.log('请手动关闭');
    }
  },
});
```

使用说明 `createDrawer(parmas: DrawerConfig) {...}`

| 参数                 | 说明                             | 类型       | 默认值    |
| -------------------- | -------------------------------- | ---------- | --------- | -------- | ---- | ------ |
| ElementUI 原有的参数 | 一致                             | 一致       | 一致      |
| content              | 弹窗显示的内容                   | `string    | component | render() | jsx` | `null` |
| params               | 传递给弹窗的参数[（1）](#1)      | `any`      | `null`    |
| okText               | 确定按钮文本                     | `string`   | 确定      |
| cancelText           | 取消按钮文本                     | `string`   | 取消      |
| footer               | 是否显示默认的 footer[（2）](#2) | `boolean`  | `true`    |
| open                 | 弹窗打开触发该回调               | `function` | `()=>{}`  |
| opened               | 弹窗打开动画结束后触发该回调     | `function` | `()=>{}`  |
| close                | 弹窗关闭触发该回调               | `function` | `()=>{}`  |
| closed               | 弹窗关闭动画结束后触发该回调     | `function` | `()=>{}`  |
| customEvent          | cpn 可 emit 的回调               | `object`   | `{}`      |

返回值：instance

let { close, closed, open, opened, hidden, show } = { ...instance };

instance.show() 展示 drawer

instance.hidden() 隐藏 drawer

instance = null 销毁 drawer

```ts
DrawerConfig = {
  ...originProp, // ElementUI Dialog 组件的属性
  content: string | Component | Function<Render> | Function<JSX>,
  customEvent: {
    [key]: Function
  }
};
```
