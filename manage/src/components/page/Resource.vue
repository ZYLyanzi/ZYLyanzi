<!-- 资源管理 -->
<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <!-- 表单start -->
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
          <el-button type="primary" icon="el-icon-search" @click="listResource">查询</el-button>
          <el-button type="primary" @click="onSubmitSave">上传资源</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            class="handle-del mr10"
            @click="delAll()"
          >批量删除</el-button>
          <p></p>
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
          <!-- 资源类型 -->
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
          <el-form-item label="资源分类">
            <el-cascader
              clearable
              style="width:378px"
              :options="reOptionsCategory"
              v-model="formInline.categoryId"
              class="re-category-dialog-select"
              :props="ReoptionProps"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf">({{ data.listCategoryResponseList.length }})</span>
              </template>
            </el-cascader>
          </el-form-item>
          <p></p>
          <!-- 使用状态 0未使用,1已使用-->
          <el-form-item label="资源标签">
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
        </el-form>
        <!-- 表单end -->
      </div>
      <!-- 表格列 -->
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :header-cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50"></el-table-column>
        <el-table-column align="center" prop="number" label="编号" width="50"></el-table-column>
        <el-table-column align="center" prop="resourceName" label="资源名称"></el-table-column>
        <el-table-column align="center" prop="fileName" label="源文件名称"></el-table-column>
        <el-table-column align="center" prop="thumbnailPath" label="缩略图" width="130">
          <template slot-scope="scope">
            <label v-if="scope.row.thumbnailPath != null">
              <img
                :src="dfsServer + scope.row.thumbnailPath"
                width="60"
                height="40"
                class="resourcePath"
              />
            </label>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="resourceType" label="资源类型" width="120">
          <template slot-scope="scope">
            <!-- 0视频，1模型，2图片,3PPT,4文档,5音频,6FLASH,7其他 -->
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
        <el-table-column align="center" prop="useStatus" label="状态" width="100">
          <template slot-scope="scope">
            <!-- 使用状态 0未使用,1已使用-->
            <label v-if="scope.row.useStatus === 0">未使用</label>
            <label v-else style="color:#409EFF">已使用</label>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="165"></el-table-column>
        <el-table-column align="center" label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEditOne(scope.$index, scope.row)"
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
    </div>
    <!-- 编辑资源 -->
    <el-dialog
      title="编辑资源"
      :visible.sync="editOne"
      :close-on-click-modal="false"
      width="48%"
      height="60%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <!-- 资源名称 -->
        <div class="re-el-input">
          <el-form-item label="资源名称" prop="name">
            <el-col class="re-label-dialog-col" :span="18">
              <el-input v-model="uploaderForm.resourceName"></el-input>
            </el-col>
          </el-form-item>
        </div>
        <!-- 资源标签 -->
        <div class="re-lationLabel">
          <el-form-item label="资源标签">
            <el-select
              v-model="uploaderForm.labelIds"
              multiple
              placeholder="请选择"
              class="re-label-dialog-select"
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
            <div class="el-re-selectLabel">最多可关联20个标签</div>
          </el-form-item>
        </div>
        <!-- 资源分类 -->
        <div class="re-category">
          <el-form-item label="资源分类" class="categoryItem">
            <el-cascader
              clearable
              :options="reOptionsCategory"
              v-model="uploaderForm.categoryId"
              class="re-category-dialog-select"
              :props="ReoptionProps"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!node.isLeaf">({{ data.listCategoryResponseList.length }})</span>
              </template>
            </el-cascader>
          </el-form-item>
        </div>
        <!-- 缩略图 -->
        <div class="re-cropImg">
          <el-form-item label="缩略图">
            <div class="crop-demo">
              <img :src="uploaderForm.cropImg?uploaderForm.cropImg:null" class="pre-img" />
              <div class="crop-demo-btn"></div>
              <uploader
                ref="uploadmodel"
                :options="options"
                class="uploader-example3"
                @files-submitted="submitted"
                @file-progress="onFileProgress"
                @file-success="onFileSuccess"
              >
                <uploader-drop>
                  <uploader-btn class="uploader-item">选择图片</uploader-btn>
                </uploader-drop>
                <uploader-list style="display: none;"></uploader-list>
              </uploader>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="re-dialogForm">
        <span slot="footer" class="dialog-footer">
          <el-button @click="editOne = false">取 消</el-button>
          <el-button type="primary" @click="saveEditResource">保 存</el-button>
        </span>
      </div>
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
      <div class="del-dialog-cnt">是否确定批量删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisibleAll = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteAll">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传资源弹出框 3-5条数据  上下索拉-->
    <el-dialog
      title="上传资源"
      :visible.sync="resourceSaveVisible"
      :close-on-click-modal="false"
      width="70%"
    >
      <el-form ref="form" :model="form" label-width="50px">
        <el-table
          :data="resourceSaveData"
          border
          class="table"
          ref="multipleTable"
          :header-cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" prop="resourceName" label="资源名称" width="160">
            <template slot-scope="{ row }">
              <template v-if="row.edit">
                <el-input
                  v-model="row.fileName"
                  class="edit-input"
                  size="small"
                  @blur="cancelEdit(row)"
                  @mouseout="cancelEdit(row)"
                />
              </template>
              <span v-else @click="onClickEdite(row, $event)" style="user-select: none;"></span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="fileName" label="源文件名称"></el-table-column>
          <el-table-column align="center" prop="size" label="大小" width="80"></el-table-column>
          <el-table-column align="center" prop="useStatus" label="状态" width="80"></el-table-column>
          <el-table-column align="center" prop="thumbnailPath" label="缩略图" width="130"></el-table-column>
          <el-table-column align="center" prop="resourceType" label="类型" width="130"></el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="info"
                size="small"
                icon="el-icon-video-pause"
                @click="handleSuspend(scope.$index, scope.row)"
              >暂停</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="ts(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <!-- 组件文件 测试内容 :on-preview="handlePreview"
      :on-remove="handleRemove"-->
      <div slot="footer" class="dialog-footer">
        <uploader
          ref="uploader"
          :options="uploader.options"
          :auto-start="uploader.autoStart"
          @file-added="onFileAdded"
          @file-progress="onFileProgress"
          class="uploader-resource"
        >
          <uploader-unsupport></uploader-unsupport>

          <el-button size="small" type="primary" class="select-file-btn-wrap">
            <uploader-btn class="select-file-btn">选择文件</uploader-btn>
          </el-button>
          <el-button size="small" type="primary">开始上传</el-button>
          <el-button type="success">保存</el-button>
        </uploader>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过(未定)</div>
      </div>
    </el-dialog>
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
</template>

<script>
//裁剪图片插件
import VueCropper from "vue-cropperjs";
import { log, debuglog } from "util";

export default {
  name: "upload",
  components: { VueCropper },
  data() {
    return {
      tenantId: null, //租户ID
      createUserId: null,
      dfsServer: null, // 图片地址前缀
      recomandIndex: 0, //公共索引
      source: 2, //来源：0AVR工程，1AVR作品，2AVR素材和AR教材
      multipleSelection: [],
      labelDTOList: [],
      level: null, //分类层级
      //设置缩略
      userArr: [],
      fileList: [],
      imgSrc: null,
      cropImg: null,
      uploaderForm: {
        //编辑缩略图表单信息
        labelIds: [], //编辑
        categoryId: [], //资源分类
        cropImg: null,
        resourceId: null,
        resourceName: null,
        thumbnailName: null,
        thumbnailPath: null
      },
      dialogVisible: false,
      defaultSrc: require("../../assets/img/mx.jpg"),
      //end
      formInline: {
        resourceName: null,
        labelDTOListValue: [], //查询
        categoryId: [],
        fileName: null,
        useStatus: null,
        resourcePath: null,
        resourceType: null,
        createTime: null,
        dialogFormVisible: false
      },
      //列表
      tableData: [],
      delVisible: false,
      delVisibleAll: false,
      editOne: false,
      editTwo: false,
      beginDate: null,
      endDate: null,
      resourceSaveVisible: false,
      resourceIdListAll: "",
      //分类
      //指定选项的值为选项对象的某个属性值 listCategoryResponseList
      ReoptionProps: {
        value: "categoryId",
        label: "name",
        children: "listCategoryResponseList"
      },
      reOptionsCategory: [],
      //贴图
      select_cate: "",
      select_word: "",
      del_list: [],
      resourceId: 0,
      numType: 0,
      deleteIndex: null, //删除索引
      //分页
      pagination: {
        totalRows: 0, //总条数
        pageSize: 5, //每页显示条数
        pageSizes: [5, 10, 50, 100], //设置多少条一页
        pageNumber: 1, //当前页数
        layout: "total, sizes, prev, pager, next, jumper"
      },
      //资源类型
      options: {
        target: "http://10.1.137.123:8300/dfs/upload/v1/uploadFile",
        testChunks: false,
        autoStart: false,
        allowDuplicateUploads: true,
        singleFile: true
      },
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
      resourceType: "",
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
      useStatus: "",
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      id: -1,
      uploader: {
        options: {
          target: "//localhost:8080/upload",
          testChunks: false
        },
        autoStart: false,
        attrs: {
          accept: "image/*"
        },
        fileList: []
      }
    };
  },
  beforeRouteEnter: (to, from, next) => {
    //组件内导航守卫，进入前
    //组件还没被实例化 不能用this
    next(vm => {
      //组件被实例化
      if (from.fullPath == "/resourceUpload") {
      }
      vm.listResource(); //调用此方法
    });
  },
  created() {
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
    if (localStorage.getItem("dfsServer")) {
      this.dfsServer = localStorage.getItem("dfsServer");
    } else {
      this.dfsServer = this.$store.state.dfsServer;
    }
    this.options.target =
      this.$store.state.baseUrl + this.$store.state.uploadFileUrl;
  },
  mounted() {
    this.cropImg = this.defaultSrc;
    this.listResource(); //调用获取资源列表
    this.listLabelGroupAndLabel(); //内容标签
    this.listCategory(); //分类列表
    var loader = this.$refs.uploader.uploader;
  },
  watch: {
    $route: "listResource",
    $route: "listLabelGroupAndLabel",
    $route: "listCategory" // 当路由改变再次执行 bookSave
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    },
    // 要上传的数据
    resourceSaveData() {
      var data = [];
      for (let file of this.uploader.fileList) {
        data.push({
          id: file.uniqueIdentifier,
          resourceName: file.name,
          fileName: file.name,
          resourceType: file.fileType,
          size: file.size,
          useStatus: file.progress,
          thumbnailPath: null,
          edit: false, // 是否正在编辑
          paused: file.paused, // 是否暂停
          error: file.error,
          // source:this.source,
          allError: file.allError
        });
      }
      return data;
    }
  },
  methods: {
    //格式化Sat Oct 14 2017 00:00:00 GMT+0800 (中国标准时间) 为正常时间
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
    // 分页导航
    currentChange(val) {
      this.pagination.pageNumber = val;
      this.listResource();
    },
    //设置分页大小
    sizeChange(val) {
      this.pagination.pageSize = val;
      this.listResource();
    },
    // 资源列表
    listResource() {
      var that = this;
      var categoryId = null;
      that.level = null;
      //分类
      if (that.formInline.categoryId.splice != null) {
        if (that.formInline.categoryId.length > 1) {
          categoryId =
            that.formInline.categoryId[that.formInline.categoryId.length - 1];
          //分类下拉,获取对应level(后台需要传递categoryId,level))
          if (that.level == null && that.reOptionsCategory != null) {
            for (var i = 0; i < that.reOptionsCategory.length; i++) {
              if (that.reOptionsCategory[i].categoryId == categoryId) {
                that.level = that.reOptionsCategory[i].level;
                break;
              }
              if (
                that.level == null &&
                that.reOptionsCategory[i].listCategoryResponseList != null
              ) {
                for (
                  var j = 0;
                  j < that.reOptionsCategory[i].listCategoryResponseList.length;
                  j++
                ) {
                  if (
                    that.reOptionsCategory[i].listCategoryResponseList[j]
                      .categoryId == categoryId
                  ) {
                    that.level =
                      that.reOptionsCategory[i].listCategoryResponseList[
                        j
                      ].level;
                    break;
                  }
                  if (
                    that.level == null &&
                    that.reOptionsCategory[i].listCategoryResponseList[j]
                      .listCategoryResponseList != null
                  ) {
                    for (
                      var k = 0;
                      k <
                      that.reOptionsCategory[i].listCategoryResponseList[j]
                        .listCategoryResponseList.length;
                      k++
                    ) {
                      if (
                        that.reOptionsCategory[i].listCategoryResponseList[j]
                          .listCategoryResponseList[k].categoryId == categoryId
                      ) {
                        that.level =
                          that.reOptionsCategory[i].listCategoryResponseList[
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
          for (let i = 0; i < that.reOptionsCategory.length; i++) {
            if (that.reOptionsCategory[i].categoryId == categoryId) {
              that.level = that.reOptionsCategory[0].level;
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
        url: that.$store.state.baseUrl + "/resource/resource/listResource",
        data: {
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.pageNumber,
          tenantId: this.tenantId,
          labelIds: this.formInline.labelDTOListValue,
          createUserId: that.createUserId,
          categoryId: categoryId,
          level: that.level,
          resourceName: this.formInline.resourceName,
          beginDate: this.beginDate,
          endDate: this.endDate,
          resourceType: this.formInline.resourceType,
          useStatus: this.formInline.useStatus
          // source:this.source
        }
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            var tableData = result.data.data.content;
            that.pagination.totalRows = Number(result.data.data.total);
            for (var i = 0; i < tableData.length; i++) {
              tableData[i].number = i + 1;
            }
            that.tableData = tableData;
            // console.log(JSON.stringify(that.tableData));
          } else if (
            result.data.returnCode === 50001 ||
            result.data.returnCode === 500
          ) {
            alert("服务端异常, 请联系开发人员！");
          } else {
            alert("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //资源分类
    listCategory() {
      var that = this;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/architecture/category/listCategory",
        data: {
          //类型：0教材分类列表  1资源分类列表
          type: 1,
          tenantId: that.tenantId
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.reOptionsCategory = result.data.data;
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
    //资源标签(标签组和标签列表)
    listLabelGroupAndLabel() {
      var that = this;
      this.$axios({
        method: "post",
        url:
          that.$store.state.baseUrl +
          "/architecture/label/listLabelGroupAndLabel",
        data: {
          //用于：0教材列表，1:资源列表，2用户列表(单选)
          useOn: 1,
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
    //上传资源
    onSubmitSave(index, row) {
      this.$router.push("/resourceUpload");
    },
    //删除资源
    handleDelete() {
      var that = this;
      var index = that.recomandIndex;
      var resourceIdList = that.tableData[index].resourceId;
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/resource/resource/deleteResource",
        data: {
          resourceIdList: [resourceIdList]
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.deleteRow();
        } else if (result.data.returnCode === 50001) {
          console.log(result.data.returnCode);
          that.$message.error("服务端异常, 请联系开发人员！");
        } else {
          console.log(result.data.returnCode);
          that.$message.error("获取数据失败");
        }
      });
    },
    //批量删除资源
    handleDeleteAll() {
      var that = this;
      var resourceIdListAll = that.resourceIdListAll.split(",");
      this.$axios({
        method: "post",
        url: that.$store.state.baseUrl + "/resource/resource/deleteResource",
        data: {
          resourceIdList: resourceIdListAll //[1,2,3]
        }
      }).then(result => {
        if (result.data.returnMsg === "请求成功") {
          that.deleteRowAll();
        } else if (result.data.returnCode === 50001) {
          console.log(result.data.returnCode);
          that.$message.error("服务端异常, 请联系开发人员！");
        } else {
          console.log(result.data.returnCode);
          that.$message.error("获取数据失败");
        }
      });
    },
    // 编辑资源
    handleEditOne(index, row) {
      var that = this;
      that.uploaderForm.cropImg = null;
      that.uploaderForm.labelIds = null;
      that.uploaderForm.categoryId = null;
      var resourceId = that.tableData[index].resourceId;
      var categoryId = that.tableData[index].categoryId;
      var labelIds = that.tableData[index].labelIds;
      this.editOne = true;
      if (!!categoryId) {
        that.uploaderForm.categoryId = categoryId.split();
      }
      if (!!labelIds) {
        that.uploaderForm.labelIds = labelIds.split(",");
      }
      that.uploaderForm.resourceId = row.resourceId; //资源名称
      that.uploaderForm.resourceName = row.resourceName; //资源名称
      var thumbnailPath = row.thumbnailPath; //缩略图路径
      that.uploaderForm.thumbnailPath = thumbnailPath; //img
      if (!!thumbnailPath) {
        that.uploaderForm.cropImg =
          localStorage.getItem("dfsServer") + thumbnailPath; //缩略图地址
      }
    },
    // 保存编辑
    saveEditResource() {
      var that = this;
      if (that.uploaderForm.categoryId != null) {
        if (that.uploaderForm.categoryId.length > 20) {
          that.$message.error(
            "已经添加" + that.uploaderForm.categoryId.length + "个标签!"
          );
          return;
        }
        //资源无需校验,取最后一位
        if (that.uploaderForm.categoryId.length > 1) {
          that.uploaderForm.categoryId =
            that.uploaderForm.categoryId[
              that.uploaderForm.categoryId.length - 1
            ];
        } else if (that.uploaderForm.categoryId.length === 1) {
          that.uploaderForm.categoryId = that.uploaderForm.categoryId[0];
        }
      }
      //分类转字符串
      if (that.uploaderForm.labelIds != null) {
        that.uploaderForm.labelIds = that.uploaderForm.labelIds.toString();
      }
      var uploaderForm = that.uploaderForm;
      var url = that.$store.state.baseUrl + "/resource/resource/updateResource";
      this.$axios({
        method: "post",
        url: url,
        data: that.uploaderForm
      })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            that.$message.success("修改成功");
            that.editOne = false;
            that.listResource();
          } else if (result.data.returnCode === 50001) {
            console.log(result.data.returnCode);
            that.$message.error("服务端异常, 请联系开发人员！");
          } else {
            console.log(result.data.returnCode);
            that.$message.error("获取数据失败");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //批量删除
    delAll() {
      var that = this;
      that.resourceIdListAll = "";
      const length = this.multipleSelection.length;
      if (!length) {
        this.$message.error("请勾选数据");
        return;
      }
      for (let i = 0; i < length; i++) {
        that.resourceIdListAll += this.multipleSelection[i].resourceId + ",";
      }
      if (that.resourceIdListAll.length > 0) {
        that.resourceIdListAll = that.resourceIdListAll.substr(
          0,
          that.resourceIdListAll.length - 1
        );
      }
      this.delVisibleAll = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    submitted(rootFile) {
      //此方法不能删除
      //上传缩略图
    },
    onFileProgress(rootFile) {
      //此方法不能删除
      //上传缩略图
    },
    onFileSuccess(rootFile, file, message, chunk) {
      //上传成功调用
      var that = this;
      that.uploaderForm.thumbnailName = rootFile.name;
      var message = JSON.parse(message);
      that.uploaderForm.thumbnailPath = message.data;
      that.uploaderForm.cropImg =
        localStorage.getItem("dfsServer") + message.data;
    },

    // 保存编辑((未完))
    saveEdit() {
      this.editOne = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      if (this.tableData[this.idx].id === this.id) {
        this.$set(this.tableData, this.idx, this.form);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.id) {
            this.$set(this.tableData, i, this.form);
            return;
          }
        }
      }
    },
    //确定删除
    deleteRow() {
      this.$message.success("删除成功");
      this.delVisible = false;
      this.listResource();
    },
    //批量确定删除(可以提示删除了多少数据)
    deleteRowAll() {
      this.$message.success("批量删除成功");
      this.multipleSelection = [];
      this.delVisibleAll = false;
      this.listResource();
    },
    //删除-索引传参
    doRecomandDel(index, row) {
      this.recomandIndex = index;
      this.delVisible = true;
    },
    // 文件选择上传 ______tyh
    onFileAdded() {
      if (this.$refs.uploader) {
        this.uploader.fileList = this.$refs.uploader.uploader.fileList;
      }
    },

    // 双击可编辑
    onClickEdite(row, evt) {
      var target = evt.target.parentNode;
      row.edit = true;
      this.$nextTick(function() {
        target.firstElementChild.firstElementChild.focus();
      });
    },
    // 失焦保存编辑内容
    cancelEdit(row) {
      row.edit = false;
      row.originTitle = row.title;
    },
    handleSuspend(index, row) {
      var target = this.uploader.fileList[index];
      target.paused = !row.paused;
      console.log(target);
      this.uploader.fileList.splice(index, 1, target);
      console.log(
        this.uploader.fileList[index],
        this.$refs.uploader.uploader.fileList[index]
      );
    }
  }
};
</script>

<style scoped lang="scss">
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

.pre-img {
  width: 217px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
  margin: -30px 0px 23px 0px;
}
.crop-demo-btn {
  position: relative;
  width: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.uploader-resource .select-file-btn-wrap {
  padding: 0;
}

.uploader-resource .select-file-btn {
  display: block;
  padding: 9px 15px;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  border: 0 none;
  cursor: pointer;
  border-radius: 2px;
  background: none;
  outline: none;
}
.uploader-example3 {
  width: 100px;
  background: rgba(255, 255, 255, 0);
  border: none !important;
  font-size: 12px;
  text-align: center;
  /* transform: translateX(-10px);
  transform: translateY(-20px); */
  overflow: hidden;
}

.uploader-drop {
  position: relative;
  overflow: hidden;
  border: 0px solid #ccc !important;
  background-color: transparent;
  padding: 0 !important;
  transition: all 0.8s;
  text-align: center;
  transform: translateX(-10px);
}

.uploader-item {
  width: 113px;
  height: 21px;
  line-height: 23px;
  background: #409eff;
  color: #fff;
  border: #409eff;
  -webkit-transform: translateX(-10px);
  transform: translateX(-10px);
}
.uploader-item:hover {
  background: #409eff;
  color: #fff;
  border: #409eff;
}
.categoryItem {
  margin-bottom: 80px;
}
.el-re-selectLabel {
  color: rgb(137, 144, 146);
  font-size: 12px;
}
.re-el-input {
  margin: 0px 0px 35px 0px;
}
.re-lationLabel {
  margin: 15px 0px 0px 0px;
}
.re-label-dialog-col {
  width: 92%;
}
.re-label-dialog-select {
  width: 92%;
}
.re-category-dialog-select {
  width: 92%;
}
.re-dialogForm {
  margin: 0px 0px 0px 480px;
}
</style>
