<!-- <template>
  <div class="dashboard-container">
    <img src="../../assets/50.jpg" alt="" class="dashboard-img" />
  </div>
</template> -->
<template>
  <el-card class="card">
    <div class="kuan">
      <div :span="6" v-for="(item, index) in shuju" :key="index">
        <div class="neirong">
          <img :src="item.imgUrl" width="50" alt="..." />
          <div class="right">
            <div class="xia">{{ item.quantity }}</div>
            <div class="shang">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<!-- <script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script> -->
<script>
export default {
  name: "",
  data() {
    return {
      shuju: [
        {
          imgUrl: require("../../assets/用户.jpg"),
          title: "用户数量",
          quantity: "759",
        },
        {
          imgUrl: require("../../assets/电影票.jpg"),
          title: "门票销售数量",
          quantity: "26,845",
        },
        {
          imgUrl: require("../../assets/钱袋.jpg"),
          title: "总销售额",
          quantity: "1,234",
        },
        {
          imgUrl: require("../../assets/设备号管理.jpg"),
          title: "设备数量",
          quantity: "20",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 30px;

  .kuan {
    display: flex;
    width: 100%;
    justify-content: space-around;

    .neirong {
      margin: 25px;
      display: flex;
      align-items: center;
      
      .right {
        margin: 5px;
        font-size: 16px;

        .shang, .xia {
          text-align: center;
          margin: 10px 0;
        }
        .xia {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
