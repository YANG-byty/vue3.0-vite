<!-- 部门信息 -->
<template>
  <div class="department">
    <div class="mian-left">
      <el-tree
        node-key="id"
        :data="depTree"
        :props="{ label: 'title' }"
        @node-click="treeCheckFn"
      ></el-tree>
    </div>
    <div class="mian-right">
      <div class="condition-wrap">
        <div class="block">
          <span>部门名称：</span>
          <el-input v-model="depName" placeholder="请输入部门名称"></el-input>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn-wrap">
        <div class="btn-left">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            plain
            @click="addFn"
            >新增</el-button
          >
          <el-button
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
          :data="depPage.dataList"
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
                @click="handleClick(scope.$index, scope.row)"
                type="text"
                icon="el-icon-reading"
                >查看</el-button
              >
              <el-button
                size="mini"
                @click="addRowFn(scope.$index, scope.row)"
                type="text"
                icon="el-icon-reading"
                >增加</el-button
              >
              <el-button
                size="mini"
                @click="editFn(scope.$index, scope.row)"
                type="text"
                icon="el-icon-edit-outline"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteRowFn(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="depPage.count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 设置用户-弹框 -->
    <el-dialog
      custom-class="menu-dialog"
      :title="title"
      v-model="depFromFlag"
      width="850px"
      center
    >
      <div class="mask-wrap">
        <el-form
          ref="form"
          :inline="true"
          :rules="rules"
          :model="depFrom"
          class="demo-form-inline"
        >
          <div class="mask-table" v-if="!handleFlag">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="部门名称："
                  prop="depName"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="depFrom.depName"
                    placeholder="部门名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="部门类型："
                  prop="depType"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-select
                    v-model="depFrom.depType"
                    placeholder="请选择部门类型"
                  >
                    <el-option
                      v-for="(item, index) in depType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="组织代码：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="depFrom.organizationCode"
                    placeholder="组织代码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门电话：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    type="phone"
                    v-model="depFrom.depPhone"
                    placeholder="部门电话"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="部门传真：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="depFrom.depFax"
                    placeholder="部门传真"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序：" :label-width="labelWidth">
                  <em class="em" />
                  <el-input
                    v-model="depFrom.orderNo"
                    placeholder="排序"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="道路权限：" :label-width="labelWidth">
                  <em class="em" />
                  <el-cascader
                    style="width: 260px"
                    v-model="depFrom.wayRole"
                    collapse-tags="true"
                    :options="options"
                    :props="{ multiple: true }"
                    placeholder="请选择道路权限"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门映射：" :label-width="labelWidth">
                  <em class="em" />
                  <el-cascader
                    style="width: 260px"
                    v-model="depFrom.depMap"
                    collapse-tags="true"
                    :options="options"
                    :props="{ multiple: true }"
                    placeholder="请选择部门映射"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
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
                    <td>部门名称：</td>
                    <td>{{ depShowFrom.depName }}</td>
                    <td>部门类型：</td>
                    <td>{{ depShowFrom.depType }}</td>
                  </tr>
                  <tr>
                    <td>组织代码：</td>
                    <td>{{ depShowFrom.organizationCode }}</td>
                    <td>部门电话：</td>
                    <td>{{ depShowFrom.depPhone }}</td>
                  </tr>
                  <tr>
                    <td>部门传真：</td>
                    <td>{{ depShowFrom.depFax }}</td>
                    <td>排序：</td>
                    <td>{{ depShowFrom.orderNo }}</td>
                  </tr>
                  <tr>
                    <td>道路权限：</td>
                    <td>
                      <!-- depShowFrom.wayRole -->
                      <el-tree :data="depShowFrom.wayRole"></el-tree>
                    </td>
                    <td>部门映射：</td>
                    <td>
                      <!-- depShowFrom.depMap -->
                      <el-tree :data="depShowFrom.wayRole"></el-tree>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="depFromFlag = false">取 消</el-button>
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
      // 用户表单提交
      onSubmitFn(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            data.roleIcon = true;
            let obj = {
              account: data.depFrom.account,
            };
            console.log(obj);
            // store.dispatch("actUserSave", obj).then((res) => {
            //   if (res.success) {
            //     data.roleIcon = false;
            //     data.depFromFlag = false;
            //     methods.getDataApi();
            //   } else {
            //     data.roleIcon = false;
            //   }
            // });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 点击部门树节点
      treeCheckFn(row, keys) {
        // console.log(row);
        data.parentId = row.id;
        methods.getDataApi();
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
        data.depFromFlag = true;
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
            // let id = "";
            // data.multipleSelection.map((item) => {
            //   id += item.id + ",";
            // });
            // id = id.substring(0, id.length - 1);
            // console.log(id);
            // store.dispatch("actUserDeleteByLogic", { id: id }).then((res) => {
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
        data.parentId = "";
        methods.getDataApi();
      },
      // 重置
      resetFn() {
        data.depName = "";
      },
      // 查看
      handleClick(index, row) {
        console.log(row);
        data.title = "查看";
        data.handleFlag = true;
        // data.depFrom = {
        //   account: row.account,
        //   userName: row.userName,
        //   sex: row.sex,
        //   post: row.post,
        //   phone: row.phone,
        //   mobile: row.mobile,
        //   idCard: row.idCard,
        // };
        data.depTableData = row.userDepartmentList;
        data.depFromFlag = true;
      },
      addRowFn(row) {
        data.title = "增加";
        data.depFromFlag = true;
      },
      editFn(index, row) {
        console.log(row);
        data.title = "编辑";
        data.depFromFlag = true;
      },
      deleteRowFn(index, row) {
        console.log(row);
        ElMessageBox.confirm("确定要删除此项吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // store
            //   .dispatch("actUserDeleteByLogic", { id: row.id })
            //   .then((res) => {
            //     if (res.success) {
            //       ElMessage({
            //         type: "success",
            //         message: "删除成功!",
            //       });
            //     }
            //   });
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
      getDataApi() {
        data.loading = true;
        let obj = {
          page: data.page,
          limit: data.limit,
          name: data.depName,
          parentId: data.parentId,
        };
        store.dispatch("actDepartmentGetPage", obj).then(() => {
          data.loading = false;
        });
      },
    };
    //data数据定义及初始化
    const data = reactive({
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
              ],
            },
          ],
        },
      ],
      roleIcon: false,
      depShowFrom: {
        depName: "",
        depType: "",
        organizationCode: "",
        depPhone: "",
        depFax: "",
        orderNo: "",
        wayRole: [],
        depMap: [],
      },
      depFrom: {
        depName: "",
        depType: "",
        organizationCode: "",
        depPhone: "",
        depFax: "",
        orderNo: "",
        wayRole: "",
        depMap: "",
      },
      rules: {
        depName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: ["blur", "change"],
          },
        ],
        depType: [
          {
            required: true,
            message: "请选择部门类型",
            trigger: ["blur", "change"],
          },
        ],
      },
      title: "增加",
      parentId: "",
      depName: "",
      multipleSelection: [],
      page: 1,
      limit: 10,
      currentPage: 1,
      loading: false,
      // 表头数组
      tableColumnList: [
        {
          prop: "id",
          label: "ID",
          width: "100",
          checked: true,
        },
        {
          prop: "name",
          label: "部门名称",
          width: "100",
          checked: true,
        },
        {
          prop: "name",
          label: "上级部门",
          width: "100",
          checked: true,
        },
        {
          prop: "typeName",
          label: "部门类型",
          width: "100",
          checked: true,
        },
        {
          prop: "orderNo",
          label: "排序",
          width: "100",
          checked: true,
        },
        {
          prop: "telephone",
          label: "电话",
          width: "150",
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
      labelWidth: "100px",
      oSelectWrap: false,
      depFromFlag: true,
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
    store.dispatch("actDepGetTree");
    store.dispatch("actDepGetType");
    const depPage = computed(() => {
      return store.state.depPage;
    });
    const depTree = computed(() => {
      return store.state.depTree;
    });
    const depType = computed(() => {
      return store.state.depType;
    });
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data),
      depPage,
      depTree,
      depType,
    };
  },
};
</script>
<style lang="less" scoped>
.department {
  width: 100%;
  display: flex;
  .mian-left {
    min-width: 240px;
    height: calc(100vh - 141px - 1rem);
    background-color: #fff;
    margin-right: 20px;
    overflow-y: auto;
    padding: 6px 0 1rem;
    overflow-x: auto;
  }
  .mian-right {
    width: calc(100% - 260px);
  }
}
</style>
