# rcems-vue

日常养护前端项目-vue 版本

<!--通用模板-->
<template>
  <div class=""></div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { ElMessage, ElMessageBox } from "element-plus"; //状态提示
import { useStore } from "vuex";  //引入状态管理
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
// import引入的组件需要注入到对象中才能使用
  components: {},
  setup(props, context) {

    //methods方法集合
    const methods = {};

    //data数据定义及初始化
    const data = reactive({});

    onBeforeMount(() => {
      // 生命周期 - 挂载之前
    });
    onMounted(() => {
      // 生命周期 - 挂载完成（可以访问DOM元素）
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
    };
  }
}
</script>
<style lang="less" scoped></style>
<!--通用模板-->

<script>
  //setup是生命周期（beforeCreate创建之前、created创建完成）之间的一个状态
  //setup里面所有的(computed的数据、methods中方法及响应式的数据)*必须*都要return出去才能使用
  setup(props, context) {
    //ref、reactive用来定义响应式数据：
    //ref：主要用于基本类型的响应,也可以是引用数据类型。ref如果要修改他的值话只能使用.value进行修改
    const text = ref(0) || ref({ a: 1, b: 2 });
    //reactive：主要用于引用类型的响应。如果使用reactive必须使用toRefs()转成简单数据类型才能使用
    const text = reactive({ a: 1, b: 2 });

    const store = useStore(); //使用vuex仓库
    const oSelectWrap = ref(null); //获取dom元素,必须return出去
    store.dispatch("方法名"); //派遣actions中的方法
    store.commit("方法名"); //提交mutations中的方法

   //computed计算属性的使用:主要是用来监听vuex状态管理中的数据变化、也可以监听data中的数据，但只能监听单个数据
    const paramsByTypeId = computed(() => {
      return store.state.paramsByTypeId;
    });

    //watch的使用方法:可以监听父组件向子组件传递的数据、也可以监听路由变化
    /*监控data中的数据变化
      具备一定的惰性 lazy
      参数可以拿到当前值和原始
      可以侦听多个数据的变化，用一个侦听器承载
    */
    watch(
      () => {
        return data.count;
      },
      (newVal, oldVal) => {
        console.log(newVal + ":===" + oldVal);
      },
      {
        immediate: true, //第一次就会执行回调
        deep: true, //深度监视
      }
    );

    /*立即执行，没有惰性 immediate
    不需要传递你要侦听的内容，自动会感知代码依赖，不需要传递很多参数，只要传递一个回调函数
    watchEffect 不能获取之前数据的值
    */
    watchEffect(() => {
      console.log(data.count);
    });

    //手动停止侦听:
	  const xx=watch(...);
    xx.stop();

    //这两个生命周期主要用来调试的:
    onRenderTracked(({ key, target, type }) => {
      // 跟踪虚拟DOM重新渲染时调用,钩子接收debugger event作为参数,此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。
      // type:set/get操作
      // key:追踪的键
      // target:重新渲染后的键
    });
    onRenderTriggered(({ key, target, type }) => {
      // 当虚拟DOM重新渲染被触发时调用,和renderTracked类似,接收debugger event作为参数,
      // 此事件告诉你是什么操作触发了重新渲染,以及该操作的目标对象和键。
    });

    // 父传(子||孙)  provide 、inject
    provide("ulImg", data.ulImg);  //提供方
    const ulImg = inject("ulImg");  //使用方

    return {
      ...methods,
      ...toRefs(data), //toRefs:将复杂数据类型转为简单数据类型
      oSelectWrap,
      paramsByTypeId,
    };
  }
</script>
<style>
  /* :deep(.el-upload--picture-card)   穿透设置样式  */
</style>
