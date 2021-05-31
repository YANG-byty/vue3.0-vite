<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content-box">
      <div class="sidebr">
        <v-sidebar></v-sidebar>
      </div>
      <div class="content">
        <v-tags></v-tags>
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "/@/utils/bus.js";
import vHead from "./components/Header.vue";
import vSidebar from "./components/Sidebar.vue";
import vTags from "./components/Tags.vue";
export default {
  components: {
    vHead,
    vSidebar,
    vTags,
  },
  data() {
    return {
      tagsList: [],
    };
  },
  methods: {},
  created() {
    // this.$store.dispatch("getSchoolBox");
    // this.$store.dispatch("getClassListBox");
    bus.on("collapse-content", (msg) => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.on("tags", (msg) => {
      console.log(msg);
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
};
</script>
