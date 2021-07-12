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
      <template v-for="item in buildMenuData.menuModuleList">
        <template v-if="item.subList">
          <el-submenu :index="item.name" :key="item.name">
            <template #title>
              <i :class="item.icon ? item.icon : 'el-icon-reading'"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subList">
              <el-submenu
                v-if="subItem.subList.length > 0"
                :index="subItem.name"
                :key="subItem.name"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subList"
                  :key="i"
                  :index="threeItem.name"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.name" :key="subItem.name">{{
                subItem.title
              }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.name" :key="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
// import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      collapse: false,
    };
  },
  computed: {
    onRoutes() {
      return this.$route.meta.index;
    },
    buildMenuData() {
      return this.$store.state.buildMenuData;
    },
    // ...mapState(["buildMenuData"]),
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.on("collapse", (msg) => {
      this.collapse = msg;
      bus.emit("collapse-content", msg);
    });
  },
  mounted() {},
};
</script>

<style scoped>
.sidebar {
  display: block;
  height: calc(100vh - 70px);
  bottom: 0;
  overflow-y: scroll;
  user-select: none;
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
