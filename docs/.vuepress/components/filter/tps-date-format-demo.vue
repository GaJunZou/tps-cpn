<template>
  <div>
    <p class="txt-blue">{{ data1 | tpsDateFormat }}</p>
    <p class="txt-blue">{{ data2 | tpsDateFormat("yyyy-MM-dd") }}</p>
    <p class="txt-blue">{{ data3 | tpsDateFormat("MM-dd hh:mm") }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: new Date(),
      data2: "2022-05-20 11:57:56",
      data3: 1653271889125,
    };
  },
};
</script>
