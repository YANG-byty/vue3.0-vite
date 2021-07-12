<!-- 道路桩号信息 -->
<template>
  <div class="">道路桩号信息</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import {
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
  //import引入的组件需要注入到对象中才能使用
  components: {},
  setup(props, context) {
    //methods方法集合
    const methods = {};
    //data数据定义及初始化
    const data = reactive({});
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
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
    };
  },
};
</script>
<style lang="less" scoped></style>
