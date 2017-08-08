// pages/teacher/mySalary/mySalary.js
/*var salaryData = [
  {"month":"2016年10月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年9月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年8月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年7月","averageMark":"90","salary":"4500.00"}
]*/
var Api = require('../../../utils/api.js');
var salaryData = [];
Page({
  data: {
    salaryData: salaryData,
    loadingHidden: false,
    empty: false
  },
  onLoad: function () {
    var page = this;
    var tid = wx.getStorageSync('userName');
    setTimeout(function () {
      var url = Api.Url.teacher_getSalaryByTeacher
      var params={
        teacherId: tid
      }
      Api.request(url,params,function(data){
        if (data.length != 0) {
          page.setData({ salaryData: data, loadingHidden: true, empty: false })
        } else {
          page.setData({ salaryData: data, loadingHidden: true, empty: true })
        }
      })   
    }, 2000)

  }
})