import request from "@/utils/request";

// 楼宇管理的请求
export default {

  // 获取楼宇的数据列表
  getBuildingList(data) {
    return request({
      url: "/building/list",
      method: "get",
      params: data
    })
  },

  // 添加楼宇 ||  修改楼宇
  addBuilding(data) {
    if (data.id) {
      return request({
        url: "/building",
        method: "put",
        data
      })
    } else {
      return request({
        url: "/building",
        method: "post",
        data
      })
    }
  },

  // 删除楼宇
  removeBuilding(id) {
    return request.delete(`/building/${id}`)
  }

}
