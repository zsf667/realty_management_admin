<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px">小区简介</span>
    </div>

    <el-form ref="form" :model="form" label-width="120px" inline>
      <div>
        <el-form-item label="小区名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="小区负责人">
          <el-input v-model="form.person"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="建成日期">
          <el-input v-model="form.date"></el-input>
        </el-form-item>

        <el-form-item label="楼宇数量">
          <el-input v-model="form.buildingsNumber"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="小区地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="建筑面积(亩)">
          <el-input v-model="form.builtUpArea"></el-input>
        </el-form-item>
        <el-form-item label="绿化面积(亩)">
          <el-input v-model="form.afforestedArea"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="道路面积(亩)">
          <el-input v-model="form.roadArea"></el-input>
        </el-form-item>
        <el-form-item label="停车场面积(亩)">
          <el-input v-model="form.parkingArea"></el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item label="小区简介">
          <el-input style="width: 500px" type="textarea" v-model="form.text"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="uptInfo" style="margin: 0 0 0 120px">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "information",
  data() {
    return {
      // 小区信息
      form: {
        // id: "",
        // // 小区名称
        // name: "",
        // // 小区负责人
        // person: "",
        // // 建成日期
        // date: "",
        // // 楼宇数量
        // buildingsNumber: "",
        // // 小区地址
        // address: "",
        // // 联系电话
        // phone: "",
        // // 建筑面积
        // builtUpArea: "",
        // // 绿化面积
        // afforestedArea: "",
        // // 道路面积
        // roadArea: "",
        // // 停车场面积
        // parkingArea: "",
        // // 小区简介
        // text: "",
      },
    };
  },
  mounted() {
    // 页面加载调用一次
    this.getInformation();
  },
  methods: {
    // 获取小区信息
    async getInformation() {
      const res = await this.$API.community.getInformation();
      if (res.code == 1) {
        this.form = res.data[0];
      } else {
        return Promise.reject(new Error(res.msg));
      }
    },
    // 修改信息
    async uptInfo() {
      const res = await this.$API.community.updateInformation(this.form);
      if (res.code !== 1) return Promise.reject(new Error(res.msg));
      this.$message({
        type: "success",
        message: "修改成功"
      })
    },
    // 重置
    reset() {
      this.getInformation();
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 15px;
  padding: 15px;
}

.el-form-item {
  margin: 15px 0;
}

.el-input {
  width: 300px;
}
</style>
