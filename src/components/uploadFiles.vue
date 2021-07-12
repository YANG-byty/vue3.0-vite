<!--上传图片组件 -->
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
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog v-model="dialogVisible" width="40rem">
      <div class="img-wrap">
        <img class="img" :src="dialogImageUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { ElMessage, ElMessageBox } from "element-plus"; //状态提示
import { useStore } from "vuex"; //引入状态管理
import {
  inject,
  watchEffect,
  watch,
  computed,
  toRefs,
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
} from "vue";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  setup(props, context) {
    const files = {
      busyKey: inject("busyKey"),
      busyId: inject("busyId"),
      delImageUrl: inject("delImageUrl"),
      uplImageUrl: inject("uplImageUrl"),
      imageList: inject("imageList"),
    };

    //methods方法集合
    const methods = {
      // 上传成功
      okUpload(file) {
        console.log(file);
        data.fileList.push(file.data[0].url);
        data.dialogImageUrl = file.result;
        data.uploadDisabled = true;
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        data.dialogImageUrl = file.url;
        data.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
    };

    //data数据定义及初始化
    const data = reactive({
      fileList: [],
      uploadDisabled: false,
      dialogImageUrl: "",
      dialogVisible: false,
    });

    onBeforeMount(() => {
      // 生命周期 - 挂载之前
    });
    onMounted(() => {
      // 生命周期 - 挂载完成（可以访问DOM元素）
      console.log(files);
    });
    onBeforeUpdate(() => {
      // 生命周期 - 更新之前
    });
    onUpdated(() => {
      // 生命周期 - 更新之后
    });
    onBeforeUnmount(() => {
      // 生命周期 - 销毁之前
    });
    onUnmounted(() => {
      // 生命周期 - 销毁完成
    });
    onActivated(() => {
      // 如果页面有keep-alive缓存功能，这个函数会触发
    });

    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      files,
    };
  },
};
</script>
<style lang="less" scoped>
.imgList {
  :deep(.el-upload--picture-card),
  :deep(.el-upload-list__item) {
    height: 90px;
    width: 90px;
    line-height: 100px;
  }

  :deep(.el-icon-upload-success) {
    position: absolute;
    top: 0px;
    left: 13px;
  }

  :deep(.el-upload-list--picture-card) {
    display: inline-block;
    white-space: nowrap;
    max-width: 50rem;
    overflow-x: auto;
  }
}

.img-wrap {
  width: 100%;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  user-select: none;
  .img {
    width: 30rem;
    height: 30rem;
    margin: auto;
  }
}
</style>
