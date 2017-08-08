// pages/teacher/checkPhoto/checkPhoto.js
var Api = require('../../../utils/api.js');
var imageList = [];
var currImg = '';
var type='image';
Page({
  data: {
    currIndex: 1,
    total: 3
  },
  onLoad: function (option) {
    console.log(option)
    var page = this;
    if (option.all) {
      imageList = JSON.parse(option.all);
      currImg = option.img;
      type = option.type;
      console.log(imageList.length);
      var total = imageList.length;
      for (var i = 0; i < total; i++) {
        if (imageList[i] == option.img) {
          page.setData({ currIndex: i + 1, total: total })
        }
      }
    }
    page.setData({ img: option.img })
  },
  deleteBtn: function () {
    var tid = wx.getStorageSync('userName');
    wx.showModal({
      title: '提示',
      content: '要删除这张照片吗？',
      success: function (res) {
        if (res.confirm) {

          for (var i = 0; i < imageList.length; i++) {
            if (imageList[i] == currImg) {
              if (currImg.indexOf('https') != -1) {
                delImg(tid, currImg,type)
              }
              imageList.splice(i, 1);
              break;
            }
          }
          console.log(imageList);

          setTimeout(function () {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];//当前页面
            var prevPage = pages[pages.length - 2]; //上一页面
            prevPage.setData({
              imagesArr: imageList,
              imageList: imageList
            })
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      }
    })
  }
})
function delImg(tid, src,t) {
  var url = Api.Url.teacher_deleteImg
  var params={
    teacherId: tid, 
    src: src,
     kind: t
  }
  Api.request(url,params,function(data){
    if (data.errcode == 0) {
      wx.showToast({
        icon: "loading",
        title: "删除成功"
      });
    }
  })
}