// pages/teacher/styleShow/styleShow.js
var fn = require("../../../utils/publicFn.js");
var authImgs = [];
Page({
  data: {
    isEmpty: true,
    imagesArr: []
  },
  onLoad: function (options) {
    console.log(options)
    if (options.showPicUrl) {
      this.setData({
        imageList: JSON.parse(options.showPicUrl),
        imagesArr: JSON.parse(options.showPicUrl),
        isEmpty: false
      })
    }
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          that.data.imagesArr.push(res.tempFilePaths[i]);
        }

        that.setData({
          imageList: that.data.imagesArr
        })
        console.log(that.data.imagesArr)
      }
    })
  },
  authImages: function () {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    });
    var page = this;
    var tid = wx.getStorageSync('userName');
    var len = page.data.imagesArr.length;
    var origin = []; //原有的照片
    console.log(page.data.imagesArr);
    for (var i = 0; i < len; i++) {
      if (page.data.imagesArr[i].indexOf("https") == -1) {
        upload(page, [page.data.imagesArr[i]]);
      }else{
        origin.push(page.data.imagesArr[i])
      }      
    }
    wx.showToast({
      icon: "loading",
      title: "上传成功"
    });
    console.log(authImgs)
    setTimeout(function () {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页面
      var prevPage = pages[pages.length - 2];//上一个页面
      prevPage.setData({
        showPicUrl: origin.concat(authImgs)
      })
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    console.log(current)
    fn.na("../../../pages/teacher/checkPhoto/checkPhoto?img=" + current + '&all=' + JSON.stringify(this.data.imagesArr)+'&type=image');
    // wx.previewImage({
    //   current: current,
    //   urls: this.data.imagesArr
    // })
  },
  toAddPic: function () {
    this.setData({
      isEmpty: false
    })
  }
})

function upload(page, path) {
  wx.uploadFile({
    url: 'https://zetongteacher.zetongedu.com/teachr/teacher/authImages',
    filePath: path[0],
    name: 'pic',
    header: { "content-type": "multipart/form-data" },
    formData: {
      //和服务器约定的token, 一般也可以放在header中
      'session_token': wx.getStorageSync('userName')
    },
    success: function (res) {
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
      console.log(data.authImage);
      if (data.errcode == 0) {
        authImgs.push(data.authImage)
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