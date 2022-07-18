<template>
  <div>
    <button @click="setNull"> 置空 </button>
    <p> {{ data | tpsEmpty }} </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '我好喜欢上班呀',
    }
  },
  methods: {
    setNull() {
      this.data = null
    }
  }
};
</script>
