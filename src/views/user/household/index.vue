<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>小区住户信息管理</span>
      </div>
      <!-- 查询 -->
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="60px"
      >
        <el-form-item label="姓名">
          <el-input v-model="formInline.userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 住户列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="180">
        </el-table-column>
        <el-table-column prop="address" label="所在楼宇" width="180">
        </el-table-column>
        <el-table-column prop="unitNum" label="所在单元" width="180">
        </el-table-column>
        <el-table-column prop="roomNum" label="房间号"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paging.page"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="3"
          layout="prev, pager, next, jumper, ->, sizes,total"
          :total="paging.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        name: "",
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
      // 住户信息
      tableData: [],
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    // 获取住户信息
    async getHouseholdList(data) {
      const res = await this.$API.member.getHouseholdList(data);
      if (res.code == 1) {
        // 总条数
        this.paging.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    // 查询
    onSubmit() {
      const data = {
        current: this.paging.page,
        size: this.paging.size,
        name: this.formInline.userName,
      };
      this.getHouseholdList(data);
    },
    // 删除
    handleDelete() {},
    // 每页显示数量改变会被调用
    handleSizeChange(val) {
      const data = { current: this.paging.page, size: val };
      this.getHouseholdList(data);
    },
    // 页码发生改变是被调用
    handleCurrentChange(val = 1) {
      const data = { current: val, size: this.paging.size };
      this.getHouseholdList(data);
    },
  },
};
</script>

<style>
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

