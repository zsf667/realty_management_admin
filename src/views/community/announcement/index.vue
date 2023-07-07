<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>小区物业公告管理</span>
      </div>
      <!-- 查询 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="formInline.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tanc"> 添加物业公告 </el-button>
        </el-form-item>
      </el-form>

      <!-- 公告列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="公告标题" >
        </el-table-column>
        <el-table-column prop="text" label="公告内容" >
        </el-table-column>
        <el-table-column prop="updateDate" label="发布时间"  align="center">
        </el-table-column>
        <el-table-column prop="personnel.name" label="创建人" >
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="{ row }">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paging.page"
          :page-sizes="[3, 5, 10, 20]" :page-size="3" layout="prev, pager, next, jumper, ->, sizes,total"
          :total="paging.total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog :title="form.title ? '编辑物业公告' : '添加物业公告'" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :inline="false">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input style="width: 300px" type="textarea" autosize placeholder="请输入内容" v-model="form.text">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索框
      formInline: {
        title: "",
      },
      // 分页
      paging: {
        // 总条数
        total: 0,
        // 当前页面显示条数
        size: 3,
        // 页码
        page: 1,
      },
      // 公告列表
      tableData: [
        {
          title: "",
          text: "",
          updateDate: "",
          personnel: {
            name: "",
          },
        },
      ],
      // 弹窗收集数据
      form: {
        title: "",
        text: "",
      },
      // 弹窗打开和关闭
      dialogFormVisible: false,
      // 弹窗宽度
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  computed: {
    Date() {
      return this.tableData.forEach((item) => item.updateDate.split("T")[0]);
    },
  },
  methods: {
    // 获取公告信息
    async getNotice(data) {
      const res = await this.$API.community.getNotice(data);
      if (res.code == 1) {
        res.data.records.forEach((item) => {
          item.updateDate = item.updateDate.split("T")[0];
        });
        this.paging.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    // 标题查询
    onSubmit() {
      const data = {
        current: this.paging.page,
        size: this.paging.size,
        title: this.formInline.title,
      };
      this.getNotice(data);
      this.formInline.title = "";
    },
    // 添加按钮
    tanc() {
      this.form = { title: "", text: "" };
      this.dialogFormVisible = true;
    },
    // 确认按钮添加公告
    async addNotice() {
      this.dialogFormVisible = false;
      const res = await this.$API.community.addNotice(this.form);
      if (res.code == 1) {
        this.handleCurrentChange();
      }
    },
    // 编辑公告
    async handleEdit(row) {
      const { id, title, text } = row;
      // 打开弹窗
      this.dialogFormVisible = true;
      this.form = { id, title, text };
    },
    // 删除公告信息
    async handleDelete(row) {
      const { id } = row;
      const res = await this.$API.community.removeNotice(id);
      if (res.code == 1) {
        const data = { current: this.paging.page, size: this.paging.size };
        this.getNotice(data);
      }
    },
    // 每页显示数量改变会被调用
    handleSizeChange(val) {
      const data = { current: this.paging.page, size: val };
      this.getNotice(data);
    },
    // 页码发生改变是被调用
    handleCurrentChange(val = 1) {
      const data = { current: val, size: this.paging.size };
      this.getNotice(data);
    },
  },
};
</script>

<style scoped>
.clearfix {
  font-size: 20px;
  font-weight: 700;
}

.box-card {
  margin: 15px;
  padding: 15px;
}

.el-input {
  width: 300px;
}

.block {
  margin-top: 25px;
  text-align: center;
}
</style>

