// pages/teacher/mine/mine.js
var common = require('../../../utils/publicFn.js');
var Api = require('../../../utils/api.js');
Page({
  data: {
    logined: false,
    certified: false,
    headerUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/my-heder1.png",
    userName: "点击登录",
    itemText: "申请教师档案认证",
    allowview: false
  },
  onLoad: function () {
    var that = this;
    /*this.setData({
      userName: "艾力",
      headerUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/my-heder2.png",
      itemText: "我的档案",
      logined: true,
      certified: true,
    });*/
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('code=' + res.code);
          var tid = wx.getStorageSync('userName');
          wx.getUserInfo({
            success: function (res2) {
              console.log(res2);
              //var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              //var iv = res2.iv;
              //请求自己的服务器
              //Login(code,encryptedData,iv);
              that.setData({
                userName: res2.userInfo.nickName,
                headerUrl: res2.userInfo.avatarUrl,
                //itemText: "我的档案",
                logined: true,
                //certified: true,
              });
            }
          })
          var url = Api.Url.teacher_getCertified
          var params = {
            username: tid
          }
          Api.request(url, params, function (data) {
            if (data.errcode == 1) {
              common.showTip('待审核');
              that.setData({
                //itemText: "我的档案",
                logined: true,
                //certified: true,
              });
            } else if (data.errcode == 2) {
              //common.showTip('审核通过');
              that.setData({
                itemText: "我的档案",
                logined: true,
                certified: true,
                allowview: true
              });
            } else if (data.errcode == 3) {
              common.showTip('未审核通过');
              that.setData({
                logined: true,
              });
            } else {
              common.showTip('未审核');
              that.setData({
                //itemText: "我的档案",
                logined: true,
                //certified: true,
              });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  link1: function () {

    if (this.data.certified && this.data.allowview) {
      //我的档案
      common.na("../../../pages/teacher/teacherFile/teacherFile");
    } else {
      common.na("../../../pages/teacher/applyCertificate/applyCertificate");
    }

  },
  linkToEvaluate: function () {
    common.na("../../../pages/teacher/myEvaluate/myEvaluate");
  },
  linkToSalary: function () {
    common.na("../../../pages/teacher/mySalary/mySalary");
  },
  linkToMsg: function () {
    common.na("../../../pages/teacher/myLeaveMessage/myLeaveMessage");
  },
  logout: function () {
    try {
      wx.clearStorageSync()
    } catch (e) {
      console.log('clear storageSync error')
      wx.showToast({
        title: '清空缓存失败',
        icon: 'success'
      }); return;
    }
    wx.showToast({
      title: '退出成功',
      icon: 'success'
    })
    setTimeout(function () {
      common.re("../../../pages/login/login");
    }, 1000)
  }

})