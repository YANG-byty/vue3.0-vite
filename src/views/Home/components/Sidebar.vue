<template>
  <div class="sidebar">
    <el-menu
      :uniqueOpened="true"
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <!-- v-if="item.type.includes('A')" -->
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- v-if="subItem.type.includes('A')" -->
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <!-- v-if="item.type.includes('A')" -->
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "/@/utils/bus.js";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-house",
          index: "welcome",
          title: "welcome",
        },
        {
          icon: "el-icon-office-building",
          index: "2",
          title: "helloWorld",
          subs: [
            {
              index: "helloWorld",
              title: "helloWorld",
            },
          ],
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      // console.log(this.$route);
      return this.$route.meta.title;
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.on("collapse", (msg) => {
      this.collapse = msg;
      bus.emit("collapse-content", msg);
    });
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  /* position: absolute; */
  /* left: 0; */
  /* top: 70px; */
  height: 100vh;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
