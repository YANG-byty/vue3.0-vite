<!--  -->
<template>
  <div>
    <div class="">欢迎使用日常养护管理系统</div>
    <div>
      <uploadFiles
        :busyKey="busyKey"
        :delImageUrl="delImageUrl"
        :uplImageUrl="uplImageUrl"
        :imageList="imageList"
        :busyId="busyId"
      ></uploadFiles>
    </div>
    <el-button type="primary" @click="showImgFn">展示图片</el-button>
    <el-button type="primary" @click="Fn3">展示图片</el-button>
    <showImg ref="showImgModal" :ulImg="ulImg"></showImg>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import uploadFiles from "./uploadFiles.vue";
import showImg from "./showImg.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    uploadFiles,
    showImg,
  },
  data() {
    //这里存放数据
    return {
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    showImgFn() {
      this.showImgFn = true;
      this.$refs.showImgModal.showImgFlagFn();
    },
    Fn3() {
      this.ulImg.shift();
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeUnmount() {}, //生命周期 - 销毁之前
  unmounted() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style></style>
