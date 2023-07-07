<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>小区楼宇管理</span>
      </div>
      <!-- 查询那一行 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="75px">
        <el-form-item label="楼宇名称">
          <el-input v-model="formInline.name" placeholder="楼宇名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBuilding">添加楼宇</el-button>
        </el-form-item>
      </el-form>

      <!-- 住户列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="楼宇名称" >
        </el-table-column>
        <el-table-column prop="layers" label="楼宇层数" >
        </el-table-column>
        <el-table-column prop="height" label="楼宇高度 (m)" >
        </el-table-column>
        <el-table-column prop="area" label="楼宇面积 (m²)" >
        </el-table-column>
        <el-table-column prop="date" label="楼宇建成时间" >
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{ row, $index }">
            <el-button type="primary" @click="handleEdit(row)" icon="el-icon-edit" size="mini">编辑</el-button>
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
    <el-dialog :title="form.name ? '修改楼宇' : '添加楼宇'" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :inline="false">
        <el-form-item label="楼宇名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="楼宇层数" :label-width="formLabelWidth">
          <el-input v-model="form.layers"></el-input>
        </el-form-item>
        <el-form-item label="楼宇高度(m)" :label-width="formLabelWidth">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="楼宇面积(m²)" :label-width="formLabelWidth">
          <el-input v-model="form.area"></el-input>
        </el-form-item>
        <el-form-item label="楼宇建成时间" :label-width="formLabelWidth">
          <div>
            <el-date-picker value-format="yyyy-MM-ddTHH:mm:ss" v-model="form.date" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddBuilding()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "building",
  data() {
    return {
      // 搜索框数据
      formInline: {
        name: "",
      },
      // 楼宇列表数据
      tableData: [
        {
          naem: "",
          layers: "",
          height: "",
          area: "",
          date: "",
        },
      ],
      // 弹窗打开和关闭
      dialogFormVisible: false,
      // 弹窗宽度
      formLabelWidth: "120px",
      // 分页
      paging: {
        // 总条数
        total: 0,
        // 当前页面显示条数
        size: 3,
        // 页码
        page: 1,
      },
      // 弹窗收集数据
      form: {
        name: "",
        layers: "",
        height: "",
        area: "",
        date: "",
      },
    };
  },
  mounted() {
    // 页面一加载就发请求
    this.handleCurrentChange();
  },
  methods: {
    // 获取楼宇数据
    async getBuildingList(data) {
      const res = await this.$API.estate.getBuildingList(data);
      if (res.code == 1) {
        res.data.records.forEach((item) => {
          item.date = item.date.replace("T", " ");
        });
        this.paging.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    // 楼宇名称查询
    async onSubmit() {
      // 整合参数
      const data = {
        current: this.paging.page,
        size: this.paging.size,
        name: this.formInline.name,
      };
      this.getBuildingList(data);
    },
    // 添加楼宇按钮
    addBuilding() {
      (this.form = {}), (this.dialogFormVisible = true);
    },
    // 确认添加楼宇
    async confirmAddBuilding() {
      this.form = {
        id: this.form.id,
        name: this.form.name,
        layers: this.form.layers,
        height: this.form.height,
        area: this.form.area,
        date: this.form.date.replace(" ", "T"),
      };
      const res = await this.$API.estate.addBuilding(this.form);
      if (res.code == 1) {
        this.handleCurrentChange();
      }
      // 关闭弹窗
      this.dialogFormVisible = false;
    },
    // 编辑按钮
    async handleEdit(row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    // 删除按钮
    async handleDelete(row) {
      const res = await this.$API.estate.removeBuilding(row.id);
      if (res.code == 1) {
        this.handleCurrentChange();
      }
    },
    // 每页显示数量改变会被调用
    handleSizeChange(val) {
      const data = { current: this.paging.page, size: val };
      this.getBuildingList(data);
    },
    // 页码发生改变是被调用
    handleCurrentChange(val = 1) {
      const data = { current: val, size: this.paging.size };
      this.getBuildingList(data);
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

