<!-- 系统用户 -->
<template>
  <div class="user">
    <div class="condition-wrap">
      <div class="block">
        <span>登录账号：</span>
        <el-input v-model="account" placeholder="请输入账号"></el-input>
      </div>
      <div class="block">
        <span>用户姓名：</span>
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      </div>
      <div class="block">
        <span>部门：</span>
        <el-select
          v-model="userDepartmentList"
          placeholder="请选择部门"
          multiple
          collapse-tags
          clearable
        >
          <el-option
            v-for="item in userDepartmentArr"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option
        ></el-select>
      </div>
      <div class="block">
        <span>状态：</span>
        <el-select v-model="status" placeholder="全部">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn-wrap">
      <div class="btn-left">
        <el-button
          v-if="PermissionFn('sys:user:add')"
          type="primary"
          icon="el-icon-circle-plus-outline"
          plain
          @click="addFn"
          >新增</el-button
        >
        <el-button
          v-if="PermissionFn('sys:user:delete')"
          type="primary"
          icon="el-icon-delete"
          plain
          @click="deleteFn"
          >删除</el-button
        >
        <el-button
          v-if="PermissionFn('sys:user:export')"
          type="primary"
          :icon="exportBtnIcon"
          plain
          @click="exportFn"
          >导出</el-button
        >
      </div>
      <div class="btn-right">
        <el-button type="primary" icon="el-icon-search" plain @click="queryFn"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-refresh-left"
          plain
          @click="resetFn"
          >重置</el-button
        >
      </div>
    </div>
    <div class="tab-wrap">
      <div v-show="oSelectWrap" class="select-wrap">
        <el-checkbox-group v-model="checkedColumn" @change="columnChangeFn">
          <el-checkbox
            v-for="item in tableColumnValue"
            :key="item.prop"
            :label="item.prop"
            :checked="item.checked"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
        <div class="select-btn">
          <el-button type="primary" plain @click="oSelectWrap = false"
            >关闭</el-button
          >
        </div>
      </div>
      <el-table
        v-loading="loading"
        border
        stripe
        :data="userPage.dataList"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="650"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          :resizable="true"
          align="center"
        />
        <el-table-column
          type="index"
          width="60"
          :resizable="true"
          align="center"
          label="序号"
          header-align="center"
        />
        <el-table-column
          v-for="item in tableColumnList"
          :key="item.prop"
          :resizable="true"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          show-overflow-tooltip
          stripe="true"
          header-align="center"
          align="center"
        />
        <el-table-column
          :resizable="true"
          width="340"
          fixed="right"
          align="center"
        >
          <template #header="header" slot-scope="scope">
            <span
              >操作<i
                class="iconfont icon-shaixuan1 iconSelect"
                @click="oSelectWrap = !oSelectWrap"
            /></span>
          </template>
          <template #default="scope">
            <el-button
              v-if="PermissionFn('sys:user:detail')"
              size="mini"
              @click="handleClick(scope.$index, scope.row)"
              type="text"
              icon="el-icon-reading"
              >查看</el-button
            >
            <el-button
              v-if="
                scope.row.account !== 'admin' && PermissionFn('sys:user:role')
              "
              size="mini"
              @click="roleFn(scope.$index, scope.row)"
              type="text"
              icon="el-icon-circle-plus-outline"
              >角色</el-button
            >
            <el-button
              v-if="
                scope.row.account !== 'admin' && PermissionFn('sys:user:edit')
              "
              size="mini"
              @click="editFn(scope.$index, scope.row)"
              type="text"
              icon="el-icon-edit-outline"
              >编辑</el-button
            >
            <el-button
              v-if="
                scope.row.account !== 'admin' && PermissionFn('sys:user:delete')
              "
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="deleteRowFn(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="PermissionFn('sys:user:resetPassword')"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="resetPasswordFn(scope.row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userPage.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 配置权限-弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      title="配置用户权限"
      v-model="dialogVisible"
      width="650px"
      center
    >
      <el-transfer
        v-model="transferValue"
        :data="roleList"
        :titles="['所有权限', '用户权限']"
        filterable
        :props="{
          key: 'id',
          label: 'name',
        }"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="onSubmit"
            :icon="roleIcon ? 'el-icon-loading' : ''"
            >提 交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 设置用户-弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      :title="title"
      v-model="userFromFlag"
      width="750px"
      center
    >
      <div class="mask-wrap">
        <el-form
          ref="form"
          :inline="true"
          :rules="rules"
          :model="userFrom"
          class="demo-form-inline"
        >
          <div class="mask-table" v-if="!handleFlag">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="登录账号："
                  prop="account"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="userFrom.account"
                    placeholder="登录账号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="passwordFlag">
                <el-form-item
                  prop="userPassword"
                  label="登录密码："
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="userFrom.userPassword"
                    placeholder="登录密码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                <el-form-item label="职位：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="userFrom.post"
                    placeholder="职位"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="用户姓名："
                  prop="userName"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="userFrom.userName"
                    placeholder="用户姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" :label-width="labelWidth">
                  <em class="em" />
                  <el-radio-group v-model="userFrom.sex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="手机号码："
                  prop="mobile"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    type="phone"
                    v-model="userFrom.mobile"
                    placeholder="手机号码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="座机号码：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="userFrom.phone"
                    placeholder="座机号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="身份证号："
                  prop="idCard"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="userFrom.idCard"
                    placeholder="身份证号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="passwordFlag">
                <el-form-item label="职位：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="userFrom.post"
                    placeholder="职位"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 新增部门 -->
          <div v-if="!handleFlag">
            <div v-if="departmentFlag" class="typeTab-wrap">
              <el-button
                class="addTypeBtn"
                icon="el-icon-circle-plus-outline"
                type="primary"
                @click="addDepartmentFn"
                >新增部门</el-button
              >
              <el-row :gutter="20">
                <el-col :span="24">
                  <table
                    class="typeTab"
                    border="0"
                    cellspacing="1"
                    cellpadding="0"
                  >
                    <tr>
                      <th style="width: 30px">序号</th>
                      <th>所属部门</th>
                      <th>默认登录部门</th>
                      <th style="width: 30px">操作</th>
                    </tr>
                    <tr v-for="(item, index) in depTableData" :key="index">
                      <td style="text-align: center">{{ index + 1 }}</td>
                      <td>
                        <el-cascader
                          v-model="item.departmentId"
                          :options="departmentTree"
                          :show-all-levels="false"
                          :props="{
                            emitPath: false,
                            value: 'id',
                            label: 'title',
                          }"
                        ></el-cascader>
                      </td>
                      <td>
                        <el-switch
                          v-model="item.loginDefault"
                          active-text="是"
                          inactive-text="否"
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        ></el-switch>
                      </td>
                      <td>
                        <el-button
                          type="text"
                          size="small"
                          icon="el-icon-delete"
                          @click="removeDepartmentFn(index)"
                          >删除
                        </el-button>
                      </td>
                    </tr>
                  </table>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 查看 -->
          <div class="formTab-wrap" v-if="handleFlag">
            <el-row :gutter="20">
              <el-col :span="24">
                <table
                  class="typeTab"
                  border="0"
                  cellspacing="1"
                  cellpadding="0"
                >
                  <tr>
                    <td>登录账号：</td>
                    <td>{{ userFrom.account }}</td>
                    <td>职位：</td>
                    <td>{{ userFrom.post }}</td>
                  </tr>
                  <tr>
                    <td>用户姓名：</td>
                    <td>{{ userFrom.userName }}</td>
                    <td>性别：</td>
                    <td>{{ userFrom.sex }}</td>
                  </tr>
                  <tr>
                    <td>手机号码：</td>
                    <td>{{ userFrom.mobile }}</td>
                    <td>座机号码：</td>
                    <td>{{ userFrom.phone }}</td>
                  </tr>
                  <tr>
                    <td>身份证号：</td>
                    <td>{{ userFrom.idCard }}</td>
                    <td colspan="2"></td>
                  </tr>
                </table>
              </el-col>
            </el-row>
            <el-table
              :data="depTableData"
              max-height="300"
              border
              style="width: 100%"
            >
              <el-table-column
                :resizable="true"
                header-align="center"
                align="center"
                type="index"
                label="序号"
                width="60"
              />
              <el-table-column
                :resizable="true"
                header-align="center"
                align="center"
                prop="departmentName"
                label="所属部门"
                min-width="180"
                show-overflow-tooltip
              />
              <el-table-column
                :resizable="true"
                header-align="center"
                align="center"
                label="默认登录部门"
                min-width="180"
                show-overflow-tooltip
              >
                <template #default="scope">
                  <span>{{ scope.row.loginDefault == 0 ? "否" : "是" }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userFromFlag = false">取 消</el-button>
          <el-button
            v-if="!handleFlag"
            type="primary"
            @click="onSubmitUserFn('form')"
            :icon="roleIcon ? 'el-icon-loading' : ''"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 重置密码-弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      title="重置密码"
      v-model="resetFlag"
      width="500px"
      center
    >
      <div class="mask-wrap">
        <el-form
          ref="RForm"
          :inline="true"
          :rules="rulesReset"
          :model="resetForm"
          class="demo-form-inline"
        >
          <el-form-item
            label="新密码："
            prop="resetPassword"
            :label-width="labelWidth"
          >
            <el-input
              v-model="resetForm.resetPassword"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetFlag = false">取 消</el-button>
          <el-button type="primary" @click="onResetFn('RForm')">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import md5 from "js-md5";
import verify from "@/utils/Verify.js";
import { filterPermissionFn } from "@/utils/filter.js";
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
    const store = useStore();
    //methods方法集合
    const methods = {
      // 提交重置密码
      onResetFn(RForm) {
        console.log(data.resetForm.resetPassword);
        this.$refs[RForm].validate((valid) => {
          if (valid) {
            let obj = {
              id: data.userId,
              password: md5(data.resetForm.resetPassword).toUpperCase(),
            };
            store.dispatch("actUserResetPassword", obj).then((res) => {
              console.log(res);
              if (res.success) {
                ElMessage.success("密码重置成功!");
                methods.getDataApi();
              }
            });
            data.resetFlag = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        // data.resetFlag = false;
      },
      // 新增部门
      addDepartmentFn() {
        data.depTableData.push({
          departmentId: "",
          loginDefault: 0,
        });
      },
      // 删除类型
      removeDepartmentFn(index) {
        if (data.depTableData.length <= 1) {
          this.$message({
            type: "warning",
            message: "至少要保留一项!",
          });
          return;
        }
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            data.depTableData.splice(index, 1);
          })
          .catch(() => {});
      },
      // 用户表单提交
      onSubmitUserFn(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (!verify.Phone.test(data.userFrom.mobile)) {
              ElMessage.error("手机号格式不正确！");
              return;
            }
            if (!data.userFrom.phone == "") {
              if (!verify.Regexp.test(data.userFrom.phone)) {
                ElMessage.error("座机号格式不正确！");
                return;
              }
            }
            if (!verify.idCard.test(data.userFrom.idCard)) {
              ElMessage.error("身份证号格式不正确！");
              return;
            }
            let idFlag = false;
            console.log(data.depTableData);
            data.depTableData.map((item) => {
              idFlag = item.departmentId == "" ? true : false;
              return;
            });
            if (idFlag) {
              ElMessage.error("所属部门不能为空！");
              return;
            }
            data.roleIcon = true;
            let obj = {
              account: data.userFrom.account,
              userName: data.userFrom.userName,
              sex: data.userFrom.sex,
              post: data.userFrom.post,
              mobile: data.userFrom.mobile,
              phone: data.userFrom.phone,
              idCard: data.userFrom.idCard,
              userDepartmentList: data.depTableData,
            };
            if (data.editFlag) {
              obj.id = data.userId;
            } else {
              obj.password = md5(data.userFrom.userPassword).toUpperCase();
            }
            console.log(obj);
            store.dispatch("actUserSave", obj).then((res) => {
              if (res.success) {
                data.roleIcon = false;
                data.userFromFlag = false;
                data.userId = "";
                methods.getDataApi();
              } else {
                data.roleIcon = false;
              }
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 权限提交
      onSubmit() {
        data.roleIcon = true;
        let obj = {
          roleIdList: data.transferValue,
          userId: data.userId,
        };
        store.dispatch("actSaveUserRole", obj).then(() => {
          data.roleIcon = false;
          data.dialogVisible = false;
          data.userId = "";
        });
      },
      // 按钮权限判断
      PermissionFn(permission) {
        return filterPermissionFn(this.$route.meta.index, permission);
      },
      // 点击多选框
      columnChangeFn() {
        const arr = [];
        data.tableColumnList = data.tableColumnValue.map((item) => {
          if (data.checkedColumn.includes(item.prop)) {
            arr.push(item);
          }
          return arr;
        });
        data.tableColumnList = arr;
      },
      // 表格多选框
      handleSelectionChange(val) {
        data.multipleSelection = val;
      },
      // 增加
      addFn() {
        data.title = "新增";
        data.passwordFlag = true;
        data.handleFlag = false;
        data.editFlag = false;
        data.userFrom = {
          account: "",
          userName: "",
          userPassword: "",
          sex: 0,
          post: "",
          phone: "",
          mobile: "",
          idCard: "",
        };
        data.depTableData = [
          {
            departmentId: "",
            loginDefault: 0,
          },
        ];
        store.dispatch("actDepartmentGetTree");
        data.userFromFlag = true;
      },
      // 批量删除
      deleteFn() {
        console.log(data.multipleSelection);
        if (data.multipleSelection.length < 1) {
          ElMessage.warning({
            message: "请选择删除项！",
            type: "warning",
          });
          return;
        }
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let id = "";
            data.multipleSelection.map((item) => {
              id += item.id + ",";
            });
            id = id.substring(0, id.length - 1);
            console.log(id);
            store.dispatch("actUserDeleteByLogic", { id: id }).then((res) => {
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功!",
                });
              }
            });
            methods.getDataApi();
          })
          .catch(() => {});
      },
      // 导出
      exportFn() {
        // data.exportBtnIcon = "el-icon-loading";
        // let obj = {
        //   type: data.tabPosition,
        // };
        // store.dispatch("actMenuExport", obj).then(() => {
        //   data.exportBtnIcon = "el-icon-bottom";
        // });
      },
      // 查询
      queryFn() {
        methods.getDataApi();
      },
      // 查看
      handleClick(index, row) {
        console.log(row);
        data.title = "查看";
        data.handleFlag = true;
        data.userFrom = {
          account: row.account,
          userName: row.userName,
          sex: row.sex,
          post: row.post,
          phone: row.phone,
          mobile: row.mobile,
          idCard: row.idCard,
        };
        data.depTableData = row.userDepartmentList;
        data.userFromFlag = true;
      },
      // 重置
      resetFn() {
        data.account = data.userName = data.status = "";
        data.userDepartmentList = [];
        console.log(data.userDepartmentList);
      },
      roleFn(index, row) {
        let id = row.id;
        data.userId = row.id;
        store.dispatch("actGetUserRole", id).then(() => {
          let arr = [];
          if (store.state.userRoleData) {
            store.state.userRoleData.map((item) => {
              arr.push(item.id);
              return true;
            });
          }
          data.transferValue = arr;
        });
        store.dispatch("actGetRoleList", { id }).then(() => {
          store.state.roleList.filter((item) => {
            item.name = item.typeName + " - " + item.name;
          });
        });
        data.dialogVisible = true;
      },
      editFn(index, row) {
        console.log(row);
        data.editFlag = true;
        data.handleFlag = false;
        data.userId = row.id;
        store.dispatch("actDepartmentGetTree");
        data.title = "编辑";
        data.passwordFlag = false;
        data.userFrom = {
          account: row.account,
          userName: row.userName,
          sex: row.sex,
          post: row.post,
          phone: row.phone,
          mobile: row.mobile,
          idCard: row.idCard,
        };
        row.userDepartmentList.map((item) => {
          delete item.gmtCreate;
          delete item.gmtModified;
        });
        data.depTableData = row.userDepartmentList;
        data.userFromFlag = true;
      },
      deleteRowFn(index, row) {
        console.log(row);
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            store
              .dispatch("actUserDeleteByLogic", { id: row.id })
              .then((res) => {
                if (res.success) {
                  ElMessage({
                    type: "success",
                    message: "删除成功!",
                  });
                }
              });
            methods.getDataApi();
          })
          .catch(() => {});
      },
      resetPasswordFn(row) {
        console.log(row);
        data.userId = row.id;
        data.resetFlag = true;
      },
      // 分页
      handleSizeChange(val) {
        data.limit = val;
        // console.log(`每页 ${val} 条`);
        methods.getDataApi();
      },
      handleCurrentChange(val) {
        data.page = val;
        // console.log(`当前页: ${val}`);
        methods.getDataApi();
      },
      getDataApi() {
        data.loading = true;
        let obj = {
          page: data.page,
          limit: data.limit,
          account: data.account,
          userName: data.userName,
          userDepartmentList: data.userDepartmentList,
        };
        store.dispatch("actGetUserGetPage", obj).then(() => {
          data.loading = false;
        });
      },
    };
    //data数据定义及初始化
    const data = reactive({
      editFlag: false,
      passwordFlag: false,
      resetForm: {
        resetPassword: "",
      },
      rulesReset: {
        resetPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"],
          },
        ],
      },
      resetFlag: false,
      roleIcon: false,
      depTableData: [
        {
          departmentId: "",
          loginDefault: 0,
        },
      ],
      departmentFlag: true,
      title: "新增",
      labelWidth: "120px",
      userFrom: {
        account: "",
        userName: "",
        sex: 0,
        userPassword: "",
        post: "",
        phone: "",
        mobile: "",
        idCard: "",
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: ["blur", "change"],
          },
        ],
        userPassword: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: ["blur", "change"],
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: ["blur", "change"],
          },
        ],
      },
      userFromFlag: false,
      userId: "",
      transferValue: [],
      account: "",
      userName: "",
      userDepartmentList: [],
      status: "",
      exportBtnIcon: "el-icon-bottom",
      userDepartmentArr: [
        {
          id: 1,
          label: "部门1",
        },
        {
          id: 2,
          label: "部门2",
        },
      ],
      stateData: [
        {
          id: 1,
          value: "正常",
        },
        {
          id: 2,
          value: "锁定",
        },
      ],
      multipleSelection: [],
      page: 1,
      limit: 10,
      currentPage: 1,
      loading: false,
      // 表头数组
      tableColumnList: [
        {
          prop: "account",
          label: "登录账号",
          width: "100",
          checked: true,
        },
        {
          prop: "userName",
          label: "用户姓名",
          width: "100",
          checked: true,
        },
        {
          prop: "post",
          label: "职位",
          width: "100",
          checked: true,
        },
        {
          prop: "mobile",
          label: "手机号码",
          width: "100",
          checked: true,
        },
        {
          prop: "phone",
          label: "座机号码",
          width: "100",
          checked: true,
        },
        {
          prop: "userDepartmentNames",
          label: "所在部门",
          width: "150",
          checked: true,
        },
        {
          prop: "statusName",
          label: "状态",
          width: "60",
          checked: true,
        },
        {
          prop: "gmtModified",
          label: "修改时间",
          width: "150",
          checked: true,
        },
        {
          prop: "gmtCreate",
          label: "创建时间",
          width: "150",
          checked: true,
        },
      ],
      tableColumnValue: [], // 动态表头数据
      checkedColumn: [], // 动态表头数据
      labelWidth: "110px",
      oSelectWrap: false,
      dialogVisible: false,
      handleFlag: false,
    });
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
    data.tableColumnValue = data.tableColumnList;
    methods.getDataApi();
    const userPage = computed(() => {
      return store.state.userPage;
    });
    const userRoleData = computed(() => {
      return store.state.userRoleData;
    });
    const roleList = computed(() => {
      return store.state.roleList;
    });
    const departmentTree = computed(() => {
      return store.state.departmentTree;
    });
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      userPage,
      userRoleData,
      roleList,
      departmentTree,
    };
  },
};
</script>
<style lang="less" scoped></style>
