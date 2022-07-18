<template>
  <div>
    <tps-cascader v-model="data" :options="options" :fieldConfig="fieldConfig"></tps-cascader>
    <div>已选择：{{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldConfig: {
        value: 'id',
        label: 'name',
        children: 'sub',
        disabled: 'disabled',
      },
      data: null,
      options: [
        {
          id: 'zhinan',
          name: '指南',
          sub: [
            {
              id: 'shejiyuanze',
              name: '设计原则',
              sub: [
                {
                  id: 'yizhi',
                  name: '一致',
                },
              ],
            },
            {
              id: 'daohang',
              name: '导航',
              sub: [
                {
                  id: 'cexiangdaohang',
                  name: '侧向导航',
                },
              ],
            },
          ],
        },
        {
          id: 'ziyuan',
          name: '资源',
          sub: [
            {
              id: 'axure',
              name: 'Axure Components',
            },
            {
              id: 'sketch',
              name: 'Sketch Templates',
            },
          ],
        },
      ],
    };
  },
};
</script>