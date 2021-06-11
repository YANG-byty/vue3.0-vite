<!-- 施工类型 -->
<template>
  <div class="workType">
    <div
      :class="{ 'condition-wrap': true, 'condition-active': !unfoldPackUpFlag }"
      ref="conditionWrap"
    >
      <div class="block">
        <span>章节：</span>
        <el-select v-model="byTypeId" placeholder="请选择章节">
          <el-option
            v-for="item in paramsByTypeId"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
      </div>
      <div class="block">
        <span>作业名称：</span>
        <el-input
          v-model="inputWorkName"
          placeholder="请输入作业名称"
        ></el-input>
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
        <el-button type="primary" icon="el-icon-delete" plain @click="deleteFn"
          >删除</el-button
        >
        <el-button type="primary" icon="el-icon-bottom" plain @click="exportFn"
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
      <div class="select-wrap" ref="selectWrap">
        <el-checkbox-group v-model="checkedColumn" @change="columnChangeFn">
          <el-checkbox
            v-for="item in tableColumnValue"
            :label="item.prop"
            :key="item.prop"
            :checked="item.checked"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
        <div class="select-btn">
          <el-button type="primary" plain @click="closeSelectFn"
            >隐藏</el-button
          >
        </div>
      </div>
      <el-table
        border
        stripe
        ref="multipleTable"
        :data="pageData.dataList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        max-height="500"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          :resizable="true"
        ></el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          min-width="60"
          align="center"
          :resizable="true"
        ></el-table-column>
        <el-table-column
          :resizable="true"
          v-for="item in tableColumnList"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          show-overflow-tooltip
          stripe="true"
          header-align="center"
          :align="item.prop == 'workName' ? 'left' : 'center'"
        ></el-table-column>
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
                @click="tableColumnSelectFn"
                class="iconfont icon-shaixuan1 iconSelect"
              ></i
            ></span>
          </template>
          <template #default="scope">
            <el-button
              icon="el-icon-reading"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              size="small"
              @click="updateFn(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              @click="removeFn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.count"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <el-dialog title="增加数据" center v-model="workTypeFormVisible">
      <div class="mask-wrap">
        <el-form
          :label-position="labelPosition"
          ref="workTypeForm"
          :rules="rules"
          :model="workTypeForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <div class="mask-table" v-if="handleFlag">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="ID：" prop="id" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-input
                    v-model="workTypeForm.id"
                    placeholder="请输入ID"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="章节："
                  :label-width="labelWidth"
                  prop="type"
                >
                  <em class="em"></em>
                  <el-select
                    v-model="workTypeForm.type"
                    placeholder="请选择章节"
                  >
                    <el-option
                      v-for="item in paramsByTypeId"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
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
                  <em class="em"></em>
                  <el-input
                    v-model="workTypeForm.workName"
                    placeholder="请输入作业名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="计量单位："
                  prop="unitsCode"
                  :label-width="labelWidth"
                >
                  <em class="em"></em>
                  <el-select
                    v-model="workTypeForm.unitsCode"
                    placeholder="请选择计量单位"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
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
                  <em class="em"></em>
                  <el-select
                    v-model="workTypeForm.unitsType"
                    placeholder="请选择单位属性"
                  >
                    <el-option label="按面积计算" value="0"></el-option>
                    <el-option label="按固定数量计算" value="1"></el-option>
                    <el-option label="按长度计算" value="2"></el-option>
                    <el-option label="按体积计算" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="排序号："
                  prop="sortNo"
                  :label-width="labelWidth"
                >
                  <em class="em"></em>
                  <el-input
                    v-model="workTypeForm.sortNo"
                    placeholder="请输入排序号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="作业前拍照：" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-switch
                    v-model="workTypeForm.beforeFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="作业中拍照：" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-switch
                    v-model="workTypeForm.inFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="作业后拍照：" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-switch
                    v-model="workTypeForm.afterFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="是"
                    inactive-value="否"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="需要确定流程：" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-switch
                    v-model="workTypeForm.wfFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="需要反向关联：" :label-width="labelWidth">
                  <em class="em"></em>
                  <el-switch
                    v-model="workTypeForm.refFlag"
                    active-text="是"
                    inactive-text="否"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" v-else>
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
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </el-col>
          </el-row>
          <!-- 增加类型 -->
          <div class="typeTab-wrap" v-if="isSplit">
            <el-button
              class="addTypeBtn"
              icon="el-icon-circle-plus-outline"
              type="primary"
              @click="addTypeBtnFn"
              v-if="handleFlag"
              >增加</el-button
            >
            <el-row :gutter="20">
              <el-col :span="24">
                <table
                  class="typeTab"
                  border="0"
                  cellspacing="1"
                  cellpadding="0"
                  v-if="handleFlag"
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
                      ></el-input>
                    </td>
                    <td>
                      <el-input
                        v-model="item.unit"
                        placeholder="请输入单位"
                      ></el-input>
                    </td>
                    <td>
                      <el-input
                        v-model="item.sortNo"
                        placeholder="请输入排序号"
                      ></el-input>
                    </td>
                    <td>
                      <el-button
                        @click="removeTypeFn(index)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                    </td>
                  </tr>
                </table>
                <el-table
                  align="center"
                  :data="typeTableData"
                  max-height="300"
                  border
                  style="width: 100%"
                  v-else
                >
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="++index"
                    label="序号"
                    min-width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="typeName"
                    label="名称"
                    min-width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="unit"
                    label="单位"
                    min-width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    :resizable="true"
                    header-align="center"
                    prop="sortNo"
                    label="排序号"
                    min-width="100"
                  >
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
          <div class="mask-btn">
            <el-button
              type="primary"
              @click="submitForm('workTypeForm')"
              v-if="handleFlag"
              >提交</el-button
            >
            <el-button @click="workTypeFormVisible = false">关闭</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ElMessage } from "element-plus";
import { h } from "vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
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
        type: "", //章节
        workName: "", //作业名称
        unitsType: "", //计量单位属性
        unitsCode: "", //计量单位
        sortNo: "", //排序号
        beforeFlag: "否", //作业前拍照
        inFlag: "否", //作业中拍照
        afterFlag: "否", //作业后拍照
        wfFlag: "0", //是否需要确认流程
        refFlag: "0", //是否需要反向关联
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
      multipleSelection: [], //表格选中的选项
      tableColumnValue: [], //动态表头数据
      checkedColumn: [], //动态表头数据
      loading: true,
      page: 1,
      limit: 10,
      currentPage: 1,
      rules: {
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        type: [{ required: true, message: "请选择章节", trigger: "blur" }],
        workName: [
          { required: true, message: "请输入作业名称", trigger: "blur" },
        ],
        unitsType: [
          { required: true, message: "请选择计量单位属性", trigger: "blur" },
        ],
        unitsCode: [
          { required: true, message: "请选择计量单位", trigger: "blur" },
        ],
        sortNo: [{ required: true, message: "请输入排序号", trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    paramsByTypeId() {
      return this.$store.state.paramsByTypeId;
    },
    pageData() {
      return this.$store.state.pageData;
    },
    windowH() {
      return this.$store.state.windowH - 70;
    },
  },
  //监控data中的数据变化
  watch: {},
  methods: {
    //展开、收起
    unfoldPackUpFn() {
      this.unfoldPackUpFlag = !this.unfoldPackUpFlag;
    },
    // 增加类型
    addTypeBtnFn() {
      let obj = {
        typeName: "",
        unit: "",
        sortNo: "",
      };
      this.typeTableData.push(obj);
    },
    // 删除类型
    removeTypeFn(index) {
      if (this.typeTableData.length <= 1) {
        this.$message({
          type: "warning",
          message: "至少要保留一项",
        });
        return;
      }
      this.$msgbox({
        title: "提示",
        message: h("p", null, [h("span", null, "确定要删除此项吗？ ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.typeTableData.splice(index, 1);
            done();
          } else {
            done();
          }
        },
      }).then((action) => {});
    },
    // 保存
    submitForm(workTypeForm) {
      console.log(this.typeTableData);
      console.log(this.workTypeForm);
      this.$refs[workTypeForm].validate((valid) => {
        if (valid) {
          this.workTypeFormVisible = false;
          this.typeTableData = [
            {
              typeName: "",
              unit: "",
              sortNo: "",
            },
          ];
          this.workTypeForm = {
            id: "",
            workName: "", //作业名称
            sortNo: "", //排序号
            beforeFlag: "否", //作业前拍照
            inFlag: "否", //作业中拍照
            afterFlag: "否", //作业后拍照
            wfFlag: "0", //是否需要确认流程
            refFlag: "0", //是否需要反向关联
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表头筛选
    oSelectWrap(msg) {
      let oSelectWrap = this.$refs.selectWrap;
      oSelectWrap.style.display = msg;
    },
    tableColumnSelectFn() {
      this.oSelectWrap("block");
    },
    closeSelectFn() {
      this.oSelectWrap("none");
    },
    // 点击多选框
    columnChangeFn() {
      let arr = [];
      this.tableColumnList = this.tableColumnValue.map((item) => {
        if (this.checkedColumn.includes(item.prop)) {
          arr.push(item);
        }
        return arr;
      });
      this.tableColumnList = arr;
    },
    // 表格多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 增加
    addFn() {
      this.handleFlag = this.isSplit = true;
      this.workTypeForm = {
        id: "",
        type: "", //章节
        workName: "", //作业名称
        unitsType: "", //计量单位属性
        unitsCode: "", //计量单位
        sortNo: "", //排序号
        beforeFlag: "否", //作业前拍照
        inFlag: "否", //作业中拍照
        afterFlag: "否", //作业后拍照
        wfFlag: "0", //是否需要确认流程
        refFlag: "0", //是否需要反向关联
      };
      this.workTypeFormVisible = true;
    },
    // 批量删除
    deleteFn() {
      if (this.multipleSelection.length < 1) {
        ElMessage.warning({
          message: "请选择删除项！",
          type: "warning",
        });
      }
      console.log(this.multipleSelection);
    },
    // 导出
    exportFn() {},
    // 查询
    queryFn() {
      this.getDataApi();
    },
    // 重置
    resetFn() {
      this.byTypeId = this.inputWorkName = "";
    },
    // 设置表单数据
    initializeFn(data) {
      let workTypeForm = {
        id: data.id,
        type: data.type, //章节
        workName: data.workName, //作业名称
        unitsType: data.unitsType, //计量单位属性
        unitsCode: data.unitsCode, //计量单位
        sortNo: data.sortNo, //排序号
        beforeFlag: data.beforeFlagName, //作业前拍照
        inFlag: data.inFlagName, //作业中拍照
        afterFlag: data.afterFlagName, //作业后拍照
        wfFlag: data.wfFlag, //是否需要确认流程
        refFlag: data.refFlag, //是否需要反向关联
      };
      this.workTypeForm = workTypeForm;
      this.workTypeFormVisible = true;
      this.isSplit = data.isSplit == "1" ? true : false;
    },
    // 查看
    handleClick(data) {
      this.handleFlag = false;
      this.initializeFn(data);
    },
    // 编辑
    updateFn(data) {
      this.handleFlag = true;
      this.initializeFn(data);
    },
    // 删除
    removeFn(index) {},
    // 分页
    handleSizeChange(val) {
      this.limit = val;
      // console.log(`每页 ${val} 条`);
      this.getDataApi();
    },
    handleCurrentChange(val) {
      this.page = val;
      // console.log(`当前页: ${val}`);
      this.getDataApi();
    },
    // 封装请求
    getDataApi() {
      let obj = {
        page: this.page,
        limit: this.limit,
        type: this.byTypeId,
        workName: this.inputWorkName,
      };
      this.$store.dispatch("actGetPage", obj);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$store.dispatch("actGetParamsByTypeId");
    this.tableColumnValue = this.tableColumnList;
    this.getDataApi();
  },
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {
    //生命周期 - 挂载完成（可以访问DOM元素）
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeUnmount() {}, //生命周期 - 销毁之前
  unmounted() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.workType {
  .condition-active {
    height: 4rem;
    overflow: hidden;
  }
  .condition-wrap {
    width: 100%;
    font-size: 1.4rem;
    .el-input {
      width: auto;
    }
    & > div {
      float: left;
    }
    .block {
      margin: 0 1rem 1rem 0;
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .btn-wrap {
    margin: 20px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tab-wrap {
    position: relative;
    .select-wrap {
      background-color: #e2e7ea;
      padding: 1.6rem;
      position: absolute;
      z-index: 9999;
      right: 0;
      top: 49px;
      display: none;
      .el-checkbox-group {
        display: flex;
        flex-direction: column;
        .el-checkbox {
          margin-right: 0;
        }
      }
      .select-btn {
        margin-top: 1rem;
        .el-button {
          padding: 0 6px;
          min-height: 24px;
        }
      }
    }
    .iconSelect:hover {
      cursor: pointer;
    }
  }
  .el-pagination {
    padding: 5px;
  }
}
</style>
