### `createDialog`

使用`createDialog`创建服务式弹窗。支持所有`el-dialog`的 attribute,并且新增了部分 props。支持所有 Event。

#### 基本使用。

content 可以传入字符串、组件对象、渲染函数或 JSX 函数。其他参数见下表。

```html
<template>
  <div>
    <el-button @click="openDialog" size="small" type="primary">打开弹窗</el-button>
    <ul>
      <li @click="useType(1)">普通文字</li>
      <li @click="useType(2)">组件</li>
      <li @click="useType(3)">渲染函数</li>
      <li @click="useType(4)">JSX</li>
    </ul>
  </div>
</template>
<script>
  import cpn from './cpn.vue';
  export default {
    components: { cpn },
    data: () {
      type: '使用普通文字',
    },
    methods: {
      useType(type) {
        switch (type) {
          case 1:
            type = '使用普通文字';
          case 2:
            type = cpn;
          case 3:
            type = h => {
              return h("h1", {
                style: { color: "#f56c6c", },
                domProps: { innerHTML: "这是使用渲染函数打开的dialog", },
              });
            };
          case 4:
            // 此时script标签添加参数 lang="jsx"
            type = h => {
              return (
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
              );
            }
        }
      },
      openDialog() {
        this.tpsCreateDialog({
          title: '服务式弹窗基本使用',
          content: type,
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
```

#### cpn 组件如何调用 Dialog 方法

可使用 props 引入 `params`,`dialog`。其中`params`是创建组件时传入的`params`;`dialog`包含弹框组件的 props 和 methods。

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
      <el-button @click="cancel" class="cu-btn" type="plain">关闭</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['params', 'dialog'],
    methods: {
      cancel() {
        this.dialog.methods.close();
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

使用说明 `createDialog(parmas: DialogConfig) {...}`

| 参数                 | 说明                                   | 类型       | 默认值     |
| -------------------- | -------------------------------------- | ---------- | ---------- | -------- | ---- | ------ |
| ElementUI 原有的参数 | 一致                                   | 一致       | 一致       |
| content              | 弹窗显示的内容                         | `string    | component  | render() | jsx` | `null` |
| params               | 传递给弹窗的参数[（1）](#1)            | `any`      | `null`     |
| okText               | 确定按钮文本                           | `string`   | 确定       |
| cancelText           | 取消按钮文本                           | `string`   | 取消       |
| footer               | 是否显示默认的 footer[（2）](#2)       | `boolean`  | `true`     |
| open                 | 弹窗打开触发该回调                     | `function` | `()=>{}`   |
| opened               | 弹窗打开动画结束后触发该回调           | `function` | `()=>{}`   |
| close                | 弹窗关闭触发该回调                     | `function` | `()=>{}`   |
| closed               | 弹窗关闭动画结束后触发该回调           | `function` | `()=>{}`   |
| confirm              | 当 footer 为`true`时点击确定按钮时回调 | `function` | `this=>{}` |
| cancel               | 当 footer 为`true`时点击取消按钮时回调 | `function` | `this=>{}` |

说明：

（1）传入的`params`是使用 prop 传入的，所以组件内部不能改变`params`的值。而且需要引入 `props: ['params']`才能使用。

（2）当 footer 设为 false 时，即代表自定义 footer，原来 footer 就没有了。此时需要在传入的自定义组件上引入 `props: ['dialog']`，然后调用`this.dialog.methods.close()`关闭弹窗。

```ts
DialogConfig = {
  ...originProp, // ElementUI Dialog 组件的属性
  content: string | Component | Function<Render> | Function<JSX>,
  params: any,
  okText: string,
  cancelText: string,
  footer: boolean
};
```
