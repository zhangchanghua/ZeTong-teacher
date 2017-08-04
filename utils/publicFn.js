//公共函数
function re(url) {
    wx.redirectTo({ //关闭当前页面，跳转到应用内的某个页面
        url: url
    });
}
function na(url) {
    //保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
        url: url
    });
}
function loadingshow(title='加载中') {
    wx.showToast({
        title: title,
        icon: 'loading'
    })
}
function showTip(title='提示成功'){
    wx.showToast({
        title: title,
        icon: 'success'
    })
}
function loadinghide() {
    wx.hideToast();
}
function trim(obj) {
    //去空
    var str = obj.replace(/\s+/g, "");
    return str;
}
// 正则
function check(types, val) {
    // 调用check(1,'13426856878')
    var val = trim(val);
    switch (types) {
        case 1:
            //手机号
            var reg = /^1[34578]\d{9}$/;
            return reg.test(val);
            break;
        case 2:
            //6~20字符
            var reg = /\w{6,15}$/;
            return reg.test(val);
            break;
        case 3:
            //身份证号码
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            return reg.test(val);
            break;
        case 4:
            // 金钱
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            return reg.test(val);
            break;

        case 5:
            // 正整数
            var reg = /^\+?[1-9][0-9]*$/;
            return reg.test(val);
            break;
        default: break;
    }
}
function call(phonenum){
  wx.makePhoneCall({
  phoneNumber: phonenum 
})
}
//---------------------------------
function  Login(url,code,encryptedData,iv){  
    console.log('code='+code+'&encryptedData='+encryptedData+'&iv='+iv);
          //创建一个dialog
          wx.showToast({
            title: '正在登录...',
            icon: 'loading',
            duration: 10000
          });
          //请求服务器
          wx.request({
            url: url,
            data: {
              code:code,
              encryptedData:encryptedData,
              iv:iv
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
              // success
              wx.hideToast();
              console.log('服务器返回'+res.data);

            },
            fail: function () {
              // fail
              // wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
  }
//---------------------------------
module.exports = {
    re: re,
    na: na,
    loadingshow: loadingshow,
    showTip: showTip,
    loadinghide: loadinghide,
    trim: trim,
    check: check,
    call: call

}