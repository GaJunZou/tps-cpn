<!-- # bgv-ui

### 介绍

使用 Vue + ElementUI 封装的可用于大型 erp 的组件库。

### 软件架构

软件架构说明

### 安装教程

1. npm i bgv-ui

### 使用说明

1. `import ZzCpn from 'zz-cpn'`
2. `import 'zz-cpn.css';`
3. `Vue.use(ZzCpn);`
4. `this.createDialog({content: 'text'});`

### npm发布流程

1. 登录npm

`npm login`

Username: `zaugazeon`

Password: `********`

Email: (this IS public) `1273614957@qq.com`

npm notice Please check your email for a one-time password (OTP)

Enter one-time password from your authenticator app: 58541456

Logged in as zaugazeon on https://registry.npmjs.org/.


2.修改package.json和项目打包

先打包：`npm run lib`

然后再本地尝试引入lib下的包，成功后把路径放到package.json > main 下

```js
{
  "main": "lib/zz-cpn.umd.min.js",
}
```

发布时会根据name作为包名。如果是更新包，需要更新version，否则无法进行发布。

3.发布

`npm publish`

### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request -->

请查阅：[在线文档](https://gajunzou.github.io/tps-cpn/)
