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
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
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
import bus from "@/utils/bus.js";
// import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-s-home",
          index: "welcome",
          title: "welcome",
        },
        {
          icon: "el-icon-s-tools",
          index: "System",
          title: "系统管理",
          subs: [
            {
              index: "menu",
              title: "系统菜单",
            },
            {
              index: "department",
              title: "部门管理",
            },
            {
              index: "params",
              title: "码表管理",
            },
          ],
        },
        {
          icon: "el-icon-s-data",
          index: "EssentialData",
          title: "基础数据",
          subs: [
            {
              index: "deviceInfo",
              title: "设备信息",
            },
            {
              index: "greenblankroad",
              title: "绿化空白路段",
            },
            {
              index: "worktype",
              title: "施工类型",
            },
            {
              index: "sructure",
              title: "结构物",
              subs: [
                {
                  index: "bridge",
                  title: "桥梁",
                },
                {
                  index: "side",
                  title: "边坡路堤挡墙",
                },
                {
                  index: "hub",
                  title: "互通枢纽",
                },
              ],
            },
          ],
        },
        {
          icon: "el-icon-document-copy",
          index: "DailyMaintenance",
          title: "日常养护",
          subs: [
            {
              index: "repairworkmain",
              title: "小修",
            },
          ],
        },
        {
          icon: "el-icon-s-cooperation",
          index: "SpecialConserve",
          title: "专项养护",
          subs: [
            {
              index: "specialConserve",
              title: "专项养护",
            },
          ],
        },
        {
          icon: "el-icon-coin",
          index: "CostBudget",
          title: "费用预算",
          subs: [
            {
              index: "costBudget",
              title: "费用预算",
            },
          ],
        },
        {
          icon: "el-icon-s-opportunity",
          index: "EmergencyResponse",
          title: "应急响应",
          subs: [
            {
              index: "emergencyResponse",
              title: "应急响应",
            },
          ],
        },
        {
          icon: "el-icon-pie-chart",
          index: "StatisticsExamine",
          title: "统计查询",
          subs: [
            {
              index: "statisticsExamine",
              title: "统计查询",
            },
          ],
        },
        {
          icon: "el-icon-s-platform",
          index: "Construction",
          title: "施工管理",
          subs: [
            {
              index: "dayworkmain",
              title: "台班登记",
            },
            {
              index: "propact",
              title: "工程合同",
            },
            {
              index: "orderSheet",
              title: "任务指令单",
            },
            {
              index: "requestsheet",
              title: "施工申请单",
            },
          ],
        },
        {
          icon: "el-icon-document",
          index: "Patrol",
          title: "巡查管理",
          subs: [
            {
              index: "carroadmain",
              title: "统计查询",
            },
          ],
        },
        {
          icon: "el-icon-document-checked",
          index: "WorkExamine",
          title: "工作考核",
          subs: [
            {
              index: "circleabsence",
              title: "考勤管理",
            },
          ],
        },
        {
          icon: "el-icon-chat-line-round",
          index: "DreamSend",
          title: "短信管理",
          subs: [
            {
              index: "template",
              title: "短信模板",
            },
          ],
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.meta.index;
    },
    // buildMenuData() {
    //   return this.$store.state.buildMenuData;
    // },
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
