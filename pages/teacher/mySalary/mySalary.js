// pages/teacher/mySalary/mySalary.js
/*var salaryData = [
  {"month":"2016年10月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年9月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年8月","averageMark":"90","salary":"4500.00"},
  {"month":"2016年7月","averageMark":"90","salary":"4500.00"}
]*/
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
      wx.request({
        url: 'https://zetongteacher.zetongedu.com/teachr/teacher/getSalaryByTeacher/teacherId/' + tid,
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success: function (res) {
          //console.log(res.data);
          if(res.data.length != 0){
            page.setData({ salaryData: res.data,loadingHidden:true, empty:false})
          }else{
            page.setData({ salaryData: res.data,loadingHidden:true, empty:true})

          }
          
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })

    }, 2000)

  }
})