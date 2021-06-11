<!-- 上传图片组件 -->
<template>
  <div class="upload">
    <el-upload
      class="imgList"
      action="https://learn-cms-api.frp.hanku.net.cn//common/oss/upload"
      list-type="picture-card"
      :on-success="okUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      name="files"
      :multiple="true"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" width="40rem">
      <div class="img-wrap">
        <img class="img" :src="dialogImageUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    busyKey: String,
    busyId: String,
    delImageUrl: String,
    uplImageUrl: String,
    imageList: Array,
  },
  data() {
    return {
      fileList: [],
      uploadDisabled: false,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //上传成功
    okUpload(file) {
      console.log(file);
      this.fileList.push(file.data[0].url);
      this.dialogImageUrl = file.result; //专区logoId
      this.uploadDisabled = true;
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeUnmount() {}, //生命周期 - 销毁之前
  unmounted() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
:deep(.imgList .el-upload--picture-card),
:deep(.imgList .el-upload-list .el-upload-list__item) {
  height: 90px;
  width: 90px;
  line-height: 100px;
}
:deep(.imgList
    .el-upload-list--picture-card
    .el-upload-list__item-status-label
    i) {
  position: absolute;
  top: 0px;
  left: 13px;
}
:deep(.imgList .el-upload-list--picture-card) {
  display: inline-block;
  white-space: nowrap;
  max-width: 71rem;
  overflow-x: auto;
}
.img-wrap {
  width: 100%;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  .img {
    width: 30rem;
    height: 30rem;
    margin: auto;
  }
}
</style>
