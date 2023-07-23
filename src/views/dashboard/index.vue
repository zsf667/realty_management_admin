<!-- <template>
  <div class="dashboard-container">
    <img src="../../assets/50.jpg" alt="" class="dashboard-img" />
  </div>
</template> -->
<template>
  <el-card class="card">
    <div class="info">小区信息</div>
    <div class="kuan">
      <div class="neirong" v-for="(item, index) in shuju" :key="index">
        <img :src="item.imgUrl" width="40" alt="..." />
        <div class="right">
          <div class="xia">{{ item.quantity }}</div>
          <div class="shang">{{ item.title }}</div>
        </div>
      </div>
      <div class="nrxia">
        <img :src="shuju[0].imgUrl" width="40" alt="..." />
        <div class="right">
          <div class="xia">{{ shuju[0].quantity }}</div>
          <div class="shang">{{ shuju[0].title }}</div>
        </div>
      </div>
      <div class="nrxia">
        <img :src="shuju[0].imgUrl" width="40" alt="..." />
        <div class="right">
          <div class="xia">{{ shuju[0].quantity }}</div>
          <div class="shang">{{ shuju[0].title }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      shuju: [
        {
          imgUrl: require("../../assets/用户.jpg"),
          title: "楼宇",
          quantity: "759",
        },
        {
          imgUrl: require("../../assets/电影票.jpg"),
          title: "房间",
          quantity: "26,845",
        },
        {
          imgUrl: require("../../assets/钱袋.jpg"),
          title: "车位",
          quantity: "1,234",
        },
        {
          imgUrl: require("../../assets/设备号管理.jpg"),
          title: "小区面积",
          quantity: "20",
        },
      ],
      
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
  width: 70%;
  height: calc(400px - 60px);

  .info {
    font-weight: bold;
    font-size: 20px;
    margin: 0 0 15px 0;
  }

  .kuan {
    display: flex;
    // justify-content: space-evenly;
    flex-wrap: wrap; //让盒子向下换行

    .neirong,.nrxia{
      margin: 40px 0;
    }

    .neirong {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 25%; //设置宽度，使盒子换行
      border-bottom: 1px #ccc solid;

      .right {
        font-size: 16px;

        .shang,
        .xia {
          text-align: center;
          margin: 10px 0;
        }

        .xia {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }

    .nrxia {
      width: 50%;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
