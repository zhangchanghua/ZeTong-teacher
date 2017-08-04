// pages/teacher/leave/leave.js
Page({
  data:{
    today:'',
    type: 0,
    reason: '',
    headImg:'',
    name:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id);
    var page = this;
    wx.request({
      url: 'https://zetongteacher.zetongedu.com/teachr/teacher/getLeaveById',
      data: {id: options.id},
      method: 'POST',
      header: {'content-type':'application/json'},
      success: function(res){
        console.log(res.data)
        var ltime = res.data.ltime;ltime = ltime.substring(ltime.length-2);
        //console.log(ltime)
        page.setData({ltime:ltime,today:res.data.today,type:res.data.type,reason:res.data.reasons,headImg:res.data.headimg,name:res.data.name,dateData:res.data.dateData})
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})