<!-- 图片显示组件 -->
<template>
  <div class="modal" v-show="showImgFlag">
    <div class="modal-dialog">
      <div class="modal-title">
        <el-button @click="closeFn" icon="el-icon-close" circle></el-button>
      </div>
      <div class="modal-content" v-if="ulImg.length > 0">
        <div class="bigImg-wrap">
          <block>
            <span class="el-icon-arrow-left" @click="reduceFn"></span>
            <img :src="ulImg[index].url" alt="" />
            <span class="el-icon-arrow-right" @click="addFn"></span>
          </block>
          <div class="remarkText">{{ ulImg[index].msg }}</div>
        </div>
        <div class="ulImg">
          <ul>
            <li @click="liFn(item, i)" v-for="(item, i) in ulImg" :key="i">
              <i>{{ i + 1 }}</i>
              <img :class="index == i ? 'active' : ''" :src="item.url" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="notContent" v-else>亲，暂无要展示的图片呦~</div>
    </div>
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
    const ulImg = inject("ulImg");
    //methods方法集合
    const methods = {
      reduceFn() {
        if (data.index == 0) {
          data.index = ulImg.length - 1;
        } else {
          --data.index;
        }
      },
      addFn() {
        if (data.index == ulImg.length - 1) {
          data.index = 0;
        } else {
          ++data.index;
        }
      },
      liFn(item, index) {
        data.showImgUrl = item.url;
        data.index = index;
      },
      showImgFlagFn() {
        data.showImgFlag = true;
        data.showImgUrl = ulImg[0].url;
      },
      closeFn() {
        data.showImgFlag = false;
      },
    };

    //data数据定义及初始化
    const data = reactive({
      showImgFlag: false,
      showImgUrl: "",
      index: 0,
    });

    onBeforeMount(() => {
      // 生命周期 - 挂载之前
    });
    onMounted(() => {
      // 生命周期 - 挂载完成（可以访问DOM元素）
      data.showImgUrl = ulImg[0].url;
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
      ulImg,
    };
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  outline: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .modal-dialog {
    border-radius: 1rem;
    background: #fff;
    padding: 2rem;
    .modal-title {
      margin: -10px -10px 1rem;
      display: flex;
      justify-content: flex-end;
    }
    .notContent {
      width: 30rem;
      height: 20rem;
      text-align: center;
      line-height: 16rem;
    }
    .modal-content {
      border: 1px solid #efefef;
      padding: 2rem;
      display: flex;
      align-items: center;
      flex-direction: column;

      .bigImg-wrap {
        position: relative;
        width: 40rem;
        height: 50rem;
        margin-bottom: 1rem;
        border: 1px solid #efefef;
        .remarkText {
          position: absolute;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 99;
          width: calc(100% - 20px);
          padding: 10px;
          display: none;
        }
        &:hover .remarkText {
          display: block;
        }
        &:hover span {
          display: block;
        }
        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 10px;
          background-color: #d3dce6;
          border-radius: 50%;
          color: #fff;
          display: none;
        }
        span:hover {
          background-color: #8b9bb1;
        }
        & span:first-child {
          left: 10px;
        }
        & span:last-child {
          right: 10px;
        }
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      .ulImg {
        // border: 1px solid #efefef;
        ul {
          max-width: 80vw;
          white-space: nowrap;
          overflow-x: auto;
          li {
            position: relative;
            display: inline-block;
            padding: 10px;
            padding-right: 0;
            i {
              position: absolute;
              top: 10px;
              right: 0;
              background: #000;
              opacity: 0.3;
              min-width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              color: #fff;
              border-bottom-left-radius: 18px;
            }
            img {
              width: 100px;
              height: 100px;
              cursor: pointer;
              border: 1px solid #efefef;
            }
            .active {
              border: 1px solid #f55;
            }
          }
        }
      }
    }
  }
}
</style>
