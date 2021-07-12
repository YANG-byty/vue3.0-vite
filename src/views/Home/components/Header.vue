<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">
      {{ title }}
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <!-- <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div> -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/images/user.png" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="settings"
                >用户设置
              </el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
      title="用户设置"
      v-model="settingsFlag"
      direction="rtl"
      size="30%"
      custom-class="settings-drawer"
    >
      <div class="settings-drawer__content">
        <el-form>
          <el-form-item label="活动名称">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="settings-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button @click="handleClose" type="primary" :loading="loading">{{
          loading ? "提交中 ..." : "确 定"
        }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import bus from "@/utils/bus.js";
import setToken from "@/settings.js";
export default {
  data() {
    return {
      loading: false,
      settingsFlag: false,
      collapse: false,
      fullscreen: false,
      name: "",
      title: setToken.title,
    };
  },
  computed: {
    username() {
      let username = JSON.parse(sessionStorage.getItem("userInfo")).userName;
      return username ? username : this.name;
    },
  },
  methods: {
    // 设置提交
    handleClose() {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.settingsFlag = false;
        })
        .catch((_) => {});
    },
    // 关闭抽屉
    cancelForm() {
      this.loading = false;
      this.settingsFlag = false;
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      console.log(command);
      if (command == "loginout") {
        this.$store.dispatch("actLogout").then(() => {
          sessionStorage.removeItem(setToken.token);
          this.$router.push("/login");
        });
      } else if (command == "settings") {
        this.settingsFlag = true;
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
      setTimeout(() => {
        // console.log(element.clientHeight);
        this.$store.commit("windowHFn", document.body.clientHeight);
      }, 200);
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    this.$store.commit("windowHFn", document.body.clientHeight);
  },
};
</script>
<style lang="less" scoped>
.header {
  /* position: relative; */
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  user-select: none;
  .settings-drawer__content {
    padding: 1rem;
  }
  .settings-drawer {
    position: relative;
    .settings-drawer__footer {
      position: absolute;
      left: 2rem;
      bottom: 2rem;
      text-align: center;
    }
  }
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin: 0 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
