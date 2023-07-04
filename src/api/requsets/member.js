
import request from "@/utils/request";


export default {

  // 获取住户的信息
  getHouseholdList: (data) => request({ url: '/userInfo/list', method: "get", params: data }),



  // 获取工作人员的信息
  getWorker: (data) => request({ url: "/admin/list", method: "get", params: data }),

  // 修改工作人员的信息
  updateWorker: (data) => request({ url: "/admin", method: "put", data }),

  // 添加工作人员的信息
  addWorker: (data) => {
    if (data.id) {
      request({ url: "/admin", method: "put", data })
    } else {
      request({ url: "/admin", method: "post", data })
    }
  },


  // 删除工作人员的信息
  deleteWorker: (id) => request({ url: `/admin/${id}`, method: "delete", })
}
