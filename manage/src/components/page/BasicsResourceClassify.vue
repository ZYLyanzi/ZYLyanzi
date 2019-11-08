<!-- 资源分类 -->
<template>
  <div class="basic-classfication-wrap">
    <!-- 添加分类弹框 与添加子分类的弹框使用同一个弹框和方法 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>&nbsp;资源分类
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="saveBookClassify">
        <el-button
          data-add-val="parent"
          class="butSaveBookClassify"
          type="primary"
          icon="el-icon-plus"
          @click="addChildClassify"
        >资源分类</el-button>
      </div>
    </div>
    <div class="clear"></div>
    <dragTreeTable
      class="clearfix"
      :data="treeData"
      :onDrag="onTreeDataChange"
      :fixed="true"
      :isdraggable="false"
    ></dragTreeTable>

    <!-- 添加子分类弹框模块 -->
    <el-dialog title="新增子分类" :visible.sync="addChildVisible" :before-close="handleClose">
      <!-- 子分类表单 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="addChildClassifyForm">
        <el-form-item label="分类名称">
          <el-input v-model="addChildClassifyForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddChildClassify">取 消</el-button>
        <el-button type="primary" @click="confirmAddChildClassify">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类弹框模块 -->
    <el-dialog title="编辑分类" :visible.sync="editVisible" :before-close="handleClose">
      <!-- 子分类表单 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="editClassifyForm">
        <el-form-item label="分类名称">
          <el-input v-model="editClassifyForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditClassify">取 消</el-button>
        <el-button type="primary" @click="confirmeditClassify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script  >
import mutations from "vuex";
import dragTreeTable from "../../lib/dragTreeTable.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      treeData: {
        columns: [],
        lists: [],
        custom_field: {
          id: "id",
          order: "sort",
          lists: "listCategoryResponseList", //子设置属性的列表
          parent_id: "parentId"
        }
      },
      classifyItemObj: null, //操作列表要操作的当前行对象
      type: 1, //0为教材分类 1为资源分类
      addChildVisible: false, //子分类弹窗显示判定
      editVisible: false, //子分类弹窗显示判定
      labelPosition: "right",
      addclassifyType: null, //判断是添加分类还是添加子分类
      addChildClassifyForm: {
        //增加分类表单
        name: null
      },
      editClassifyForm: {
        //编辑分类表单
        name: null
      }
    };
  },
  components: {
    dragTreeTable
  },
  computed: mapGetters([
    "listCategoryPath",
    "addCategoryPath",
    "editCategoryPath",
    "deleteCategoryPath"
  ]),
  mounted() {
    // 设置每列的标题
    this.treeData.columns = [
      {
        type: "selection",
        title: "资源分类名称",
        field: "name",
        width: 300,
        align: "center",
        formatter: item => {
          return "<span>" + item.name + "</span>";
        }
      },
      {
        type: "selection",
        title: "包含资源",
        field: "name",
        width: 300,
        align: "center",
        formatter: item => {
          return "<span>" + item.number + "</span>";
        }
      },
      {
        type: "selection",
        title: "更新时间",
        field: "name",
        width: 350,
        align: "center",
        formatter: item => {
          return "<span>" + item.updateTime + "</span>";
        }
      },
      {
        title: "操作",
        type: "action",
        width: 350,
        align: "center",
        actions: [
          {
            text: "添加子分类",
            onclick: this.addChildClassify,
            formatter: item => {
              if (item.level < 2) {
                return `<i >添加子分类 </i>`;
              } else {
                return `<i style='opacity:0;cursor:default;'>添加子分类</i>`;
              }
            }
          },
          {
            text: "编辑",
            onclick: this.editClassify,
            formatter: item => {
              return "<i style='margin-left:15px;'>编辑</i>";
            }
          },
          {
            text: "删除",
            onclick: this.onDel,
            formatter: item => {
              return "<i style='margin-left:15px;'>删除 </i>";
            }
          }
        ]
      }
    ];

    this.getListCategory(); //调用获取分类列表
  },
  methods: {
    handleClose(done) {
      //弹窗关闭
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型,top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
      this.treeData.lists = list;
    },
    //打开添加子分类对话框
    addChildClassify(item) {
      var that = this;
      if (item.level >= 2) {
        return false;
      }
      that.addChildVisible = true;

      if (item.currentTarget) {
        //添加分类弹框
        that.addclassifyType = "parent";
      } else {
        //添加分类弹框
        that.addclassifyType = "chlid";
        that.classifyItemObj = item; //储存编辑分类列表的一行数据；
      }
    },

    //打开编辑分类对话框
    editClassify(item) {
      var that = this;
      that.editVisible = true;
      var addChildLevel = item.level;
      that.classifyItemObj = item; //储存编辑分类列表的一行数据；
      that.editClassifyForm.name = item.name;
    },
    //确认添加分类接口
    confirmAddChildClassify() {
      var that = this;
      var name = that.addChildClassifyForm.name;
      var createUserId = localStorage.getItem("userId"); //用户id
      if (that.addclassifyType == "parent") {
        //添加当前分类的功能
        var level = 0;
        var parentId = 1;
      } else {
        //添加子分类的功能
        var classifyItemObj = that.classifyItemObj; //当前行对象
        var level = classifyItemObj.level + 1; //当前的level要加1;
        var parentId = classifyItemObj.categoryId; //parentId相当于上一级的categoryId;
      }
      var tenantId = localStorage.getItem("tenantId"); //tenantId1
      var url = that.addCategoryPath; //添加分类路径
      that
        .$axios({
          method: "post",
          url: url,
          data: {
            createUserId: createUserId,
            tenantId: tenantId,
            name: name,
            level: level,
            parentId: parentId,
            type: that.type
          }
        })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.$message.success("添加分类成功!");
            that.addChildVisible = false;
            that.getListCategory(); //调用分类列表
          } else if (result.data.returnCode === 50001) {
            alert("异常" + result.data.returnCode);
          }
        })
        .catch(result => {});
    },

    //确认编辑分类
    confirmeditClassify() {
      var that = this;
      var name = that.editClassifyForm.name;
      var updateUserId = localStorage.getItem("userId"); //用户id
      var classifyItemObj = that.classifyItemObj; //当前行对象
      var categoryId = classifyItemObj.categoryId; //parentId相当于上一级的categoryId;
      var tenantId = localStorage.getItem("tenantId"); //tenantId1
      var url = that.editCategoryPath; //编辑分类路径
      that
        .$axios({
          method: "post",
          url: url,
          data: {
            updateUserId: updateUserId,
            name: name,
            categoryId: categoryId
          }
        })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.$message.success("编辑成功!");
            that.editVisible = false;
            that.getListCategory(); //调用分类列表
          } else if (result.data.returnCode === 50001) {
            alert("异常" + result.data.returnCode);
          }
        })
        .catch(result => {});
    },
    //取消添加子分类
    cancelAddChildClassify() {
      var that = this;
      that.addChildVisible = false;
    },
    //取消添加子分类
    cancelEditClassify() {
      var that = this;
      that.editVisible = false;
    },

    // 删除分类
    onDel(item) {
      var that = this;
      if (item.number > 0) {
        return this.$message({
          message: "资源已被引用,无法删除!",
          type: "warning"
        });
      }
      var updateUserId = localStorage.getItem("userId"); //用户id
      var categoryId = item.categoryId; //parentId相当于上一级的categoryId;
      var url = that.deleteCategoryPath; //删除分类路径
      that
        .$axios({
          method: "delete",
          url: url,
          params: {
            categoryId: categoryId
          }
        })
        .then(result => {
          if (result.data.returnMsg === "请求成功") {
            this.$message.success("删除成功!");
            that.getListCategory(); //调用分类列表
          } else if (result.data.returnCode === 50001) {
            alert("异常" + result.data.returnCode);
          }
        })
        .catch(result => {});
    },

    //获取分类列表接口
    getListCategory() {
      var that = this;
      var url = that.listCategoryPath;
      var tenantId = localStorage.getItem("tenantId");
      // 提交接口
      this.$axios({
        method: "post",
        url: url,
        data: {
          tenantId: tenantId,
          type: that.type
        }
      }).then(result => {
        debugger
        console.log(tenantId);
        if (result.data.returnMsg === "请求成功") {
          that.treeData.lists = result.data.data; //赋值给treeData进行渲染属性表格数据
        } else if (result.data.returnCode === 50001) {
          alert("异常" + result.data.returnCode);
        } else {
        }
      });
    }
  }
};
</script>

<style >
.saveBookClassify {
  float: right;
  margin-top: -23px;
}
.butSaveBookClassify {
  padding: 9px 28px;
}
.add-classify-btn {
  float: right;
}
.clearfix:after {
  content: ".";
  clear: both;
  height: 0;
  display: block;
}
.clearfix {
  zoom: 1;
}
.clear {
  clear: both;
}
</style>