<!-- 通用模板模板(仅供参考,需要的字段自行填充,按需命名) - class样式名称必须保持一致,风格统一 -->
<template>
  <div class="">
    <!-- 头部录入框 -->
    <!-- a.如果内容超过一行替换class值为：:class="{ 'condition-wrap': true, 'condition-active': !unfoldPackUpFlag }" -->
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
          v-if="PermissionFn('dict:worktype:add')"
          type="primary"
          icon="el-icon-circle-plus-outline"
          plain
          @click="addFn"
          >新增</el-button
        >
        <el-button
          v-if="PermissionFn('dict:worktype:detail')"
          type="primary"
          icon="el-icon-delete"
          plain
          @click="deleteFn"
          >删除</el-button
        >
        <el-button
          v-if="PermissionFn('dict:worktype:export')"
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
        <!-- 跟头部录入框保持一致，如果超过一行可以添加这个按钮，无则不需要，按需添加 -->
        <el-button
          type="text"
          :icon="unfoldPackUpFlag ? unfoldPackUp[1].icon : unfoldPackUp[0].icon"
          @click="unfoldPackUpFn"
          >{{
            unfoldPackUpFlag ? unfoldPackUp[1].msg : unfoldPackUp[0].msg
          }}</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
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
        :data="pageData.dataList"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="500"
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
          label="序号"
          width="60"
          align="center"
          :resizable="true"
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
          :align="item.prop == 'workName' ? 'left' : 'center'"
        />
        <el-table-column
          :resizable="true"
          label="操作"
          min-width="190"
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
              v-if="PermissionFn('dict:worktype:detail')"
              icon="el-icon-reading"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
              >查看
            </el-button>
            <el-button
              v-if="PermissionFn('dict:worktype:edit')"
              type="text"
              icon="el-icon-edit-outline"
              size="small"
              @click="updateFn(scope.row)"
              >编辑
            </el-button>
            <el-button
              v-if="PermissionFn('dict:worktype:delete')"
              type="text"
              icon="el-icon-delete"
              size="small"
              @click="removeFn(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 模态框 -->
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
          :label-position="labelPosition"
          class="demo-form-inline"
        >
          <!-- 录入表单 -->
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
          <!-- 录入表格 -->
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
          <!-- 查看显示 -->
          <div class="formTab-wrap" v-if="handleFlag">
            <!-- 录入表单显示 -->
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
            <!-- 录入表格显示 -->
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
            @click="onSubmitFn('form')"
            :icon="roleIcon ? 'el-icon-loading' : ''"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
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
      // 按钮权限判断
      PermissionFn(permission) {
        return filterPermissionFn(this.$route.meta.index, permission);
      },
      // 表单提交
      onSubmitFn(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            data.roleIcon = true;
            // let obj = {
            //   account: data.userFrom.account,
            // };
            // console.log(obj);
            // store.dispatch("actUserSave", obj).then((res) => {
            //   if (res.success) {
            //     data.roleIcon = false;
            //     methods.getDataApi();
            //   } else {
            data.roleIcon = false;
            //   }
            // });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 展开、收起
      unfoldPackUpFn() {
        data.unfoldPackUpFlag = !data.unfoldPackUpFlag;
      },
      // 增加
      addFn() {
        data.handleFlag = data.isSplit = true;
        data.workTypeForm = {
          id: "",
          type: "", // 章节
          workName: "", // 作业名称
          unitsType: "", // 计量单位属性
          unitsCode: "", // 计量单位
          sortNo: "", // 排序号
          beforeFlag: "否", // 作业前拍照
          inFlag: "否", // 作业中拍照
          afterFlag: "否", // 作业后拍照
          wfFlag: "0", // 是否需要确认流程
          refFlag: "0", // 是否需要反向关联
        };
        data.workTypeFormVisible = true;
      },
      // 批量删除
      deleteFn() {
        console.log(data.multipleSelection);
        if (data.multipleSelection.length < 1) {
          ElMessage.warning({
            message: "请选择删除项！",
            type: "warning",
          });
        }
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // let obj={};
            // store.dispatch("actUserDeleteByLogic", obj).then((res) => {
            //   if (res.success) {
            //     ElMessage({
            //       type: "success",
            //       message: "删除成功!",
            //     });
            //   }
            // });
            methods.getDataApi();
          })
          .catch(() => {});
      },
      // 导出
      exportFn() {
        data.exportBtnIcon = "el-icon-loading";
        setTimeout(() => {
          data.exportBtnIcon = "el-icon-bottom";
        }, 1000);
      },
      // 查询
      queryFn() {
        methods.getDataApi();
      },
      // 重置
      resetFn() {
        data.byTypeId = data.inputWorkName = "";
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
      // 查看
      handleClick(row) {},
      // 编辑
      updateFn(row) {},
      // 删除
      removeFn(row) {
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // let obj={};
            // store.dispatch("actUserDeleteByLogic", obj).then((res) => {
            //   if (res.success) {
            //     ElMessage({
            //       type: "success",
            //       message: "删除成功!",
            //     });
            //   }
            // });
            methods.getDataApi();
          })
          .catch(() => {});
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
      // 封装请求
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
      depTableData: [
        {
          departmentId: "",
          loginDefault: 0,
        },
      ],
      departmentFlag: true,
      title: "新增",
      labelWidth: "120px",
      labelPosition: "right",
      userFrom: {
        account: "",
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入ID",
            trigger: ["blur", "change"],
          },
        ],
      },
      unfoldPackUp: [
        {
          icon: "el-icon-arrow-down",
          msg: "展开",
        },
        {
          icon: "el-icon-arrow-up",
          msg: "收起",
        },
      ],
      unfoldPackUpFlag: false,
      tableColumnList: [
        {
          prop: "id",
          label: "ID",
          width: "80",
          checked: true,
        },
      ], // 表头数组
      multipleSelection: [], // 表格选中的选项
      tableColumnValue: [], // 动态表头数据
      checkedColumn: [], // 动态表头数据
      loading: false, //表格加载数据
      page: 1,
      limit: 10,
      currentPage: 1,
      roleIcon: false, //弹框提交状态
      oSelectWrap: false, //表头筛选切换
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

    const pageData = computed(() => {
      return store.state.pageData;
    });
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      pageData,
    };
  },
};
</script>
<style></style>
