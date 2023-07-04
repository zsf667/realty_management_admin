import request from "@/utils/request";

// 小区管理的请求
export default {
  // 获取小区列表数据
  getInformation() {
    return request.get("/information/info");
  },

  // 更新小区信息
  updateInformation(form) {
    return request.put("/information", form)
  },





  // 获取公告信息
  getNotice(data) {
    return request({
      url: "/notice/list",
      method: "get",
      params: data
    })
  },

  // 添加公告信息
  addNotice(data) {
    if (data.id) {
      return request.put("/notice", data)
    } else {
      return request.post("/notice", data)
    }
  },

  // 根据编号删除公告
  removeNotice(id) {
    return request.delete(`/notice/${id}`)
  },
}
