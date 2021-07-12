<!-- 系统角色 -->
<template>
  <div class="role">
    <div class="condition-wrap">
      <div class="block">
        <span>角色名称：</span>
        <el-input v-model="name" placeholder="请输入角色名称"></el-input>
      </div>
      <div class="block">
        <span>权限类型：</span>
        <el-select v-model="type" placeholder="全部">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="block">
        <span>管理类型：</span>
        <el-select v-model="manageType" placeholder="全部">
          <el-option
            v-for="item in manageTypeData"
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
          v-if="PermissionFn('sys:role:add')"
          type="primary"
          icon="el-icon-circle-plus-outline"
          plain
          @click="addFn"
          >新增</el-button
        >
        <el-button
          v-if="PermissionFn('sys:role:delete')"
          type="primary"
          icon="el-icon-delete"
          plain
          @click="deleteFn"
          >删除</el-button
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
          width="260"
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
              v-if="PermissionFn('sys:role:detail')"
              type="text"
              icon="el-icon-reading"
              size="small"
              @click="handleClick(scope.row)"
              >查看
            </el-button>
            <el-button
              v-if="PermissionFn('sys:role:permission')"
              type="text"
              icon="el-icon-collection"
              size="small"
              @click="psFn(scope.row)"
              >权限
            </el-button>
            <el-button
              v-if="PermissionFn('sys:role:edit')"
              type="text"
              icon="el-icon-edit-outline"
              size="small"
              @click="updateFn(scope.row)"
              >编辑
            </el-button>
            <el-button
              v-if="PermissionFn('sys:role:delete')"
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
    <!-- 弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      :title="title"
      v-model="dialogVisible"
      width="450px"
      center
    >
      <div class="mask-wrap">
        <el-form
          v-if="!handleFlag"
          ref="form"
          :inline="true"
          :rules="rules"
          :model="roleForm"
          class="demo-form-inline"
        >
          <el-form-item
            label="角色名称："
            prop="name"
            :label-width="labelWidth"
          >
            <el-input v-model="roleForm.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item
            label="角色描述："
            prop="remark"
            :label-width="labelWidth"
          >
            <el-input
              v-model="roleForm.remark"
              placeholder="角色描述"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限类型："
            prop="type"
            :label-width="labelWidth"
          >
            <el-select v-model="roleForm.type" placeholder="权限类型">
              <el-option
                v-for="item in typeData"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="管理类型："
            prop="manageType"
            :label-width="labelWidth"
          >
            <el-select v-model="roleForm.manageType" placeholder="管理类型">
              <el-option
                v-for="item in manageTypeData"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 查看 -->
        <div class="formTab-wrap" v-if="handleFlag">
          <el-row :gutter="20">
            <el-col :span="24">
              <table class="typeTab" border="0" cellspacing="1" cellpadding="0">
                <tr>
                  <td>角色名称：</td>
                  <td>{{ roleForm.name }}</td>
                </tr>
                <tr>
                  <td>角色描述：</td>
                  <td>{{ roleForm.remark }}</td>
                </tr>
                <tr>
                  <td>权限类型：</td>
                  <td>{{ roleForm.type }}</td>
                </tr>
                <tr>
                  <td>管理类型：</td>
                  <td>{{ roleForm.manageType }}</td>
                </tr>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            v-if="!handleFlag"
            type="primary"
            @click="onSubmit('form')"
            :icon="roleIcon ? 'el-icon-loading' : ''"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      :title="permissionTitle"
      v-model="permissionDialog"
      width="500px"
      center
    >
      <el-tree
        :data="roleTreeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        @check="treeCheckFn"
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="onSubmitPermission('form')"
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
import { setHandleListb } from "@/utils/filter.js";
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
      treeCheckFn(row, keys) {
        console.log(keys);
        data.checkedKeys = keys.checkedKeys;
      },
      // 提交权限
      onSubmitPermission() {
        data.roleIcon = true;
        let obj = {
          roleId: data.roleId,
          roleType: data.roleType,
          treeNodeIdList: data.checkedKeys,
        };
        store.dispatch("actGetSaveRoleTree", obj).then((res) => {
          console.log(res);
          if (res.success) {
            ElMessage.success("设置成功!");
          }
          data.roleId = data.roleType = "";
          data.checkedKeys = [];
          data.roleIcon = false;
          data.permissionDialog = false;
        });
      },
      onSubmit(form) {
        console.log(data.roleForm);
        this.$refs[form].validate((valid) => {
          if (valid) {
            data.roleIcon = true;
            data.roleForm = {
              name: "",
              remark: "",
              type: 0,
              manageType: 0,
            };
            data.roleIcon = false;
            data.dialogVisible = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
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
        data.handleFlag = false;
        data.roleForm = {
          name: "",
          remark: "",
          type: 0,
          manageType: 0,
        };
        data.dialogVisible = true;
      },
      // 批量删除
      deleteFn() {
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
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {});
        console.log(data.multipleSelection);
      },
      // 查询
      queryFn() {
        methods.getDataApi();
      },
      // 重置
      resetFn() {
        data.name = data.type = data.manageType = "";
      },
      // 查看
      handleClick(row) {
        console.log(row);
        data.title = "查看";
        data.handleFlag = true;
        data.roleForm = {
          name: row.name,
          remark: row.remark,
          type: row.type,
          manageType: row.manageType,
        };
        data.dialogVisible = true;
      },
      // 权限
      psFn(row) {
        // console.log(row);
        data.permissionTitle = row.typeName + "权限";
        data.checkedKeys = [];
        data.roleId = row.id;
        data.roleType = row.type;
        let obj = {
          roleId: row.id,
          roleType: row.type,
        };
        store.dispatch("actGetRoleTree", obj).then(() => {
          data.expandedKeys = [roleTreeData.value[0].id];
        });
        data.permissionDialog = true;
      },
      // 编辑
      updateFn(row) {
        data.title = "编辑";
        data.handleFlag = false;
        data.roleForm = {
          name: row.name,
          remark: row.remark,
          type: row.type,
          manageType: row.manageType,
        };
        data.dialogVisible = true;
        console.log(row);
      },
      // 删除
      removeFn(row) {
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            methods.getDataApi();
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
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
        const obj = {
          page: data.page,
          limit: data.limit,
          name: data.name,
          type: data.type,
          manageType: data.manageType,
        };
        store.dispatch("actRoleGetPage", obj).then(() => {
          data.loading = false;
        });
      },
    };
    //data数据定义及初始化
    const data = reactive({
      roleIcon: false,
      roleId: "",
      roleType: "",
      expandedKeys: [],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      labelWidth: "110px",
      title: "新增",
      permissionTitle: "Web权限",
      permissionDialog: false,
      dialogVisible: false,
      typeData: [
        { id: 0, value: "微信小程序" },
        { id: 1, value: "Web" },
        { id: 2, value: "合同章节" },
      ],
      manageTypeData: [
        { id: 0, value: "普通用户" },
        { id: 1, value: "二级管理员" },
        { id: 2, value: "管理员" },
      ],
      name: "", //角色
      type: "", //权限类型
      manageType: "", //管理类型
      // 表头数组
      tableColumnList: [
        {
          prop: "code",
          label: "角色编码",
          width: "60",
          checked: true,
        },
        {
          prop: "name",
          label: "角色名称",
          width: "120",
          checked: true,
        },
        {
          prop: "typeName",
          label: "权限类型",
          width: "100",
          checked: true,
        },
        {
          prop: "manageTypeName",
          label: "管理类型",
          width: "100",
          checked: true,
        },
        {
          prop: "startPage",
          label: "启动页面",
          width: "120",
          checked: true,
        },
        {
          prop: "remark",
          label: "备注",
          width: "120",
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
      multipleSelection: [], // 表格选中的选项
      tableColumnValue: [], // 动态表头数据
      checkedColumn: [], // 动态表头数据
      loading: false,
      page: 1,
      limit: 10,
      currentPage: 1,
      roleForm: {
        name: "",
        remark: "",
        type: 0,
        manageType: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色类型",
            trigger: ["blur", "change"],
          },
        ],
      },
      oSelectWrap: false,
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
    const pageData = computed(() => {
      return store.state.rolePage;
    });
    const roleTreeData = computed(() => {
      data.checkedKeys = setHandleListb(store.state.roleTreeData);
      return store.state.roleTreeData;
    });
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      pageData,
      roleTreeData,
    };
  },
};
</script>
<style lang="less" scoped></style>
