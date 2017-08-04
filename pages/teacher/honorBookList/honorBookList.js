// pages/teacher/honorBookList/honorBookList.js
var authcerts = [];
Page({
  data: {
    certificate:[],
    imagesArr: []
  },
  onLoad: function (options) {
    if(options.certs){
      authcerts = JSON.parse(options.certs);
    }
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
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      count: 2, // 默认9
      success: function (res) {
        //console.log(res);
        that.data.imagesArr.push(res.tempFilePaths[0]);
        that.setData({
          imageList: that.data.imagesArr
        })
      }
    })
  },
  saveCerts: function () {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    });
    var page = this;
    var tid = wx.getStorageSync('userName');
    var len = page.data.imagesArr.length;
    //console.log(page.data.imagesArr);
    for (var i = 0; i < len; i++) {
      upload(page, [page.data.imagesArr[i]]);
    }
    wx.showToast({
      icon: "loading",
      title: "上传成功"
    });
    setTimeout(function () {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页面
      var prevPage = pages[pages.length - 3];  //上两个页面
      prevPage.setData({
        honorPicUrl: authcerts
      })
      wx.navigateBack({
        delta: 2
      })
    }, 1000)
  }
})

function upload(page, path) {
  wx.uploadFile({
    url: 'https://zetongteacher.zetongedu.com/teachr/teacher/authHonourCert',
    filePath: path[0],
    name: 'certs',
    header: { "content-type": "multipart/form-data" },
    formData: {
      //和服务器约定的token, 一般也可以放在header中
      'session_token': wx.getStorageSync('userName')
    },
    success: function (res) {
      //console.log(res);
      //console.log(res.statusCode)
      if (res.statusCode != 200) {
        wx.showModal({
          title: '提示',
          content: '上传失败A',
          showCancel: false
        })
        return;
      }
      var data = JSON.parse(res.data);
      if (data.errcode == 0) {
        authcerts.push(data.authImage)
      }
    },
    fail: function (e) {
      console.log('failed');
      console.log(e);
      wx.showModal({
        title: '提示',
        content: '上传失败B',
        showCancel: false
      })
    },
    complete: function () {
      wx.hideToast();  //隐藏Toast
    }
  })
}