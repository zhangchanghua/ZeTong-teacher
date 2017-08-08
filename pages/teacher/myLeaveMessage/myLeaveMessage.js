// pages/teacher/myLeaveMessage/myLeaveMessage.js
var fn = require('../../../utils/publicFn.js');
var Api = require('../../../utils/api.js');
Page({
  data: {
    /*messageData: [
      { isReaded: false, amount: 1, text: "请假消息", imgUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/messages-icon.png" },
      { isReaded: false, amount: 1, text: "请假消息", imgUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/messages-icon.png" },
      { isReaded: true, amount: 1, text: "请假消息", imgUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/messages-icon.png" },

    ]*/
    messageData: []
  },
  toDetail: function (e) {
    //console.log(e.currentTarget.dataset.id);
    fn.na("../../../pages/teacher/leave/leave?id=" + e.currentTarget.dataset.id);
  },
  onLoad: function () {
    var page = this;
    var tid = wx.getStorageSync('userName');
    getMessage(page,tid);
    //setInterval(function () {
    //  getMessage(page,tid)
   // }, 12000)
  }

})
function getMessage(page, tid){
  //console.log(tid)
  var url = Api.Url.teacher_getMessage
  var params={
    teacherId: tid
  }
  Api.request(url,params,function(data){
    page.setData({ messageData: data })
  })
}