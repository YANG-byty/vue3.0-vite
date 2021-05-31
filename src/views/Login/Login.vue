<template>
  <div class="login-wrap">
    <div class="box-wrap">
      <div class="box">
        <img src="/@/assets/images/logo2.png" alt="" />
      </div>
      <div class="main-wrap">
        <div class="loginBg2-img">
          <img src="/@/assets/images/loginBg2.png" alt="" />
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
              <el-input v-model="param.username" placeholder="username">
                <el-button icon="el-icon-lx-people"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
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
// import request from "/@/utils/request.js";
import md5 from "js-md5";
// import { mapMutations } from "vuex";
export default {
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
    CalcuMD5(pwd) {
      pwd = pwd.toUpperCase();
      pwd = md5(pwd);
      return pwd;
    },
    submitForm() {
      this.$refs.login.validate((valid) => {
        var that = this;
        if (valid) {
          var obj = {
            userCode: this.param.username,
            userPassword: this.CalcuMD5(this.param.password),
          };
          // Login(obj).then((res) => {
          //   console.log(res);
          //   if (res.code == 200) {
          //     this.$message.success(res.msg);
          sessionStorage.setItem("userInfo", JSON.stringify("123456"));
          this.$router.push("/");
          //   } else {
          //     this.$message.error(res.msg);
          //   }
          // });
        } else {
          this.$message.error("请输入账号和密码");
          // console.log('error submit!!');
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
  background-image: url("/@/assets/images/login_bg.png");
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
