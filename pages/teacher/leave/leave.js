// pages/teacher/leave/leave.js
var Api = require('../../../utils/api.js');
Page({
  data: {
    today: '',
    type: 0,
    reason: '',
    headImg: '',
    name: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id);
    var page = this;
    var url = Api.Url.teacher_getLeaveById
    var params = {
      id: options.id
    }
    Api.request(url, params, function (data) {
      var ltime = data.ltime; ltime = ltime.substring(ltime.length - 2);
      //console.log(ltime)
      page.setData({
        ltime: ltime,
        today: data.today,
        type: data.type,
        reason: data.reasons,
        headImg: data.headimg,
        name: data.name,
        dateData: data.dateData
      })
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})