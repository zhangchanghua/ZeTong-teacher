var fn = require('../../utils/md5.js');
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
    wx.request({
      url: 'https://zetongteacher.zetongedu.com/teachr/login/login?phone=' + this.data.inputContent + '&code=' + this.data.inputCode+'&openid='+this.data.openid,
      method: 'POST',
      data: {userinfo: this.data.userinfo},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        if (res.data.errcode == 0) {
          //success login
          console.log(res.data);
          try {
            wx.setStorageSync('userName', res.data.userName)
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
        } else {
          wx.showToast({
            title: res.data.errmsg,
            //content: res.data.errmsg,
            duration: 2000
          });
          return false;
        }
      },
      fail: function () {
        return false;
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
      wx.request({
        url: 'https://zetongteacher.zetongedu.com/teachr/login/getVerifyCode?phone=' + that.data.inputContent+'&state='+fn.md5(that.data.inputContent+'dtjy'),
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.errcode == 0) {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000
            })
          } else { //发送失败
            console.log(res.data.errmsg);
            wx.showToast({
              title: res.data.errmsg,
              icon: 'success',
              duration: 2000
            })
          }
        },
        fail: function (e) {
          console.log('failed!');
          console.log(e)
        },
        complete: function (res) {
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }

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
      wx.request({
        url: 'https://zetongteacher.zetongedu.com/teachr/login/wxlogin?session_key=' + that.data.session_key + '&openid=' + that.data.openid + '&name=' + that.data.userName,
        method: 'POST',
        data: { userinfo: that.data.userinfo },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          wx.hideToast();
          if (res.data.errcode == 0) {
            try {
              wx.setStorageSync('userName', res.data.userName)
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
          } else {
            wx.showToast({
              title: res.data.errmsg,
              //content: res.data.errmsg,
              duration: 2000
            });
            return false;
          }
        },
        fail: function () {
          return false;
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
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx04d23b275bbd5e5d&secret=db5f77571978527d1cc0c41d2e5eabc0&js_code=' + res.code + '&grant_type=authorization_code',
            header: { 'content-type': 'application/json' },
            success: function (res) {
              console.log('openid='+res.data.openid)
              that.setData({
                openid: res.data.openid,
                session_key: res.data.session_key
              })
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
