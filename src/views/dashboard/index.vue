<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <img src="../../assets/50.jpg" alt="" class="dashboard-img" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 18px 65px;
    width: 100%;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-img {
    width: 90%;
  }
}
</style>
