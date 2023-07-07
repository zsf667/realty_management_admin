<template>
  <div>
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">投诉管理</span>
      </div>
      <!-- 搜索 -->
      <el-form ref="form" :model="form" label-width="65px" :inline="true">
        <el-form-item label="投诉人">
          <el-input
            v-model="form.userName"
            placeholder="投诉人"
            @input="searchComplaint"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchComplaint">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="投诉编号">
        </el-table-column>
        <el-table-column prop="userName" label="投诉人">
        </el-table-column>
        <el-table-column prop="createDate" label="投诉时间">
        </el-table-column>
        <el-table-column prop="text" label="投诉原因">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式">
        </el-table-column>
        <el-table-column prop="address" label="用户地址">
        </el-table-column>
        <el-table-column prop="province" label="是否处理">
          <template slot-scope="{ row }">
            <el-button
              @click="details(row)"
              :type="row.isExamine ? 'primary' : 'danger'"
              size="mini"
              plain
              >{{ row.isExamine ? "已处理" : "未处理" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              type="primary"
              style="margin-right: 10px"
              :disabled="scope.row.isExamine"
              >审核</el-button
            >
            <el-popconfirm
              title="你确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
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

    <!-- 审核弹窗 -->
    <el-dialog
      title="投诉申请单审核"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="投诉人">
          {{ repair.userName }}
        </el-descriptions-item>
        <el-descriptions-item label="联系方式">
          {{ repair.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="投诉时间">
          {{ repair.createDate }}
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          {{ repair.address }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="投诉详情">
          <el-input type="textarea" :rows="4" v-model="repair.text" disabled>
          </el-input>
        </el-descriptions-item>

        <el-descriptions-item label="审核内容">
          <el-input
            type="textarea"
            :rows="4"
            v-model="repair.examineData"
            placeholder="请输入内容"
          >
          </el-input>
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 处理弹窗 -->
    <el-dialog
      title="投诉申请单详情"
      :visible.sync="processingPopup"
      width="600px"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="投诉详情">
          <el-input type="textarea" :rows="4" v-model="repair.text" disabled>
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item label="审核内容">
          <el-input
            type="textarea"
            :rows="4"
            v-model="repair.examineData"
            disabled
          >
          </el-input>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "announcement",
  data() {
    return {
      form: {
        userName: "",
      },
      // 开关
      dialogFormVisible: false,
      processingPopup: false,
      // 分页
      paging: {
        // 总条数
        total: 0,
        // 当前页面显示条数
        size: 3,
        // 页码
        page: 1,
      },
      // 投诉的数据列表
      tableData: [],
      // 投诉单的数据
      repair: {},
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    // 获取投诉的数据
    async getComplaint(data) {
      const res = await this.$API.guarantee.getComplaint(data);
      if (res.code == 1) {
        res.data.records.forEach((item) => {
          item.createDate = item.createDate.split("T")[0];
          if (item.isExamine) {
            item.isExamine = true;
          } else {
            item.isExamine = false;
          }
        });
        this.paging.total = res.data.total;
        this.tableData = res.data.records;
      }
    },
    // 搜索投诉
    searchComplaint() {
      // 防止一直发请求
      setTimeout(() => {
        const data = {
          current: this.paging.page,
          size: this.paging.size,
          userName: this.form.userName,
        };
        this.getComplaint(data);
      }, 200);
    },
    // 处理审核
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.repair = row;
    },
    // 点击处理查看详情
    details(row) {
      this.processingPopup = true;
      this.repair = row;
    },
    // 确认审核
    async confirm() {
      this.dialogFormVisible = false;
      const data = { id: this.repair.id, examineData: this.repair.examineData };
      const res = await this.$API.guarantee.updateComplaint(data);
      if (res.code == 1) {
        const data = { current: this.paging.page, size: this.paging.size };
        this.getComplaint(data);
        this.$message({
          type: "success",
          message: `审核成功`,
        });
      }
    },
    // 确认删除投诉
    handleDelete(row) {
      console.log(12);
    },

    // 每页显示数量改变会被调用
    handleSizeChange(val) {
      const data = { current: this.paging.page, size: val };
      this.getComplaint(data);
    },
    // 页码发生改变是被调用
    handleCurrentChange(val = 1) {
      const data = { current: val, size: this.paging.size };
      this.getComplaint(data);
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 15px;
  padding: 15px;
}

.customWidth {
  width: 60%;
}

.block {
  margin-top: 25px;
  text-align: center;
}
</style>
