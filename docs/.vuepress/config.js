const path = require('path');

module.exports = {
  publicPath: '../../',
  assetsDir: 'static',
  title: 'tps-cpn',
  description: 'tps-cpn文档',
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/docs/.vuepress/dist/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    displayAllHeaders: true,
    sidebar: {
      '/': [
        {
          title: 'tps',
          name: 'common',
          collapsable: false,
          children: [
            {
              title: '组件',
              collapsable: false,
              sidebarDepth: 0,
              children: [
                '/guide/component/tps-checkbox-panel',
                '/guide/component/tps-group-list',
                '/guide/component/tps-checkbox-list',
                '/guide/component/tps-tree',
                '/guide/component/tps-nav-location',
                '/guide/component/tps-layout',
                '/guide/component/tps-cascader',
                '/guide/component/tps-sorter',
              ],
            },
            {
              title: '指令',
              collapsable: false,
              sidebarDepth: 0,
              children: ['/guide/directive/v-copy', '/guide/directive/v-compact'],
            },
            {
              title: '过滤器',
              collapsable: false,
              sidebarDepth: 0,
              children: ['/guide/filter/tps-empty', '/guide/filter/tps-date-format'],
            },
            {
              title: '方法',
              collapsable: false,
              sidebarDepth: 0,
              children: ['/guide/service/tps-view-img', '/guide/service/tps-create-dialog'],
            },
          ],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
        '@utils': path.resolve(__dirname, '../../src/utils'),
        '@package': path.resolve(__dirname, '../../src/package'),
      },
    },
  },
};
