import request from "@/utils/request";

export default {

  // 获取报修数据的请求
  getWarranty: (data) => request({ url: "/repair/list", method: "get", params: data }),

  // 审核报修
  updateRepair: (data) => request({ url: "/repair", method: "put", data }),



  // 获取投诉数据的请求
  getComplaint: (data) => request({ url: "/complaint/list", method: "get", params: data }),

  // 审核投诉
  updateComplaint: (data) => request({ url: "/complaint", method: "put", data }),
}
