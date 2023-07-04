<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>小区物业人员管理</span>
      </div>
      <!-- 查询 -->
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="65px"
      >
        <el-form-item label="用户名">
          <el-input v-model="formInline.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tian"> 添加物业人员 </el-button>
        </el-form-item>
      </el-form>

      <!-- 住户列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="170">
        </el-table-column>
        <el-table-column label="头像" width="200">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="220">
        </el-table-column>
        <el-table-column label="是否在职" width="240">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.zt"
              active-text="是"
              inactive-text="否"
              @change="changeSwitch(scope.$index)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
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
    <!-- 弹窗 -->
    <el-dialog
      :title="form.id ? '修改物业人员' : '添加物业人员'"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form :model="form" :inline="false">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 上传头像 -->
        <el-form-item label="上传头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/common/upload/file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPersonnel">确 定</el-button>
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
      // 物业人员列表
      tableData: [],
      // 弹窗打开和关闭
      dialogFormVisible: false,
      // 弹窗宽度
      formLabelWidth: "120px",
      // 弹窗收集数据
      form: {
        userName: "",
        name: "",
        password: "",
        phone: "",
        avatar: "",
      },
    };
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    // 获取物业人员数据
    async getWorker(data) {
      const res = await this.$API.member.getWorker(data);
      if (res.code == 1) {
        res.data.records.forEach((item) => {
          item.zt = item.zt ? true : false;
        });
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
        name: this.formInline.name,
      };
      this.getWorker(data);
    },
    // 确认添加人员
    async addPersonnel() {
      const res = await this.$API.member.addWorker(this.form);
      // if (res.code == 1) {
      this.$message({
        message: "成功",
        type: "success",
      });
      this.handleCurrentChange();
      // }
      this.dialogFormVisible = false;
    },
    // 点击添加按钮
    tian() {
      this.dialogFormVisible = true;
      this.form = {
        userName: "",
        name: "",
        password: "",
        phone: "",
        avatar: "",
      };
    },
    // 编辑按钮
    handleEdit(row) {
      this.dialogFormVisible = true;
      const { id, userName, password, avatar, name, phone } = row;
      this.form = { id, userName, password, avatar, name, phone };
    },
    // 删除按钮
    async handleDelete(row) {
      const res = await this.$API.member.deleteWorker(row.id);
      if (res.code == 1) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleCurrentChange();
      }
    },
    // 切换
    async changeSwitch(i) {
      const { id, zt } = this.tableData[i];
      let qq = zt ? 1 : 0;
      const res = await this.$API.member.addWorker({ id, zt: qq });
    },
    // 每页显示数量改变会被调用
    handleSizeChange(val) {
      this.paging.size = val;
      const data = { current: this.paging.page, size: val };
      this.getWorker(data);
    },
    // 页码发生改变是被调用
    handleCurrentChange(val = 1) {
      this.paging.page = val;
      const data = { current: val, size: this.paging.size };
      this.getWorker(data);
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data;
    },
    // 上传验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

.avatar-uploader .el-upload {
  border: 1px dashed #242323;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #242323;
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>

