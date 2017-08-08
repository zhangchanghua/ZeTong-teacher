var fn = require('../../utils/md5.js');
var Api = require('../../utils/api.js');
Page({
  data: {
    authTips: "发送验证码",
    clickBol: true,
    timers: 60,
    inputContent: '',
    inputCode: '',
    headImg: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/headerBg.png',
    userName: '',
    code: '',
    openid: '',
    session_key: '',
    userinfo: {}
  },
  linkToIndex: function () {
    wx.showToast({ title: '登录中', icon: 'loading', duration: 1000 });
    //var that = this;
    var url = Api.Url.login_login
    var params = {
      phone: this.data.inputContent,
      code: this.data.inputCode,
      openid: this.data.openid,
      userinfo: this.data.userinfo
    }
    Api.request(url, paras, function (data) {
      if (data.errcode == 0) {
        //success login
        console.log(data);
        try {
          wx.setStorageSync('userName', data.userName)
        } catch (e) {
          console.log(e)
        }
        wx.switchTab({
          url: '../teacher/index/index',
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            //
          }
        })
      }
    })
  },
  getAuth: function () {
    var that = this;
    if (that.data.inputContent.length < 11) {
      wx.showModal({
        title: '提示',
        content: '你输入的号码不正确'
      })
      return false;
    }
    if (this.data.clickBol) {
      that.setData({
        clickBol: false,
        authTips: that.data.timers + "s后重发"
      });

      var t = setInterval(function () {
        that.data.timers--;
        if (that.data.timers <= 0) {
          clearInterval(t);
          that.setData({
            clickBol: true,
            timers: 60,
            authTips: "发送验证码"
          });
        } else {
          that.setData({
            authTips: that.data.timers + "s后重发"
          });
        }
      }, 1000);
      var url = Api.Url.login_getVerifyCode
      var params = {
        phone: that.data.inputContent,
        state: fn.md5(that.data.inputContent + 'dtjy')
      }
      Api.request(url, params, function (data) {
        if (data.errcode == 0) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },
  bindKeyInput: function (e) {
    //console.log(e);
    var that = this;
    that.setData({
      inputContent: e.detail.value
    })
  },
  bindCodeInput: function (e) {
    //console.log(e);
    var that = this;
    that.setData({
      inputCode: e.detail.value
    })
  },
  wxlogin: function () {
    if (this.data.openid) {
      wx.showToast({ title: '登录中', icon: 'loading' });
      var that = this;
      var url = Api.Url.login_wxlogin
      var params = {
        session_key: that.data.session_key,
        openid: that.data.openid,
        name: that.data.userName
      }
      Api.request(url, params, function (data) {
        if (data.errcode == 0) {
          try {
            wx.setStorageSync('userName', data.userName)
          } catch (e) {
            console.log(e)
          }
          wx.switchTab({
            url: '../teacher/index/index',
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              //
            }
          })
        }
      })
    } else {
      console.log('wxlogin error')
    }
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res2) {
        console.log(res2);
        //var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
        //var iv = res2.iv;
        //请求自己的服务器
        //Login(code,encryptedData,iv);
        that.setData({
          userinfo: res2.userInfo,
          userName: res2.userInfo.nickName,
          headImg: res2.userInfo.avatarUrl
        });
      }
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          var url = 'https://api.weixin.qq.com/sns/jscode2session';
          var params = {
            appid: 'wx04d23b275bbd5e5d',
            secret: 'db5f77571978527d1cc0c41d2e5eabc0',
            js_code: res.code,
            grant_type: 'authorization_code'
          }
          console.error('擦')
          Api.request(url, params, function (data) {
            console.error('呵呵哒')
            that.setData({
              openid: res.data.openid,
              session_key: res.data.session_key
            })
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
