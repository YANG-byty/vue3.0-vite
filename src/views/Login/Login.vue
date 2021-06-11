<template>
  <div class="login-wrap">
    <div class="box-wrap">
      <div class="box">
        <img src="@/assets/images/logo2.png" alt="" />
      </div>
      <div class="main-wrap">
        <div class="loginBg2-img">
          <img src="@/assets/images/loginBg2.png" alt="" />
        </div>
        <div class="ms-login">
          <div class="ms-title">账号登录</div>
          <el-form
            :model="param"
            :rules="rules"
            ref="login"
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="username">
              <el-input
                clearable
                v-model="param.username"
                placeholder="username"
              >
                <el-button icon="el-icon-lx-people"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                placeholder="password"
                v-model="param.password"
                @keyup.enter.native="submitForm()"
              >
                <el-button icon="el-icon-lx-lock"></el-button>
              </el-input>
            </el-form-item>
            <div class="text-span">
              <span @click="passwordFn">忘记密码?</span>
            </div>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </div>
            <div style="color: #b5b5b5">
              杭州路灵信息技术有限公司 Copyright©2019
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import systemInfo from "@/api/system.js";
import md5 from "js-md5";
import { ElMessage } from "element-plus";
export default {
  name: "login",
  data: function () {
    return {
      param: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate((valid) => {
        var that = this;
        if (valid) {
          var obj = {
            userName: this.param.username,
            password: md5(this.param.password).toUpperCase(),
          };
          systemInfo.login(obj).then((res) => {
            if (res.success) {
              systemInfo.getPermission().then((res2) => {
                if (res.success) {
                  sessionStorage.setItem("userInfo", JSON.stringify(res2.data));
                  this.$router.push("/");
                } else {
                  ElMessage.success(res2.message);
                }
              });
            } else {
              ElMessage.error(res.message);
            }
          });
        } else {
          ElMessage.error("请输入账号和密码");
          return false;
        }
      });
    },
    passwordFn() {
      this.$alert("请联系系统管理员!", "提示", {
        confirmButtonText: "确定",
        callback: (action) => {
          // this.$message({
          //   type: "info",
          //   message: `action: ${action}`,
          // });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  margin-bottom: 1rem;
}
.box-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: -6%;
  .main-wrap {
    display: flex;
    border-radius: 1rem;
    border: 1px solid #ccc;
  }
}
.loginBg2-img {
  width: 24rem;
  height: 33.18rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login_bg.png");
  background-size: 100%;
  background-color: #fff;
  background-repeat: round;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  width: 350px;
  border-radius: 0 1rem 1rem 0;
  background: rgba(255, 255, 255, 0.3);
  .text-span {
    color: #b5b5b5;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 1.4rem;
  }
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  font-size: 1.6rem;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
