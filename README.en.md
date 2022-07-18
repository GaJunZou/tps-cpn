# bgv-ui

### 介绍

使用 Vue + ElementUI 封装的可用于大型 erp 的组件库。

### 软件架构

软件架构说明

### 安装教程

1. npm i bgv-ui

### 使用说明

1. `import BgvUI from 'bgv-ui';`
2. `import 'bgv-ui.css';`
3. `Vue.use(BgvUI);`
4. `this.createDialog({content: 'text'});`

### 使用示例

#### component

##### 1. `checkbox-panel`

一个使用 grid 布局的多选数据面板,你需要设置父标签的宽高以限制`checkbox-panel`的大小。
<template>
  <my-container>
    <checkbox-panel-demo></checkbox-panel-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/checkbox-panel-demo.vue


| 参数      | 说明                                       | 类型                               | 值     |
| --------- | ------------------------------------------ | ---------------------------------- | ------ |
| v-model   | 选中的 item                                | `Array<{value: any; label: string}>` | [ ]    |
| options   | 必填，根据改 options 显示数据              | `Array<{value: any; label: string}>` | [ ]    |
| rowsCount | 每行显示 item 数                           | number                             | 4      |
| rowsWidth | 每个 item 宽,可传带单位的宽如'120px','10%' | string                             | 'auto' |

##### 2. `children-select`

一个封装`checkbox-panel`的树结构多选选择器。

<template>
  <my-container>
    <children-select-demo></children-select-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/children-select-demo.vue


| 参数        | 说明                                       | 类型                                                                              | 值      |
| ----------- | ------------------------------------------ | --------------------------------------------------------------------------------- | ------- |
| v-model     | 选中的 item                                | `Array<{value: any; label: string}>`                                                | [ ]     |
| options     | 必填，根据改 options 显示数据              | `Array<{value: any; label: string; children: Array<{value: any; label: string;}>}>` | [ ]     |
| rowsCount   | 每行显示 item 数                           | number                                                                            | 4       |
| rowsWidth   | 每个 item 宽,可传带单位的宽如'120px','10%' | string                                                                            | 'auto'  |
| placeholder | 占位提示文字                               | atring                                                                            | ''      |
| size        | 与原生 ElementUI size 相同                 | string                                                                            | 'small' |
| label       | 选择器左边的说明文字                       | string                                                                            | ''      |
| width       | 选择器的宽                                 | string                                                                            | '200px' |
| expand      | 是否默认展开                               | boolean                                                                           | false   |

##### 3. `multiple-select`

一个封装`checkbox-panel`可分页、可搜索的多选选择器。

<template>
  <my-container>
    <multiple-select-demo></multiple-select-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/multiple-select-demo.vue


| 参数        | 说明                          | 类型                                                                              | 值      |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------- | ------- |
| v-model     | 选中的 item                   | `Array<{value: any; label: string}>`                                                | [ ]     |
| options     | 必填，根据改 options 显示数据 | `Array<{value: any; label: string; children: Array<{value: any; label: string;}>}>` | [ ]     |
| rowsCount   | 每行显示 item 数              | number                                                                            | 4       |
| placeholder | 占位提示文字                  | atring                                                                            | ''      |
| size        | 与原生 ElementUI size 相同    | string                                                                            | 'small' |
| label       | 选择器左边的说明文字          | string                                                                            | ''      |
| width       | 选择器的宽                    | string                                                                            | '200px' |
| width       | 选择器的宽                    | string                                                                            | '200px' |
| pageSzie    | 每页数据量                    | number                                                                            | 60      |
| returnType  | 返回类型                      | string                                                                            | 'Array' |

##### 4.`nav-location` 
一个可定位组件。

<template>
  <my-container>
    <nav-location-demo></nav-location-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/nav-location-demo.vue

`nav-location`
|参数|说明|类型|值|
|--|--|--|--|
|color|右边内容轴活跃时文字颜色|string|'#409eff'|
|width|整个 nav-location 的宽。默认 100%|string|''|
|height|整个 nav-location 的宽。默认 100%|string|'800px'|

`nav-item`
|参数|说明|类型|值|
|--|--|--|--|
|content|右边内容轴的 content，由左边`nav-item`决定|string|''|

##### 5. `search-table-page`

集成`search-bar`、`el-table`、`el-pagination`的组件。


<template>
  <my-container>
    <search-table-page-demo></search-table-page-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/search-table-page-demo.vue


`search-table-page`
props
|参数|说明|类型|值|
|--|--|--|--|
|height|该组件总高度，为 auto 时视内容高度。|string|'auto'|
|showPagination|是否展示分页|boolean|true|
|paginationConfig|分页配置，与 el-pagination 配置保持一致，|object|见下面|

```js
paginationConfig = {
  currentPage: 1,
  pageSizes: [50, 100, 300, 500],
  pageSize: 50,
  total: 500,
  layout: "total, sizes, prev, pager, next, jumper",
};
```

slot
|slot name|说明|
|--|--|
|search-bar|搜索栏，建议使用`<search-bar>`，已编写对应的自适应样式|
|table|表格内容|

`search-bar`
event
|参数|说明|$event|
|--|--|--|--|
|searchEvent|点击搜索触发。|null|
|resetEvent|是否暂时分页|null|

`search-item` (`search-item`通常在`search-bar`里使用)
props
|参数|说明|类型|值|
|--|--|--|--|
|width|宽|string|'auto'|

##### 6. `upload`

与`el-upload`配置保持一致，不一样的是，`el-upload`在组件中使用`:prop = "params"`传入，使得每个 prop 都要在 data 里添加对应参数。而封装后，使用`uploadConfig`传入所有 prop，只需要在 data 里添加一个参数后，即可配置任意 prop，保持 dataOption 简洁。


<template>
  <my-container>
    <upload-demo></upload-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/upload-demo.vue

#### directive

##### 1.`v-copy`

点击文本复制



<template>
  <my-container>
    <copy-demo></copy-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/copy-demo.vue


##### 2.`v-null`

当内容为空时用`--`替代

<template>
  <my-container>
    <null-demo></null-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/null-demo.vue


#### service

##### 1. imageView

查看图片大图

<template>
  <my-container>
    <image-view-demo></image-view-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/image-view-demo.vue

`imageView(imageList: Array<url: string>): void {...}`

##### 2. createDialog
使用`createDialog`创建dialog弹窗。支持所有`el-dialog`的attribute,并且新增了部分prop。支持所有Event。

<template>
  <my-container>
    <create-dialog-demo></create-dialog-demo>
  </my-container>
</template>

<<< @/docs/.vuepress/components/create-dialog-demo.vue

`createDialog(parmas: DialogConfig): void {...}`
```js
interface DialogConfig: {
  originProp, newProp, originEvent
}

// el-dialog 原有的 attribute
interface originProp: {
  title?: null,
  width?: '50%',
  fullscreen?: false,
  top?: '15vh',
  modal?: true,
  modalAppendToBody?: true,
  appendToBody?: false,
  lockScroll?: true,
  customClass?: null,
  closeOnClickModal?: true,
  closeOnPressEscape?: true,
  showClose?: true,
  beforeClose?: null,
  center?: false,
  destroyOnClose?: false,
}

// 新增的Attribute
interface newProp: {
  content: null, // dialog里面显示的内容，可以是 String，number | Object（组件） | function （render函数）
  params?: null, // 参数
  okText?: '确定', // 确定按钮文案
  cancelText?: '取消', // 取消按钮文案
  footer?: true, // 是否显示 footer。不显示时，组件注入close方法，可用于关闭弹窗。
  };

interface originEvent: {
  // el-dialog 原有的回调
  open?: () => {},
  opened?: () => {},
  close?: () => {},
  closed?: () => {},
  // 新增的回调
  onConfirm?: () => this, // 点击确定时触发，回调参数为该 dialog 实例 （即this）
  onCancel?: () => this // 点击取消时触发，回调参数为该 dialog 实例 （即this），若不配置该函数则默认调用 close
  };
```

### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

### 特技

暂无
