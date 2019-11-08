<!-- 教材章节 -->
<template>
  <div class="custom-tree-container">
    <div class="modelSave">
      <div class="block">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <!-- parent,children -->
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="opt">
              <!-- 章节操作 -->
              <label v-if="data.children">
                <el-button
                  class="drop_but"
                  title="新增"
                  type="text"
                  size="mini"
                  @click="saveSection(node.label,data.id)"
                >
                  <i class="el-icon-plus"></i>
                </el-button>
                <el-button
                  class="drop_but"
                  title="编辑"
                  type="text"
                  size="mini"
                  @click="editChapter(node.label,data.id)"
                >
                  <i class="el-icon-edit-outline"></i>
                </el-button>
                <el-button
                  class="drop_but"
                  title="删除"
                  type="text"
                  size="mini"
                  @click="removeChapter(data.id)"
                >
                  <i class="el-icon-delete-solid"></i>
                </el-button>
              </label>
              <!-- 资源操作  -->
              <label v-else>
                <el-button
                  class="drop_but"
                  title="编辑"
                  type="text"
                  size="mini"
                  @click="editResources(node, data.id)"
                >
                  <i class="el-icon-edit-outline"></i>
                </el-button>
                <el-button
                  class="drop_but"
                  title="删除"
                  type="text"
                  size="mini"
                  @click="removeChapterResource(data.id)"
                >
                  <i class="el-icon-delete-solid"></i>
                </el-button>
              </label>
            </span>
          </span>
        </el-tree>
      </div>
      <!-- 添加模块  -->
      <div id="container" class="am-padding-sm am-form module_sortable">
        <div class="np-module-edit" v-on:click="addModule()">
          <a class="np-btn-add-module btnAddModule">
            <i class="el-icon-circle-plus"></i>
            <!-- <i class="el-icon-circle-plus-outline"></i> -->
            <span style="color:#409EFF">添加模块</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 添加章 -->
    <el-dialog
      title="创建章"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="标题" prop="chapterName">
          <el-input v-model="form.chapterName" @keyup.enter.native="bookChapterSave('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bookChapterSave('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑章 -->
    <el-dialog
      title="编辑章"
      :visible.sync="dialogEditChapter"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="标题" prop="chapterName">
          <el-input v-model="form.chapterName" @keyup.enter.native="bookChapterEdit('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditChapter = false">取 消</el-button>
        <el-button type="primary" @click="bookChapterEdit('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑节 -->
    <el-dialog
      title="编辑节"
      :visible.sync="dialogEditSection"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="标题" prop="chapterName">
          <el-input v-model="form.chapterName" @keyup.enter.native="bookChapterEdit('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditSection = false">取 消</el-button>
        <el-button type="primary" @click="bookChapterEdit('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加节 -->
    <el-dialog
      title="创建节"
      :visible.sync="dialogFormSection"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="标题" prop="sectionName">
          <el-input v-model="form.sectionName" @keyup.enter.native="addSection('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSection = false">取 消</el-button>
        <el-button type="primary" @click="addSection('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 资源库添加资源 -->
    <el-dialog
      title="资源库添加资源"
      :visible.sync="dialogFormResources"
      :close-on-click-modal="false"
      width="80%"
      size="tiny"
    >
      <!-- form -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="资源名称">
          <el-input v-model="formInline.resourceName" placeholder="搜索资源名称" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="formInline.beginDate"
            type="date"
            placeholder="选择日期"
            style="width: 150px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="formInline.endDate"
            type="date"
            placeholder="选择日期"
            style="width: 150px;"
          ></el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          class="chapter_findResource"
          icon="el-icon-search"
          @click="listResource"
        >查询</el-button>
        <p></p>
        <!-- 使用状态 0未使用，1已使用-->
        <el-form-item label="使用状态">
          <el-select v-model="formInline.useStatus" placeholder="请选择" style="width: 150px;">
            <el-option
              v-for="item in options2"
              :key="item.useStatus"
              :label="item.label"
              :value="item.useStatus"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="formInline.resourceType" placeholder="请选择" style="width: 150px;">
            <el-option
              v-for="item in options1"
              :key="item.resourceType"
              :label="item.label"
              :value="item.resourceType"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- end -->
      <!--table -->
      <el-table
        @selection-change="handleSelectionChange"
        ref="table"
        :data="tableData"
        border
        class="table"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column align="center" type="selection" width="50" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          prop="resourceName"
          label="资源名称"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="fileName"
          label="源文件名称"
          width="360"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="resourceType"
          label="类型"
          width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <label v-if="scope.row.resourceType === 0">视频</label>
            <label v-else-if="scope.row.resourceType === 1">模型</label>
            <label v-else-if="scope.row.resourceType === 2">图片</label>
            <label v-else-if="scope.row.resourceType === 3">PPT</label>
            <label v-else-if="scope.row.resourceType === 4">文档</label>
            <label v-else-if="scope.row.resourceType === 5">音频</label>
            <label v-else-if="scope.row.resourceType === 6">FLASH</label>
            <label v-else>其他</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="useStatus"
          label="状态"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope" show-overflow-tooltip>
            <label v-if="scope.row.useStatus === 0">未使用</label>
            <label v-else style="color:#409EFF">已使用</label>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="更新"
          width="165"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="thumbnailPath" label="缩略图" show-overflow-tooltip>
          <template slot-scope="scope">
            <label v-if="scope.row.thumbnailPath != null">
              <img
                :src="dfsServer + scope.row.thumbnailPath"
                width="60"
                height="40"
                class="thumbnailPath"
              />
            </label>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :page-size="pagination.pageSize"
          @current-change="currentChange"
          :current-page="pagination.pageNumber"
          :page-sizes="pagination.pageSizes"
          :total="pagination.totalRows"
          :layout="pagination.layout"
          @size-change="sizeChange"
        ></el-pagination>
      </div>
      <span slot="footer" class="find_dialog-footer">
        <el-button @click="dialogFormResources = false">取 消</el-button>
        <el-button type="primary" @click="editingAndAdding">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;

export default {
  data() {
    const data = []; //tree
    return {
      rules: {
        chapterName: [
          { required: true, message: "标题名称不能为空", trigger: "blur" }
        ],
        sectionName: [
          { required: true, message: "标题名称不能为空", trigger: "blur" }
        ]
      },
      //资源类型
      options1: [
        {
          resourceType: "null",
          label: "全部"
        },
        {
          resourceType: "0",
          label: "视频"
        },
        {
          resourceType: "1",
          label: "模型"
        },
        {
          resourceType: "2",
          label: "图片"
        },
        {
          resourceType: "3",
          label: "PPT"
        },
        {
          resourceType: "4",
          label: "文档"
        },
        {
          resourceType: "5",
          label: "音频"
        },
        {
          resourceType: "6",
          label: "FLASH"
        },
        {
          resourceType: "7",
          label: "其他"
        }
      ],
      //发布选项
      options2: [
        {
          useStatus: "null",
          label: "全部"
        },
        {
          useStatus: "0",
          label: "未使用"
        },
        {
          useStatus: "1",
          label: "已使用"
        }
      ],
      tableData: [], //资源
      tenantId: null, //租户ID
      dfsServer: null,
      //弹窗
      dialogFormVisible: false, //章弹窗
      dialogEditChapter: false,
      dialogFormSection: false,
      dialogFormResources: false,
      dialogEditSection: false,
      textbookId: 0, //教材ID
      textbookCategoryId: null, //节ID
      textbookCategoryResourceId: null, //资源ID
      chapterName: null, //章
      sectionName: null, //节
      textbookCategoryChildrenList: [],
      //选项
      editOptionRadio: 0, //选项与确定标识(0添加 1编辑)
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: "resourceId", // 标识列表数据中每一行的唯一键
      //新增选项列表
      addResourceList: [], //新增集合
      optionTitleName: null, //资源名称
      optionResourceId: null, //资源ID
      optionTextbookCategoryResourceId: null, //教材章节资源表ID
      //表单
      beginDate: "", //开始
      endDate: "", //结束
      //资源列表——分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数
        pageSizes: [5, 10, 50, 100], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      formInline: {
        textbookId: null
      },
      form: {
        chapterName: null, //章名称
        sectionName: null, ////节名称
        sectionId: 0, //节ID
        categoryId: 0 //章ID
      },
      data: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.$store.commit("user");
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
    if (localStorage.getItem("dfsServer")) {
      this.dfsServer = localStorage.getItem("dfsServer");
    } else {
      this.dfsServer = this.$store.state.dfsServer;
    }
  },
  mounted() {
    this.chapterList();
  },
  methods: {
    // 设置选中的方法
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      let that = this;
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.table.clearSelection();
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true);
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        return;
      }
      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      let selectIds = [];
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    //设置分页大小
    sizeChange(val) {
      // 改变每页显示条数的时候调用一次
      this.changePageCoreRecordData();
      this.pagination.pageSize = val;
      this.listResource();
    },
    // 当选择项发生变化时会触发该事件,进行选中数据赋值
    handleSelectionChange(val) {
      var that = this;
      //注意:分页与勾选都会先执行一次该事件。
      that.multipleSelection = val;
      //集合
      var resourceLists = []; //新增集合addResourceList
      //添加
      if (that.editOptionRadio == 0) {
        for (var i = 0; i < val.length; i++) {
          resourceLists[i] = {};
          resourceLists[i].titleName = val[i].resourceName;
          resourceLists[i].resourceId = val[i].resourceId;
          resourceLists[i].resourceType = val[i].resourceType;
          resourceLists[i].textbookCategoryId = that.textbookCategoryId;
          resourceLists[i].textbookId = that.$route.query.textbookId;
        }
        //1.点击分页就会执行事件,所以进来需要判断分页没有选择数据,进行拼接。
        if (
          val.length <= 0 &&
          resourceLists.length <= 0 &&
          that.multipleSelectionAll.length > 0
        ) {
          that.addResourceList = that.addResourceList.concat(resourceLists);
          return that.addResourceList;
          //2.判断点击分页且选择了数据,进行拼接返回。
        } else if (
          val.length > 0 &&
          resourceLists.length > 0 &&
          that.multipleSelectionAll.length > 0
        ) {
          //3.点击分页就会执行事件：所以需要在判断,当前页是否包含已经选中(选中的无需拼接))
          that.addResourceList = that.addResourceList.concat(resourceLists);
          var result = [];
          var obj = {};
          //去重
          for (var i = 0, len = that.addResourceList.length; i < len; i++) {
            if (!obj[that.addResourceList[i].resourceId]) {
              result.push(that.addResourceList[i]);
              obj[that.addResourceList[i].resourceId] = true;
            }
          }
          that.addResourceList = result;
          return that.addResourceList;
        }
        //没有分页 直接返回获取的数据
        that.addResourceList = resourceLists;
        return that.addResourceList;
        //编辑
      } else if (that.editOptionRadio == 1) {
        that.optionTitleName = val[0].resourceName;
        that.optionResourceId = val[0].resourceId;
        that.optionTextbookCategoryResourceId = that.textbookCategoryResourceId;
        //未分页,单选设置
        if (val.length > 1) {
          that.$refs.table.toggleRowSelection(val[0], false);
        }
        //进行分页,单选设置
        if (that.multipleSelectionAll.length > 1) {
          that.$refs.table.toggleRowSelection(val[0], false);
        }
      }
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData();
    },

    //格式化 GMT+0800 (中国标准时间) 为正常时间
    formartDate(inputTime) {
      //转换日期格式yyyy-MM-dd HH:mm:ss
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    //章节资源信息
    chapterList() {
      var that = this;
      this.$axios({
        method: "get",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookCategory/listTextbookCategory",
        params: {
          textbookId: this.$route.query.textbookId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var data = result.data.data;
          var data2 = [];
          if (!!data) {
            //解析外层数组对象
            for (var i = 0; i < data.length; i++) {
              data2[i] = {};
              data2[i].id = data[i].textbookCategoryId;
              var chapterIndex = that.exchangeChapter(i);
              data2[i].label = `第${chapterIndex}章 ` + data[i].name;
              data2[i].children = [];
              if (!!data[i].textbookCategoryChildrenList) {
                for (
                  var j = 0;
                  j < data[i].textbookCategoryChildrenList.length;
                  j++
                ) {
                  var sectionIndex = that.exchangeChapter(j);
                  data2[i].children[j] = {};
                  data2[i].children[j]["id"] = true;
                  data2[i].children[j].id =
                    data[i].textbookCategoryChildrenList[j].textbookCategoryId;
                  data2[i].children[j]["label"] = true;
                  data2[i].children[j].label =
                    `第${sectionIndex}节 ` +
                    data[i].textbookCategoryChildrenList[j].name;
                  data2[i].children[j]["children"] = true;
                  data2[i].children[j].children = [];
                  if (
                    !!data[i].textbookCategoryChildrenList[j]
                      .textbookCategoryResourceChildrenList
                  ) {
                    for (
                      var k = 0;
                      k <
                      data[i].textbookCategoryChildrenList[j]
                        .textbookCategoryResourceChildrenList.length;
                      k++
                    ) {
                      data2[i].children[j].children[k] = {};
                      data2[i].children[j].children[k]["id"] = true;
                      data2[i].children[j].children[k]["label"] = true;
                      data2[i].children[j].children[k].id =
                        data[i].textbookCategoryChildrenList[
                          j
                        ].textbookCategoryResourceChildrenList[
                          k
                        ].textbookCategoryResourceId;
                      data2[i].children[j].children[k].label =
                        `资源 ${k + 1} ` +
                        data[i].textbookCategoryChildrenList[j]
                          .textbookCategoryResourceChildrenList[k].titleName;
                    }
                  }
                }
              }
            }
          }
          // console.log(JSON.stringify(data2));
          that.data = data2;
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //添加章
    bookChapterSave(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/ar-textbook/textbookCategory/addTextbookCategory",
            data: {
              name: that.form.chapterName,
              level: 0,
              parentId: 1,
              textbookId: this.$route.query.textbookId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.dialogFormVisible = false;
                this.chapterList();
              } else {
                alert("异常" + result.data.returnCode);
              }
            })
            .catch(reject => {
              console.log(reject);
            });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //添加节
    addSection(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/ar-textbook/textbookCategory/addTextbookCategory",
            data: {
              level: 1,
              parentId: that.form.sectionId,
              name: that.form.sectionName,
              textbookId: this.$route.query.textbookId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.dialogFormSection = false;
                this.chapterList();
              } else {
                alert("异常" + result.data.returnCode);
              }
            })
            .catch(reject => {
              console.log(reject);
            });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //编辑章,节
    bookChapterEdit(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/ar-textbook/textbookCategory/editTextbookCategory",
            data: {
              name: that.form.chapterName,
              textbookCategoryId: that.form.categoryId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.dialogEditChapter = false;
                this.dialogEditSection = false;
                this.chapterList();
              } else {
                alert("异常" + result.data.returnCode);
              }
            })
            .catch(reject => {
              console.log(reject);
            });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //添加
    sureAddResource() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookCategoryResource/addTextbookCategoryResource",
        data: that.addResourceList
      })
        .then(result => {
          // console.log(that.addResourceList);
          if (result.data.returnMsg === "请求成功") {
            this.dialogFormResources = false;
            this.$message.success("添加成功!");
            this.chapterList();
          } else if (result.data.returnCode === 50001) {
            alert("服务端异常, 请联系开发人员！");
          } else {
            alert("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //编辑
    sureEditResource() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookCategoryResource/editTextbookCategoryResource",
        data: {
          resourceId: that.optionResourceId,
          textbookCategoryResourceId: that.optionTextbookCategoryResourceId,
          textbookId: that.$route.query.textbookId,
          titleName: that.optionTitleName
        }
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.dialogFormResources = false;
            this.$message.success("编辑成功!");
            this.chapterList();
          } else if (result.data.returnCode === 50001) {
            alert("服务端异常, 请联系开发人员！");
          } else {
            alert("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //编辑与添加
    editingAndAdding() {
      var that = this;
      // 选中的数据与包含跨页数据
      if (
        that.multipleSelection.length <= 0 &&
        that.multipleSelectionAll.length <= 0
      ) {
        that.$message.error("请选择数据!");
        return;
      }
      if (that.editOptionRadio == 0) {
        //添加
        that.sureAddResource();
      } else if (that.editOptionRadio == 1) {
        //编辑
        that.sureEditResource();
      } else {
        alert("浏览器异常,请刷新!");
      }
    },
    //移除章节
    removeChapter(textbookCategoryId) {
      var that = this;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookCategory/deleteTextbookCategory?textbookCategoryId=" +
          textbookCategoryId
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("删除成功!");
          this.chapterList();
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //删除资源
    removeChapterResource(textbookCategoryResourceId) {
      var that = this;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbookCategoryResource/deleteTextbookCategoryResource?textbookCategoryResourceId=" +
          textbookCategoryResourceId
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.$message.success("删除成功!");
          this.chapterList();
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //资源库列表
    listResource() {
      var that = this;
      //时间校验
      if (!that.formInline.beginDate) {
        that.beginDate = "";
      } else {
        that.beginDate = that.formartDate(that.formInline.beginDate);
      }
      if (!that.formInline.endDate) {
        that.endDate = "";
      } else {
        that.endDate = that.formartDate(that.formInline.endDate);
      }
      //请求
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/resource/resource/listResource",
        data: {
          pageSize: that.pagination.pageSize,
          pageNum: that.pagination.pageNumber,
          tenantId: that.tenantId,
          useStatus: that.formInline.useStatus,
          resourceName: that.formInline.resourceName,
          beginDate: that.beginDate,
          endDate: that.endDate,
          resourceType: that.formInline.resourceType
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data.content;
          that.pagination.totalRows = Number(result.data.data.total);
          //resourceId 唯一键获取——选项交互
          for (var i = 0; i < tableData.length; i++) {
            that.resourceId = tableData[i].resourceId;
          }
          that.tableData = tableData;
          setTimeout(() => {
            this.setSelectRow();
          }, 20);
        } else if (
          result.data.returnCode === 500 ||
          result.data.returnCode === 50001
        ) {
          alert("异常:" + result.data.returnCode);
        } else {
          alert(result.data.returnMsg);
        }
      });
      this.dialogFormResources = true;
    },
    //动作添加
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    //章节转换
    exchangeChapter(i, j, k) {
      if (!j && !k) {
        var chineseNum = this.doExchange(i + 1);
        return chineseNum;
      }
    },
    //解析阿拉伯数字
    doExchange(num) {
      var chnNumChar = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
      var chnUnitChar = ["", "十", "百", "千"];
      function SectionToChinese(section) {
        var strIns = "",
          chnStr = "";
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
          var v = section % 10;
          if (v === 0) {
            if (!zero) {
              zero = true;
              chnStr = chnNumChar[v] + chnStr;
            }
          } else {
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
          }
          unitPos++;
          section = Math.floor(section / 10);
        }
        return chnStr;
      }
      function NumberToChinese(num) {
        var unitPos = 0;
        var strIns = "",
          chnStr = "";
        var needZero = false;
        if (num === 0) {
          return chnNumChar[0];
        }
        while (num > 0) {
          var section = num % 10000;
          if (needZero) {
            chnStr = chnNumChar[0] + chnStr;
          }
          strIns = SectionToChinese(section);
          strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
          chnStr = strIns + chnStr;
          needZero = section < 1000 && section > 0;
          num = Math.floor(num / 10000);
          unitPos++;
        }
        return chnStr;
      }
      return NumberToChinese(num);
    },
    // 分页导航
    currentChange(val) {
      // 改变页的时候调用一次
      this.changePageCoreRecordData();
      this.pagination.pageNumber = val;
      this.listResource();
    },
    //章弹窗
    addModule() {
      this.form.chapterName = "";
      this.dialogFormVisible = true;
    },
    //新增——节资源弹窗
    saveSection(label, id) {
      if (label.indexOf("章") !== -1 && label.indexOf("章") < 10) {
        //节
        this.form.sectionName = "";
        this.form.sectionId = id;
        this.dialogFormSection = true;
      } else if (label.indexOf("节") !== -1 && label.indexOf("节") < 10) {
        //初始化弹窗列表
        this.addResourceList = [];
        this.multipleSelectionAll = [];
        this.multipleSelection = [];
        this.pagination.pageNumber = 1;
        //资源
        this.editOptionRadio = 0;
        //节ID
        this.textbookCategoryId = id;
        this.listResource();
      }
    },
    //编辑资源
    editResources(node, id) {
      this.editOptionRadio = 1;
      this.textbookCategoryResourceId = id;
      //初始化弹窗列表
      this.multipleSelectionAll = [];
      this.multipleSelection = [];
      this.pagination.pageNumber = 1;
      this.listResource();
    },
    //编辑——章节弹窗
    editChapter(label, id) {
      if (label.indexOf("章") !== -1 && label.indexOf("章") < 10) {
        //截取0至章之后的值赋值给name
        var index1 = label.indexOf("章");
        var chapterName = label.substr(index1 + 1).trim();
        this.form.chapterName = chapterName;
        this.form.categoryId = id;
        this.dialogEditChapter = true;
      } else if (label.indexOf("节") !== -1 && label.indexOf("节") < 10) {
        //截取0至节之后的值赋值给name
        var index1 = label.indexOf("节");
        var chapterName = label.substr(index1 + 1).trim();
        this.form.chapterName = chapterName;
        this.form.categoryId = id;
        this.dialogEditSection = true;
      }
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  padding-right: 500px;
}

.add_chapter {
  margin: 5px 0px 14px 850px;
}

.el-tree-node__content {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 25px;
  cursor: pointer;
  padding: 15px 0px 0px 15px;
  padding-bottom: 15px;
}
.el-button + .el-button {
  margin-left: 20px;
}
.el-button--text {
  background: 0 0;
  padding-left: 30px;
  padding-right: 35;
  font-size: x-large;
}
.el-checkbox__inner {
  position: relative;
  border-radius: 2px;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
}

.el-dropdown-link {
  cursor: pointer;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.block {
  margin: 0px 0px 30px 0px;
}
.modelSave {
  margin: 0px 0px 15px 0px;
}
.drop_but {
  font-size: 20px;
  padding: 0px 0px 0px 0px;
}
.np-module-edit:hover {
  background-color: #eceff3;
}
.np-btn-add-module {
  color: #666;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: block;
  padding: 6px 0px;
  border: 1px solid #ddd;
  margin: 6px 0px 0px 0px;
}
.am-icon-plus:before {
  content: "\f067";
}
.opt {
  display: none;
}
.el-tree-node__content:hover .opt {
  background-color: #f5f7fa;
  display: block;
}
</style>