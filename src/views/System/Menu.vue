<!-- 系统菜单 -->
<template>
  <div class="menu">
    <el-radio-group
      v-model="tabPosition"
      @change="tabFn"
      style="margin-bottom: 30px"
    >
      <el-radio-button label="0">Web</el-radio-button>
      <el-radio-button label="1">小程序</el-radio-button>
    </el-radio-group>
    <div class="menu-top">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="addFn"
        plain
        v-if="PermissionFn('sys:menu:add')"
        >新增</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-delete"
        plain
        @click="deleteFn"
        v-if="PermissionFn('sys:menu:delete')"
        >删除</el-button
      >
      <el-button
        type="primary"
        :icon="exportBtnIcon"
        @click="exportFn"
        plain
        v-if="PermissionFn('sys:menu:export')"
        >导出</el-button
      >
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
        row-key="id"
        stripe
        :data="menuPage"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="650"
        @selection-change="handleSelectionChange"
        :tree-props="{ children: 'childrenList', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          :resizable="true"
          align="center"
        />
        <el-table-column
          min-width="120"
          :resizable="true"
          align="left"
          prop="title"
          label="名称"
          header-align="center"
          :filters="filtersArr"
          :filter-method="filterFn"
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
          :align="propFlag.includes(item.prop) ? 'center' : 'left'"
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
              size="mini"
              @click="handleClick(scope.row)"
              type="text"
              icon="el-icon-reading"
              >查看</el-button
            >
            <el-button
              v-if="
                flagArr.includes(scope.row.menuType) &&
                PermissionFn('sys:menu:add')
              "
              size="mini"
              @click="addRowFn(scope.$index, scope.row)"
              type="text"
              icon="el-icon-circle-plus-outline"
              >新增</el-button
            >
            <el-button
              size="mini"
              @click="editFn(scope.$index, scope.row)"
              type="text"
              icon="el-icon-edit-outline"
              v-if="PermissionFn('sys:menu:edit')"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="deleteRowFn(scope.$index, scope.row)"
              v-if="PermissionFn('sys:menu:delete')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
          :model="menuForm"
          class="demo-form-inline"
        >
          <el-form-item
            label="菜单类别："
            prop="menuType"
            :label-width="labelWidth"
            v-show="tabPosition == '0'"
          >
            <el-select v-model="menuForm.menuType" placeholder="菜单类别">
              <el-option
                v-for="item in menuType"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题：" prop="chName" :label-width="labelWidth">
            <el-input v-model="menuForm.chName" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="enName" :label-width="labelWidth">
            <el-input
              v-model="menuForm.enName"
              placeholder="英文名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="路由："
            prop="route"
            v-show="tabPosition == '0'"
            :label-width="labelWidth"
          >
            <el-input v-model="menuForm.route" placeholder="路由"></el-input>
          </el-form-item>
          <el-form-item
            label="权限："
            prop="permission"
            :label-width="labelWidth"
          >
            <el-input
              v-model="menuForm.permission"
              placeholder="权限"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="图标："
            prop="icon"
            v-show="tabPosition == '0'"
            :label-width="labelWidth"
          >
            <el-input v-model="menuForm.icon" placeholder="图标"></el-input>
          </el-form-item>
          <el-form-item
            v-show="tabPosition == '0'"
            label="排序："
            prop="sort"
            :label-width="labelWidth"
          >
            <el-input v-model="menuForm.sort" placeholder="排序"></el-input>
          </el-form-item>
        </el-form>
        <!-- 查看 -->
        <div class="formTab-wrap" v-if="handleFlag">
          <el-row :gutter="20">
            <el-col :span="24">
              <table class="typeTab" border="0" cellspacing="1" cellpadding="0">
                <tr>
                  <td>菜单类别：</td>
                  <td>{{ menuForm.menuType }}</td>
                </tr>
                <tr>
                  <td>标题：</td>
                  <td>{{ menuForm.chName }}</td>
                </tr>
                <tr>
                  <td>名称：</td>
                  <td>{{ menuForm.enName }}</td>
                </tr>
                <tr>
                  <td>路由：</td>
                  <td>{{ menuForm.route }}</td>
                </tr>
                <tr>
                  <td>权限：</td>
                  <td>{{ menuForm.permission }}</td>
                </tr>
                <tr>
                  <td>图标：</td>
                  <td>{{ menuForm.icon }}</td>
                </tr>
                <tr>
                  <td>排序：</td>
                  <td>{{ menuForm.sort }}</td>
                </tr>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="!handleFlag" type="primary" @click="onSubmit('form')"
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
import * as echarts from "echarts";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { filterPermissionFn } from "@/utils/filter.js";
import {
  h,
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
    const store = useStore(); //使用vuex厂库
    //methods方法集合
    const methods = {
      // 按钮权限判断
      PermissionFn(permission) {
        return filterPermissionFn(this.$route.meta.index, permission);
      },
      // 批量删除
      deleteFn() {
        if (data.multipleSelection.length < 1) {
          ElMessage.warning({
            message: "请选择删除项！",
            type: "warning",
          });
        }
        console.log(data.multipleSelection);
      },
      // 新增
      addFn() {
        data.handleFlag = false;
        methods.clearFn();
        data.menuType = [
          {
            id: "",
            title: "文件夹",
          },
          {
            id: "0",
            title: "页面",
          },
        ];
        data.title = "新增";
        data.dialogVisible = true;
      },
      // 导出
      exportFn() {
        data.exportBtnIcon = "el-icon-loading";
        let obj = {
          type: data.tabPosition,
        };
        store.dispatch("actMenuExport", obj).then(() => {
          data.exportBtnIcon = "el-icon-bottom";
        });
      },
      filterFn(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
      // 清空表单
      clearFn() {
        data.menuForm = {
          menuType: "",
          chName: "",
          enName: "",
          route: "",
          permission: "",
          icon: "",
          sort: "",
        };
      },
      onSubmit(form) {
        console.log(data.menuForm);
        this.$refs[form].validate((valid) => {
          if (valid) {
            data.workTypeFormVisible = false;
            methods.clearFn();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 查看
      handleClick(row) {
        console.log(row);
        data.title = "查看";
        data.handleFlag = true;
        data.menuForm = {
          menuType: row.menuType,
          chName: row.title,
          enName: row.name,
          route: row.route,
          permission: row.permission,
          icon: row.icon,
          sort: row.orderNo,
        };
        data.dialogVisible = true;
      },
      addRowFn(index, row) {
        // console.log(row);
        data.handleFlag = false;
        methods.clearFn();
        let type = row.menuType;
        if (type == "") {
          data.menuType = [
            {
              id: "",
              title: "文件夹",
            },
            {
              id: "0",
              title: "页面",
            },
          ];
        } else if (type == "0") {
          data.menuForm.menuType = "1";
          data.menuType = [
            {
              id: "1",
              title: "按钮",
            },
          ];
        }
        data.title = "新增";
        data.dialogVisible = true;
      },
      editFn(index, row) {
        console.log(row);
        data.title = "编辑";
        data.handleFlag = false;
        let type = row.menuType;
        if (type == "") {
          data.menuType = [
            {
              id: "",
              title: "文件夹",
            },
          ];
        } else if (type == "0") {
          data.menuType = [
            {
              id: "0",
              title: "页面",
            },
          ];
        } else {
          data.menuType = [
            {
              id: "1",
              title: "按钮",
            },
          ];
        }
        data.menuForm = {
          menuType: row.menuType,
          chName: row.title,
          enName: row.name,
          route: row.route,
          permission: row.permission,
          icon: row.icon,
          sort: row.orderNo,
        };
        data.dialogVisible = true;
      },
      deleteRowFn(index, row) {
        console.log(row);
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
      // 页面类型切换
      tabFn() {
        methods.ajaxFn();
      },
      // 封装请求
      ajaxFn() {
        data.loading = true;
        let obj = {
          type: data.tabPosition,
        };
        store.dispatch("actMenuGetPage", obj).then(() => {
          data.loading = false;
        }); //派遣actions中的方法
      },
    };
    //data数据定义及初始化
    const data = reactive({
      loading: false,
      multipleSelection: [], // 表格选中的选项
      tabPosition: "0", //页面类型
      exportBtnIcon: "el-icon-bottom",
      filtersArr: [],
      // 表头数组
      tableColumnList: [
        {
          prop: "route",
          label: "路由",
          width: "120",
          checked: true,
        },
        {
          prop: "permission",
          label: "权限",
          width: "120",
          checked: true,
        },
        {
          prop: "icon",
          label: "图标",
          width: "120",
          checked: true,
        },
        {
          prop: "orderNo",
          label: "排序",
          width: "60",
          checked: true,
        },
        {
          prop: "gmtModified",
          label: "修改时间",
          width: "120",
          checked: true,
        },
        {
          prop: "gmtCreate",
          label: "创建时间",
          width: "120",
          checked: true,
        },
      ],
      tableColumnValue: [], // 动态表头数据
      checkedColumn: [], // 动态表头数据
      labelWidth: "110px",
      menuType: [],
      menuForm: {
        menuType: "",
        chName: "",
        enName: "",
        route: "",
        permission: "",
        icon: "",
        sort: "",
      },
      rules: {
        chName: [
          {
            required: true,
            message: "请输入中文标题",
            trigger: ["blur", "change"],
          },
        ],
        enName: [
          {
            required: true,
            message: "请输入英文名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      dialogVisible: false,
      flagArr: ["", "0"],
      propFlag: ["orderNo", "gmtModified", "gmtCreate"],
      title: "新增",
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
    methods.ajaxFn();

    const menuPage = computed(() => {
      data.filtersArr = [];
      store.state.menuPage.map((item) => {
        data.filtersArr.push({
          text: item.title,
          value: item.title,
        });
      });
      return store.state.menuPage;
    });

    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      menuPage,
    };
  },
};
</script>
<style lang="less" scoped>
.menu {
  user-select: none;
  .menu-top {
    margin-bottom: 1rem;
  }
}
</style>
