<template>
  <div>
    <tps-nav-location>
      <tps-nav-item v-for="(item, index) in navItems" :key="index" :title="item.title" :info="item.info" :showTitle="true">
        <div
          :style="{
            fontSize: '20px',
            width: '100%',
            height: item.height,
            backgroundColor: item.bgcolor,
          }"
        >
          {{ item.title }}
        </div>
      </tps-nav-item>
    </tps-nav-location>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: "第一个",
          height: "300px",
          bgcolor: "#67c23a",
          title: "内容1",
        },
        {
          name: "第二个",
          height: "200px",
          bgcolor: "#e6a23c",
          title: "内容2",
        },
        {
          name: "第三个",
          height: "150px",
          bgcolor: "#f56c6c",
          title: "内容3",
        },
        {
          name: "第四个",
          height: "250px",
          bgcolor: "#909399",
          title: "内容4",
        },
        {
          name: "第五个",
          height: "300px",
          bgcolor: "#409eff",
          title: "内容5",
        },
        {
          name: "第六个",
          height: "120px",
          bgcolor: "#eee",
          title : "内容6",
        },
      ],
    };
  },
};
</script>
