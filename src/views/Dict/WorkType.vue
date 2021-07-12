<!-- 施工类型 -->
<template>
  <div class="workType">
    <div
      :class="{ 'condition-wrap': true, 'condition-active': !unfoldPackUpFlag }"
    >
      <div class="block">
        <span>章节：</span>
        <el-select v-model="byTypeId" placeholder="请选择章节">
          <el-option
            v-for="item in paramsByTypeId"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input v-model="inputWorkName" placeholder="请输入作业名称" />
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
      v-model="workTypeFormVisible"
      title="增加数据"
      center
    >
      <div class="mask-wrap">
        <el-form
          ref="form"
          :label-position="labelPosition"
          :rules="rules"
          :model="workTypeForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <div v-if="handleFlag" class="mask-table">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="ID：" prop="id" :label-width="labelWidth">
                  <em class="em" />
                  <el-input v-model="workTypeForm.id" placeholder="请输入ID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="章节："
                  :label-width="labelWidth"
                  prop="type"
                >
                  <em class="em" />
                  <el-select
                    v-model="workTypeForm.type"
                    placeholder="请选择章节"
                  >
                    <el-option
                      v-for="item in paramsByTypeId"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="作业名称："
                  prop="workName"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="workTypeForm.workName"
                    placeholder="请输入作业名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="计量单位："
                  prop="unitsCode"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-select
                    v-model="workTypeForm.unitsCode"
                    placeholder="请选择计量单位"
                  >
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item
                  label="计量单位属性："
                  :label-width="labelWidth"
                  prop="unitsType"
                >
                  <em class="em" />
                  <el-select
                    v-model="workTypeForm.unitsType"
                    placeholder="请选择单位属性"
                  >
                    <el-option label="按面积计算" value="0" />
                    <el-option label="按固定数量计算" value="1" />
                    <el-option label="按长度计算" value="2" />
                    <el-option label="按体积计算" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="排序号："
                  prop="sortNo"
                  :label-width="labelWidth"
                >
                  <em class="em" />
                  <el-input
                    v-model="workTypeForm.sortNo"
                    placeholder="请输入排序号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="作业前拍照：" :label-width="labelWidth">
                  <em class="em" />
                  <el-switch
                    v-model="workTypeForm.beforeFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="作业中拍照：" :label-width="labelWidth">
                  <em class="em" />
                  <el-switch
                    v-model="workTypeForm.inFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="作业后拍照：" :label-width="labelWidth">
                  <em class="em" />
                  <el-switch
                    v-model="workTypeForm.afterFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="需要确定流程：" :label-width="labelWidth">
                  <em class="em" />
                  <el-switch
                    v-model="workTypeForm.wfFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="1"
                    inactive-value="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="需要反向关联：" :label-width="labelWidth">
                  <em class="em" />
                  <el-switch
                    v-model="workTypeForm.refFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="1"
                    inactive-value="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="附件：" :label-width="labelWidth">
                  <em class="em" />
                  <uploadFiles />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row v-else :gutter="20">
            <el-col :span="24">
              <table class="typeTab" border="0" cellspacing="1" cellpadding="0">
                <tr>
                  <td>ID：</td>
                  <td>{{ workTypeForm.id }}</td>
                  <td>章节：</td>
                  <td>{{ workTypeForm.type }}</td>
                </tr>
                <tr>
                  <td>作业名称：</td>
                  <td>{{ workTypeForm.workName }}</td>
                  <td>计量单位：</td>
                  <td>{{ workTypeForm.unitsCode }}</td>
                </tr>
                <tr>
                  <td>计量单位属性：</td>
                  <td>{{ workTypeForm.unitsType }}</td>
                  <td>排序号：</td>
                  <td>{{ workTypeForm.sortNo }}</td>
                </tr>
                <tr>
                  <td>作业前拍照：</td>
                  <td>{{ workTypeForm.beforeFlag }}</td>
                  <td>作业中拍照：</td>
                  <td>{{ workTypeForm.inFlag }}</td>
                </tr>
                <tr>
                  <td>作业后拍照：</td>
                  <td>{{ workTypeForm.afterFlag }}</td>
                  <td>需要确定流程：</td>
                  <td>{{ workTypeForm.wfFlag == "1" ? "是" : "否" }}</td>
                </tr>
                <tr>
                  <td>需要反向关联：</td>
                  <td>{{ workTypeForm.refFlag == "1" ? "是" : "否" }}</td>
                  <td />
                  <td />
                </tr>
              </table>
            </el-col>
          </el-row>
          <!-- 增加类型 -->
          <div v-if="isSplit" class="typeTab-wrap">
            <el-button
              v-if="handleFlag"
              class="addTypeBtn"
              icon="el-icon-circle-plus-outline"
              type="primary"
              @click="addTypeBtnFn"
              >增加</el-button
            >
            <el-row :gutter="20">
              <el-col :span="24">
                <table
                  v-if="handleFlag"
                  class="typeTab"
                  border="0"
                  cellspacing="1"
                  cellpadding="0"
                >
                  <tr>
                    <th style="width: 30px">序号</th>
                    <th>名称</th>
                    <th>单位</th>
                    <th>排序号</th>
                    <th style="width: 30px">操作</th>
                  </tr>
                  <tr v-for="(item, index) in typeTableData" :key="index">
                    <td style="text-align: center">{{ index + 1 }}</td>
                    <td>
                      <el-input
                        v-model="item.typeName"
                        placeholder="请输入名称"
                      />
                    </td>
                    <td>
                      <el-input v-model="item.unit" placeholder="请输入单位" />
                    </td>
                    <td>
                      <el-input
                        v-model="item.sortNo"
                        placeholder="请输入排序号"
                      />
                    </td>
                    <td>
                      <el-button
                        type="text"
                        size="small"
                        @click="removeTypeFn(index)"
                        >删除
                      </el-button>
                    </td>
                  </tr>
                </table>
                <el-table
                  v-else
                  align="center"
                  :data="typeTableData"
                  max-height="300"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="++index"
                    label="序号"
                    min-width="60"
                  />
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="typeName"
                    label="名称"
                    min-width="180"
                  />
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="unit"
                    label="单位"
                    min-width="180"
                  />
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="sortNo"
                    label="排序号"
                    min-width="100"
                  />
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="workTypeFormVisible = false">取 消</el-button>
          <el-button
            v-if="handleFlag"
            type="primary"
            @click="submitForm('form')"
            >提交</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { filterPermissionFn } from "@/utils/filter.js";
import uploadFiles from "@/components/uploadFiles.vue";
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
  // import引入的组件需要注入到对象中才能使用
  components: {
    uploadFiles,
  },
  setup(props, context) {
    const store = useStore(); //使用vuex厂库
    store.dispatch("actGetParamsByTypeId"); //派遣actions中的方法

    const methods = {
      // 按钮权限判断
      PermissionFn(permission) {
        return filterPermissionFn(this.$route.meta.index, permission);
      },
      // 展开、收起
      unfoldPackUpFn() {
        data.unfoldPackUpFlag = !data.unfoldPackUpFlag;
      },
      // 增加类型
      addTypeBtnFn() {
        const obj = {
          typeName: "",
          unit: "",
          sortNo: "",
        };
        data.typeTableData.push(obj);
      },
      // 删除类型
      removeTypeFn(index) {
        if (data.typeTableData.length <= 1) {
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
            data.typeTableData.splice(index, 1);
            ElMessage({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {});
      },
      // 保存
      submitForm(form) {
        console.log(data.typeTableData);
        console.log(data.workTypeForm);
        this.$refs[form].validate((valid) => {
          if (valid) {
            data.workTypeFormVisible = false;
            data.typeTableData = [
              {
                typeName: "",
                unit: "",
                sortNo: "",
              },
            ];
            data.workTypeForm = {
              id: "",
              workName: "", // 作业名称
              sortNo: "", // 排序号
              beforeFlag: "否", // 作业前拍照
              inFlag: "否", // 作业中拍照
              afterFlag: "否", // 作业后拍照
              wfFlag: "0", // 是否需要确认流程
              refFlag: "0", // 是否需要反向关联
            };
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
        if (data.multipleSelection.length < 1) {
          ElMessage.warning({
            message: "请选择删除项！",
            type: "warning",
          });
        }
        console.log(data.multipleSelection);
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
      // 设置表单数据
      initializeFn(data) {
        const workTypeForm = {
          id: data.id,
          type: data.type, // 章节
          workName: data.workName, // 作业名称
          unitsType: data.unitsType, // 计量单位属性
          unitsCode: data.unitsCode, // 计量单位
          sortNo: data.sortNo, // 排序号
          beforeFlag: data.beforeFlagName, // 作业前拍照
          inFlag: data.inFlagName, // 作业中拍照
          afterFlag: data.afterFlagName, // 作业后拍照
          wfFlag: data.wfFlag, // 是否需要确认流程
          refFlag: data.refFlag, // 是否需要反向关联
        };
        data.workTypeForm = workTypeForm;
        data.workTypeFormVisible = true;
        data.isSplit = data.isSplit == "1";
      },
      // 查看
      handleClick(data) {
        data.handleFlag = false;
        methods.initializeFn(data);
      },
      // 编辑
      updateFn(data) {
        data.handleFlag = true;
        methods.initializeFn(data);
      },
      // 删除
      removeFn(index) {},
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
          type: data.byTypeId,
          workName: data.inputWorkName,
        };
        store.dispatch("actGetPage", obj).then(() => {
          data.loading = false;
        });
      },
    };
    const data = reactive({
      exportBtnIcon: "el-icon-bottom",
      handleFlag: true,
      labelWidth: "120px",
      labelPosition: "right",
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
      workTypeForm: {
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
      },
      isSplit: true,
      typeTableData: [
        {
          typeName: "",
          unit: "",
          sortNo: "",
        },
      ],
      workTypeFormVisible: false,
      inputWorkName: "",
      selectFlag: false,
      byTypeId: "",
      // 表头数组
      tableColumnList: [
        {
          prop: "id",
          label: "ID",
          width: "80",
          checked: true,
        },
        {
          prop: "type",
          label: "章节",
          width: "120",
          checked: true,
        },
        {
          prop: "workName",
          label: "作业名称",
          width: "120",
          checked: true,
        },
        {
          prop: "beforeFlagName",
          label: "作业前拍照",
          width: "120",
          checked: true,
        },
        {
          prop: "inFlagName",
          label: "作业中拍照",
          width: "120",
          checked: true,
        },
        {
          prop: "afterFlagName",
          label: "作业后拍照",
          width: "120",
          checked: true,
        },
        {
          prop: "unitsTypeName",
          label: "计量单位属性",
          width: "120",
          checked: true,
        },
        {
          prop: "unitsName",
          label: "计量单位",
          width: "120",
          checked: true,
        },
        {
          prop: "sortNo",
          label: "排序号",
          width: "120",
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
      rules: {
        id: [
          {
            required: true,
            message: "请输入ID",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          {
            required: true,
            message: "请选择章节",
            trigger: ["blur", "change"],
          },
        ],
        workName: [
          {
            required: true,
            message: "请输入作业名称",
            trigger: ["blur", "change"],
          },
        ],
        unitsType: [
          {
            required: true,
            message: "请选择计量单位属性",
            trigger: ["blur", "change"],
          },
        ],
        unitsCode: [
          {
            required: true,
            message: "请选择计量单位",
            trigger: ["blur", "change"],
          },
        ],
        sortNo: [
          {
            required: true,
            message: "请输入排序号",
            trigger: ["blur", "change"],
          },
        ],
      },
      oSelectWrap: false,
    });
    data.tableColumnValue = data.tableColumnList;
    methods.getDataApi();
    onBeforeMount(() => {
      // 生命周期 - 挂载之前
    });
    onMounted(() => {
      // 生命周期 - 挂载完成（可以访问DOM元素）
    });
    onBeforeUpdate(() => {
      // 生命周期 - 更新之前
    });
    onUpdated(() => {
      // 生命周期 - 更新之后
    });
    onBeforeUnmount(() => {
      // 生命周期 - 销毁之前
    });
    onUnmounted(() => {
      // 生命周期 - 销毁完成
    });
    onActivated(() => {
      // 如果页面有keep-alive缓存功能，这个函数会触发
    });

    // 监听属性 类似于data概念
    const paramsByTypeId = computed(() => {
      return store.state.paramsByTypeId;
    });
    const pageData = computed(() => {
      return store.state.pageData;
    });
    // 将数据及方法return出去才能挂载使用
    return {
      ...methods,
      ...toRefs(data), //将复杂数据类型转为简单数据类型
      paramsByTypeId,
      pageData,
    };
  },
};
</script>

<style lang="less" scoped>
.workType {
  .condition-active {
    height: 4rem;
    overflow: hidden;
    transition: all 1s;
  }

  .el-pagination {
    padding: 5px;
  }
}
</style>
