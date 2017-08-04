// pages/teacher/coachProject/coachProject.js
var subject = [
  { id: 0, text: "钢琴", isSelected: false },
  { id: 1, text: "绘画", isSelected: false },
  { id: 2, text: "舞蹈", isSelected: false },
  { id: 3, text: "语文", isSelected: false },
  { id: 4, text: "数学", isSelected: false }
]
Page({
  data: {
    subjects: subject //subject
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if(options.courses){
      subject = JSON.parse(options.courses);
      this.setData({'subjects':subject}) 
    }
  },
  choseclass: function (e) {
    var inx = e.currentTarget.dataset.num;
    var ids = e.currentTarget.dataset.id;
    var chos = subject[inx].isSelected;
    if (chos) {
      subject[inx].isSelected = false;
    } else {
      subject[inx].isSelected = true;
    }

    this.setData({
      subjects: subject
    })
  },
  saveClass: function () {
    var page = this;
    var tmp = [];
    for (var i = 0; i < page.data.subjects.length; i++) {
      if (page.data.subjects[i].isSelected == true) {
        tmp.push(page.data.subjects[i].text);
      }
    }
    console.log(tmp);
    wx.request({
      url: 'https://zetongteacher.zetongedu.com/teachr/teacher/saveClass',
      data: {
        teacherId: wx.getStorageSync('userName'),
        class: tmp
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'loading'
          });
        }else{
          wx.showToast({
            title: res.data.errmsg,
            icon: 'loading'
          });
          return ;
        }
        setTimeout(function () {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];//当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          for(var i=0;i<subject.length;i++){
            for(var j =0;j<tmp.length;j++){
              if(subject[i].text==tmp[j]){
                subject[i].isSelected=true;
              }
            }
          }
          prevPage.setData({
            subjects: subject
          })
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
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