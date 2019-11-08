<!-- 教材信息 -->
<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="教材名称">
            <el-input v-model="formInline.textbookName" placeholder="搜索教材名称" style="width: 150px;"></el-input>
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
          <el-button type="primary" icon="el-icon-search" @click="listTextbook">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="bookSaveRecomand()"
          >新增</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            class="handle-del mr10"
            @click="delAll"
          >批量删除</el-button>
          <p></p>
          <el-form-item label="教材分类" prop="categoryId">
            <el-cascader
              clearable
              placeholder="请选择"
              :options="optionsCategory"
              v-model="formInline.categoryId"
              style="width:378px"
              :props="optionProps_b"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf">({{ data.listCategoryResponseList.length }})</span>
              </template>
            </el-cascader>
          </el-form-item>

          <el-form-item label="教材标签">
            <el-select
              v-model="formInline.labelDTOListValue"
              multiple
              placeholder="请选择"
              style="width:378px"
            >
              <el-option-group
                v-for="group in labelDTOList"
                :key="group.labelGroupId"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.labelDTOList"
                  :key="item.labelId"
                  :label="item.name"
                  :value="item.labelId"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <p></p>
          <!-- 发布状态：0未发布,1已发布,2已关闭 -->
          <el-form-item label="发布状态">
            <el-select v-model="formInline.publishStatus" placeholder="请选择" style="width: 150px;">
              <el-option
                v-for="item in options2"
                :key="item.publishStatus"
                :label="item.label"
                :value="item.publishStatus"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 表单end -->
      </div>
      <!--表格列-->
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :header-cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="number" label="编号" width="50"></el-table-column>
        <el-table-column align="center" prop="name" label="教材名称"></el-table-column>
        <!-- <el-table-column align="center" prop="price" label="价格" width="100"></el-table-column> -->
        <el-table-column align="center" prop="studentNumber" label="购买人数" width="100"></el-table-column>
        <el-table-column align="center" prop="publishStatus" label="发布状态" width="130">
          <template slot-scope="scope">
            <label v-if="scope.row.publishStatus === 0">下架</label>
            <label v-if="scope.row.publishStatus === 1" style="color:#409EFF">上架</label>
            <label v-if="scope.row.publishStatus === 2">已关闭</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="recommendStatus" label="推荐状态" width="130">
          <template slot-scope="scope">
            <label v-if="scope.row.recommendStatus === 0">未推荐</label>
            <label v-else style="color:#409EFF">已推荐</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="420" align="center">
          <template scope="scope" style="width: 100%">
            <!-- 状态三种：未发布0，已发布1，已关闭2 -->
            <!-- 未发布 = 发布
            已发布 = 下架
            已关闭 = (再发布)-->
            <label v-if="scope.row.publishStatus === 0">
              <el-button
                class="label-publish"
                type="warning"
                size="small"
                @click="doRecomandPublish(scope.$index, scope.row)"
                icon="el-icon-position"
              >上架</el-button>
            </label>
            <label v-if="scope.row.publishStatus === 1">
              <el-button
                class="label-publish"
                type="primary"
                size="small"
                @click="doExistPublish(scope.$index, scope.row)"
                icon="el-icon-position"
              >下架</el-button>
            </label>
            <label v-if="scope.row.publishStatus === 2">
              <el-button
                class="label-publish"
                type="info"
                size="small"
                @click="doRecomandPublish(scope.$index, scope.row)"
                icon="el-icon-position"
              >再上架</el-button>
            </label>
            <!-- 推荐状态：0未推荐，1已推荐 -->
            <label v-if="scope.row.recommendStatus === 0">
              <el-button
                class="label-publish"
                type="success"
                size="small"
                @click="doRecomandOne(scope.$index, scope.row)"
                icon="el-icon-star-off"
              >推荐</el-button>
            </label>
            <label v-if="scope.row.recommendStatus === 1">
              <el-button
                class="label-publish"
                type="info"
                size="small"
                @click="doRecomandTwo(scope.$index, scope.row)"
              >取消推荐</el-button>
            </label>

            <!-- 跳转教材表单 -->
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete-solid"
              @click="doRecomandDel(scope.$index, scope.row)"
            >删除</el-button>
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
    </div>
    <!-- 添加弹出框 -->
    <el-dialog
      title="添加教材名称"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="35%"
      size="tiny"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="教材名称" prop="name">
          <el-input
            v-model="form.name"
            @keyup.enter.native="bookSave('form')"
            placeholder="必填项,长度1~20字符"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="bookSave('form')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delVisibleAll"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisibleAll = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteAll">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布提示框  -->
    <el-dialog
      title="提示"
      :visible.sync="release"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否确定发布教材？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="release = false">取 消</el-button>
        <el-button type="primary" @click="handlePublish">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 已发布状态删除提示框  -->
    <el-dialog
      title="提示"
      :visible.sync="statusTips"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt" style="color:#409EFF">需要下架,才能删除！</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statusTipsRow">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="statusTipsAll"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt" style="color:#409EFF">需要下架,才能删除！</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="statusTipsRowAll">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 下架提示框  -->
    <el-dialog
      title="提示"
      :visible.sync="releaseClose"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否确定下架教材？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="releaseClose = false">取 消</el-button>
        <el-button type="primary" @click="handleExistPublish">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 推荐弹出框  -->
    <el-dialog
      title="
选择排列顺序"
      :visible.sync="recommendStatusVisible"
      :close-on-click-modal="false"
      width="30%"
      size="tiny"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <el-form-item label="序列号" prop="sort">
          <el-input v-model="form.sort" @keyup.enter.native="recommend('form')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="recommend('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 取消推荐提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="recommendDelVisible"
      :close-on-click-modal="false"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">是否取消推荐？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommendDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelRecommend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {requestBook} from "../../url/index.js";
export default {
  name: "basetable",
  data: function() {
    //教材名称
    const regularBookName = (rule, value, callback) => {
      //支持中文、字母、数字,长度1~20字符
      // const regularTagName = /^([\u4e00-\u9fa5\a-zA-Z0-9]){1,20}$/gi;
      //长度1~20字符(需求改变)
      const regularTagName = /^.{1,20}$/;
      if (!regularTagName.test(value)) {
        callback(new Error("教材名称不能超过20位"));
      } else {
        callback();
      }
    };
    //推荐
    const isNum = (rule, value, callback) => {
      const num = /^[0-9]*$/;
      if (!num.test(value)) {
        callback(new Error("{   推荐序列号只能为数字   }"));
      } else {
        callback();
      }
    };
    return {
      //校验推荐序列号
      rules: {
        sort: [
          { required: true, message: "推荐序列号不能为空", trigger: "blur" },
          { validator: isNum, trigger: "blur" }
        ],
        //名称
        name: [
          { required: true, message: "教材名称不能为空", trigger: "blur" },
          { validator: regularBookName, trigger: "blur" }
        ]
      },
      //分类
      //指定选项的值为选项对象的某个属性值 listCategoryResponseList
      optionProps_b: {
        value: "categoryId",
        label: "name",
        children: "listCategoryResponseList"
      },
      optionsCategory: [],
      recomandIndex: 0, //公共索引
      dfsServer: null, //文件服务器地址前缀
      createUserId: null, // 用户ID
      tenantId: null, //租户ID
      beginDate: null,
      endDate: null,
      labelDTOList: [],
      textbookIdsAll: "",
      publishStatusIdsAll: "",
      level: null, //分类层级
      formInline: {
        textbookId: null,
        textbookName: null,
        labelDTOListValue: [],
        categoryId: "",
        recommendTextbookId: null,
        author: null,
        name: null,
        recommendStatus: null,
        publishStatus: null,
        dialogFormVisible: false,
        recommendStatusVisible: false
      },
      //教材列表
      tableData: [], //教材信息
      textbookIds: [1, 2, 3, 4], //教材ID
      sort: 0, //推荐序列号
      recommendTextbookId: 0, //推荐教材表ID
      //分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数 this.$store.state.pageSize
        pageSizes: [5, 10, 50, 100], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      textbookId: 0, //教材ID
      name: null, //名称
      //弹窗属性设置
      dialogFormVisible: false, //新增弹窗
      recommendStatusVisible: false, //推荐
      delVisible: false, //删除提示框
      delVisibleAll: false,
      recommendDelVisible: false, //推荐提示框
      release: false, //发布提示框
      releaseClose: false, //已发布提示框
      statusTips: false, // 删除已发布提示框
      statusTipsAll: false,
      //发布选项
      options2: [
        {
          publishStatus: "null",
          label: "全部"
        },
        {
          publishStatus: "0",
          label: "下架"
        },
        {
          publishStatus: "1",
          label: "上架"
        },
        {
          publishStatus: "2",
          label: "已关闭"
        }
      ],
      publishStatus: "",
      form: {
        sort: null,
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      id: -1
    };
  },
  created() {
    //调用全局
    this.$store.commit("user");
    //页面监控使用localStorage对用户ID和住户ID进行刷新赋值。
    if (localStorage.getItem("userId")) {
      this.createUserId = localStorage.getItem("userId");
    } else {
      this.createUserId = this.$store.state.userId;
    }
    if (localStorage.getItem("tenantId")) {
      this.tenantId = localStorage.getItem("tenantId");
    } else {
      this.tenantId = this.$store.state.tenantId;
    }
  },
  mounted() {
    this.listTextbook(); //教材列表
    this.listLabelGroupAndLabel(); //内容标签
    this.listCategory(); //分类
  },
  watch: {
    $route: "listTextbook",
    $route: "listLabelGroupAndLabel",
    $route: "listCategory" // 当路由改变再次执行 bookSave
  },
  methods: {
    formartDate(inputTime) {
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
    // 分页导航
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.listTextbook();
    },
    //设置分页大小
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.listTextbook();
    },
    onSubmitFind() {},
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    open1() {
      this.$message({
        showClose: true,
        message: "创建教材成功",
        type: "success"
      });
    },
    //分类列表
    listCategory() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/category/listCategory",
        data: {
          //类型：0教材分类列表  1资源分类列表
          type: 0,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.optionsCategory = result.data.data;
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
    //发布
    handlePublish() {
      var that = this;
      var index = that.recomandIndex;
      var textbookId = that.tableData[index].textbookId;
      this.$axios({
        method: "get",
        url:
          that.$store.state.baseUrl + "/ar-textbook/textbook/publishTextbook",
        params: {
          textbookId: textbookId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.releaseRow();
        } else if (
          result.data.returnCode === 50001 ||
          result.data.returnCode === 500
        ) {
          alert("异常:" + result.data.returnMsg);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //下架
    handleExistPublish(index) {
      var that = this;
      var index = that.recomandIndex;
      var textbookId = that.tableData[index].textbookId;
      this.$axios({
        method: "get",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbook/cancelPublishTextbook",
        params: {
          textbookId: textbookId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.releaseCloseRow();
        } else if (
          result.data.returnCode === 50001 ||
          result.data.returnCode === 500
        ) {
          alert("异常:" + result.data.returnMsg);
        } else {
          alert(result.data.returnMsg);
        }
      });
    },
    //内容标签(标签组和标签列表)
    listLabelGroupAndLabel() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/architecture/label/listLabelGroupAndLabel",
        data: {
          //用于：0教材列表，1:资源列表，2用户列表(单选)
          useOn: 0,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.labelDTOList = result.data.data;
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
    //推荐教材
    recommend(formName) {
      var that = this;
      var index = that.recomandIndex;
      var textbookId = that.tableData[index].textbookId;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl +
              "/ar-textbook/recommendTextbook/addRecommendTextbook",
            data: {
              sort: that.form.sort,
              textbookId: textbookId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.recommendStatusRow();
              } else if (
                result.data.returnCode === 500 ||
                result.data.returnCode === 50001
              ) {
                alert("异常:" + result.data.returnMsg);
              } else {
                alert(result.data.returnMsg);
              }
            })
            .catch(reject => {
              console.log("catch:" + reject);
            });
        } else {
          console.log("error validate submit!!");
          return false;
        }
      });
    },
    //取消推荐
    cancelRecommend() {
      var that = this;
      var index = that.recomandIndex;
      var recommendTextbookId = that.tableData[index].recommendTextbookId;
      this.$axios({
        method: "delete",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/recommendTextbook/deleteRecommendTextbook?recommendTextbookId=" +
          recommendTextbookId
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.doRecomandTwoRow();
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
    //教材列表
    listTextbook() {
      var that = this;
      var categoryId = null;
      that.level = null;
      if (that.formInline.categoryId.splice != null) {
        if (that.formInline.categoryId.length > 1) {
          categoryId =
            that.formInline.categoryId[that.formInline.categoryId.length - 1];
          //分类下拉,获取对应level(后台需要传递categoryId,level))
          if (that.level == null && that.optionsCategory != null) {
            for (var i = 0; i < that.optionsCategory.length; i++) {
              if (that.optionsCategory[i].categoryId == categoryId) {
                that.level = that.optionsCategory[i].level;
                break;
              }
              if (
                that.level == null &&
                that.optionsCategory[i].listCategoryResponseList != null
              ) {
                for (
                  var j = 0;
                  j < that.optionsCategory[i].listCategoryResponseList.length;
                  j++
                ) {
                  if (
                    that.optionsCategory[i].listCategoryResponseList[j]
                      .categoryId == categoryId
                  ) {
                    that.level =
                      that.optionsCategory[i].listCategoryResponseList[j].level;
                    break;
                  }
                  if (
                    that.level == null &&
                    that.optionsCategory[i].listCategoryResponseList[j]
                      .listCategoryResponseList != null
                  ) {
                    for (
                      var k = 0;
                      k <
                      that.optionsCategory[i].listCategoryResponseList[j]
                        .listCategoryResponseList.length;
                      k++
                    ) {
                      if (
                        that.optionsCategory[i].listCategoryResponseList[j]
                          .listCategoryResponseList[k].categoryId == categoryId
                      ) {
                        that.level =
                          that.optionsCategory[i].listCategoryResponseList[
                            j
                          ].listCategoryResponseList[k].level;
                        break;
                      }
                    }
                  } //end
                }
              } //end
            }
          } //end
        } else if (that.formInline.categoryId.length == 1) {
          categoryId = that.formInline.categoryId[0];
          for (let i = 0; i < that.optionsCategory.length; i++) {
            if (that.optionsCategory[i].categoryId == categoryId) {
              that.level = that.optionsCategory[0].level;
            }
          }
        }
      }
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
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/ar-textbook/textbook/listTextbook",
        data: {
          pageSize: that.pagination.pageSize,
          pageNum: that.pagination.pageNumber,
          labelIds: that.formInline.labelDTOListValue,
          categoryId: categoryId, //categoryId
          level: that.level,
          tenantId: that.tenantId,
          textbookName: that.formInline.textbookName,
          beginDate: that.beginDate,
          endDate: that.endDate,
          publishStatus: that.formInline.publishStatus
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          var tableData = result.data.data.content;
          that.pagination.totalRows = Number(result.data.data.total);
          for (var i = 0; i < tableData.length; i++) {
            tableData[i].number = i + 1;
          }
          that.tableData = tableData;
          // console.log(JSON.stringify(that.tableData));
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
    //删除教材
    handleDelete() {
      var that = this;
      var index = that.recomandIndex;
      var publishStatus = that.tableData[index].publishStatus;
      if (publishStatus === 1) {
        that.statusTips = true;
        return;
      }
      var textbookIds = that.tableData[index].textbookId;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbook/batchDeleteTextbook",
        data: {
          textbookIds: [textbookIds]
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.deleteRow();
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
    //批量
    handleDeleteAll() {
      var that = this;
      //状态
      if (that.publishStatusIdsAll.indexOf("1") >= 0) {
        that.statusTipsAll = true;
        return;
      }
      var textbookIdsAll = that.textbookIdsAll.split(",");
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/ar-textbook/textbook/batchDeleteTextbook",
        data: {
          textbookIds: textbookIdsAll
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          this.deleteRowAll();
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
    //新增教材
    bookSave(formName) {
      //1.教材名称校验
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url:
              that.$store.state.baseUrl + "/ar-textbook/textbook/addTextbook",
            data: {
              name: that.form.name,
              tenantId: that.tenantId,
              createUserId: that.createUserId
            }
          })
            .then(result => {
              if (result.data.returnMsg === "请求成功") {
                this.dialogFormVisible = false;
                this.$router.push({
                  path: "bookCommon",
                  query: {
                    /* name: that.form.name, */
                    textbookId: result.data.data.textbookId
                  }
                });
              } else if (result.data.returnCode === 50001) {
                alert("服务端异常, 请联系开发人员！");
              } else {
                alert("获取数据失败");
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

    //编辑跳转
    handleEdit(index) {
      var that = this;
      var textbookId = that.tableData[index].textbookId;
      this.$router.push({
        path: "bookCommon",
        query: {
          textbookId: textbookId
        }
      });
    },
    //批量删除
    delAll() {
      var that = this;
      that.textbookIdsAll = "";
      that.publishStatusIdsAll = "";
      const length = this.multipleSelection.length;
      if (!length) {
        this.$message.error("请勾选数据");
        return;
      }
      for (let i = 0; i < length; i++) {
        that.textbookIdsAll += this.multipleSelection[i].textbookId + ",";
        that.publishStatusIdsAll +=
          that.multipleSelection[i].publishStatus + ",";
      }
      if (that.textbookIdsAll.length > 0) {
        that.textbookIdsAll = that.textbookIdsAll.substr(
          0,
          that.textbookIdsAll.length - 1
        );
      }
      this.delVisibleAll = true;
    },
    //val 为表单选中数据的集合
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        if (this.multipleSelection[i].length != 0) {
          if (this.multipleSelection[i].publishStatus == 1) {
            this.statusTips = true;
            return;
          }
        }
      }
    },
    //删除确定
    deleteRow() {
      this.$message.success("删除成功!");
      this.delVisible = false;
      this.listTextbook();
    },
    //批量确定删除(可以提示删除了多少数据)
    deleteRowAll() {
      this.$message.success("批量删除成功");
      this.multipleSelection = [];
      this.delVisibleAll = false;
      this.listTextbook();
    },
    //发布确定
    releaseRow() {
      this.$message.success("发布成功!");
      this.release = false;
      this.listTextbook();
    },
    //已发布删除
    releaseCloseRow() {
      this.$message.success("下架成功!");
      this.releaseClose = false;
      this.listTextbook();
    },
    //新增事件
    bookSaveRecomand() {
      this.form.name = "";
      this.dialogFormVisible = true;
    },
    //下架-索引传参
    doExistPublish(index, row) {
      this.recomandIndex = index;
      this.releaseClose = true;
    },
    //发布(再发布)-索引传参
    doRecomandPublish(index, row) {
      this.recomandIndex = index;
      this.release = true;
    },
    //删除-索引传参
    doRecomandDel(index, row) {
      this.recomandIndex = index;
      this.delVisible = true;
    },
    //推荐-索引传参
    doRecomandOne(index, row) {
      this.form.sort = ""; //输入框清空
      this.recomandIndex = index;
      this.recommendStatusVisible = true;
    },
    //推荐-确定
    recommendStatusRow() {
      this.$message.success("推荐成功!");
      this.recommendStatusVisible = false;
      this.listTextbook();
    },
    //取消推荐-索引传参
    doRecomandTwo(index, row) {
      this.recomandIndex = index;
      this.recommendDelVisible = true;
    },
    //取消推荐-确定
    doRecomandTwoRow() {
      this.$message.success("取消成功!");
      this.recommendDelVisible = false;
      this.listTextbook();
    },
    //教材已发布-判断
    statusTipsRow() {
      this.statusTips = false;
      this.delVisible = false;
    },
    statusTipsRowAll() {
      this.statusTipsAll = false;
      this.delVisibleAll = false;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.label-publish {
  height: 32px;
  width: 85px;
  margin-right: 10px;
}
</style>
