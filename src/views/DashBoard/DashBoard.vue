<!-- 仪表盘 -->
<template>
  <div>
    <div class="">欢迎使用日常养护管理系统</div>
    <div style="margin: 1rem 0">
      <uploadFiles></uploadFiles>
    </div>
    <el-button type="primary" @click="showImgFn">展示图片</el-button>
    <el-button type="primary" @click="Fn3">展示图片</el-button>
    <showImg ref="showImgModal"></showImg>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import uploadFiles from "@/components/uploadFiles.vue";
import showImg from "@/components/showImg.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import {
  provide,
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
  name: "dashboard",
  //import引入的组件需要注入到对象中才能使用
  components: {
    uploadFiles,
    showImg,
  },
  setup(props, context) {
    const showImgModal = ref(null);
    //methods方法集合
    const methods = {
      showImgFn() {
        data.showImgFn = true;
        showImgModal.value.showImgFlagFn();
      },
      Fn3() {
        data.ulImg.shift();
      },
    };
    //data数据定义及初始化
    const data = reactive({
      busyKey: "",
      busyId: "",
      delImageUrl: "/delImage.do", //删除图片的接口名称
      uplImageUrl: "/upload.do", //上传图片的接口名称,
      imageList: [],
      ulImg: [
        {
          url: "/src/assets/images/401.gif",
          msg: "内容1",
        },
        {
          url: "/src/assets/images/404.png",
          msg: "内容2",
        },
        {
          url: "/src/assets/images/404_cloud.png",
          msg: "内容3",
        },
        {
          url: "/src/assets/images/404.png",
          msg: "内容4",
        },
        {
          url: "/src/assets/images/login_bg.png",
          msg: "内容5",
        },
        {
          url: "/src/assets/images/404.png",
          msg: "内容6",
        },
        {
          url: "/src/assets/images/401.gif",
          msg: "内容7",
        },
        {
          url: "/src/assets/images/login_bg.png",
          msg: "内容8",
        },
        {
          url: "/src/assets/images/401.gif",
          msg: "内容9",
        },
        {
          url: "/src/assets/images/login_bg.png",
          msg: "内容10",
        },
      ],
    });
    onBeforeMount(() => {
      //生命周期 - 创建之前
    });
    onMounted(() => {
      //生命周期 - 挂载完成（可以访问DOM元素）
    });
    onBeforeUpdate(() => {
      //生命周期 - 更新之前
    });
    onUpdated(() => {
      //生命周期 - 更新之后
    });
    onBeforeUnmount(() => {
      //生命周期 - 销毁之前
    });
    onUnmounted(() => {
      //生命周期 - 销毁完成
    });
    onActivated(() => {
      //如果页面有keep-alive缓存功能，这个函数会触发
    });
    watch(
      () => {
        return [...data.ulImg];
      },
      (newVal, oldVal) => {
        console.log(newVal);
      },
      {
        immediate: true, //第一次就会执行回调
        deep: true, //深度监视
      }
    );
    watchEffect(() => {
      // console.log([...data.ulImg]);
    });
    provide("ulImg", data.ulImg);
    provide("busyKey", data.busyKey);
    provide("busyId", data.busyId);
    provide("delImageUrl", data.delImageUrl);
    provide("uplImageUrl", data.uplImageUrl);
    provide("imageList", data.imageList);

    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      showImgModal,
    };
  },
};
</script>
<style lang="less" scoped></style>
