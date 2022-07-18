### 2. createDialog

使用`createDialog`创建服务式弹窗。支持所有`el-dialog`的 attribute,并且新增了部分 props。支持所有 Event。

#### 基本使用

content 可以传入字符串、组件对象、渲染函数或 JSX 函数。其他参数见下表。

<template>
  <my-container>
    <service-tps-create-dialog-demo-1></service-tps-create-dialog-demo-1>
  </my-container>
</template>

<<< @/docs/.vuepress/components/service/tps-create-dialog-demo-1.vue

#### cpn 组件如何调用 Dialog 方法

可使用 props 引入 `params`,`dialog`。其中`params`是创建组件时传入的`params`;`dialog`包含弹框组件的 props 和 methods。

```js
vm.tpsCreateDialog({
  title: '...',
  content: cpn,
  footer: false,
});
```

<<< @/docs/.vuepress/components/service/tps-create-dialog-demo-cpn.vue

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
