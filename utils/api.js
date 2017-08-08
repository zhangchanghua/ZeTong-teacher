//host
var HOST = 'https://zetongteacher.zetongedu.com/teachr/';

var Url = {
  login_wxlogin: HOST + 'login/wxlogin',//微信登录
  login_login: HOST + 'login/login',//
  login_getVerifyCode: HOST + 'login/getVerifyCode',//获取验证码
  teacher_index: HOST + 'teacher/index',//
  teacher_addEducation: HOST + 'teacher/addEducation',//添加教育经历
  teacher_getStores: HOST + 'teacher/getStores',//
  teacher_courses: HOST + 'teacher/courses',//
  teacher_userInfo: HOST + 'teacher/userInfo',//
  teacher_requestAuth: HOST + 'teacher/requestAuth',//
  teacher_getCity: HOST + 'teacher/getCity',//
  teacher_deleteImg: HOST + 'teacher/deleteImg',//
  teacher_saveClass: HOST + 'teacher/saveClass',//
  teacher_deleteEducation: HOST + 'teacher/deleteEducation',//
  teacher_signed: HOST + 'teacher/signed',//
  teacher_getLeaveById: HOST + 'teacher/getLeaveById',//
  teacher_getCertified: HOST + 'teacher/getCertified',//
  teacher_monthReport: HOST + 'teacher/monthReport',//
  teacher_showassess: HOST + 'teacher/showassess',//
  teacher_getMessage: HOST + 'teacher/getMessage',//
  teacher_getSalaryByTeacher: HOST + 'teacher/getSalaryByTeacher',//
  teacher_dayReportSingle: HOST + 'teacher/dayReportSingle',//
  teacher_dayReportBoth: HOST + 'teacher/dayReportBoth',//  

}
//请求
function request(url, params, success, fail, showLoading) {
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  var that = this;
  console.log('请求: ' + url)
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      if (success && typeof success == 'function') {
        success(res.data)
      }
    },
    fail: function (e) {
      console.error('请求异常:' + e.errMsg)
      //console.error(e);
      if (fail && typeof fail == 'function') {
        fail(e)
      }
    },
    complete: function () {
      wx.hideLoading()
      wx.hideToast()
    }
  })
}

module.exports = {
  Url: Url,
  request: request,
}

