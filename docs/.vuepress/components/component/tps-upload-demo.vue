<template>
  <div>
    <zz-upload :uploadConfig="uploadConfig">
      <el-button size="small" type="primary">点击上传</el-button>
    </zz-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadConfig: {},
    };
  },
};
</script>
