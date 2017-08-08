// pages/teacher/addEducationExperience/addEducationExperience.js
var common = require('../../../utils/publicFn.js');
var Api = require('../../../utils/api.js');
Page({
  data: {
    school: '',
    edu: '本科',
    pro: ''
  },
  onLoad: function (options) {
    console.log(options);
    if (options.edu) {
      this.setData({ 'edu': options.edu })
    }
    if (options.school) {
      this.setData({ 'school': options.school })
    }
    if(options.edus){
      this.setData({ edus: JSON.parse(options.edus) })
    }
  },
  getSchool: function (e) {
    //console.log(e.detail.value);
    this.setData({ school: e.detail.value });
  },
  getPro: function (e) {
    this.setData({ pro: e.detail.value })
  },
  toSelectEducation: function () {
    var page = this;
    /*common.na("../../../pages/teacher/educationSelect/educationSelect?school"+school);*/
    wx.redirectTo({
      url: "../../../pages/teacher/educationSelect/educationSelect?school=" + page.data.school+"&edus="+JSON.stringify(page.data.edus)
    })

  },
  saveEdu: function () {
    if(this.data.school == ''){
      common.showTip('请填写学校');return ;
    }
    if(this.data.pro == ''){
      common.showTip('请填写专业');return ;
    }
    var tid = wx.getStorageSync('userName');
    var page = this;
    var url = Api.Url.teacher_addEducation
    var params={
      teacherId: tid,
      school: page.data.school,
      edu: page.data.edu,
      pro: page.data.pro
    }
    Api.request(url,params,function(data){
      if (res.data.errcode == 0) {
        wx.showToast({ title: '添加成功', icon: 'loading', duration: 1000 })
      } else {
        common.showTip(res.data.errmsg); return;
      }
      setTimeout(function () {
        //var edu1 = page.data.edu,
        //pro1 = page.data.pro;
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];//当前页面
        var prevPage = pages[pages.length - 3];  //上两个页面
        //console.log(page.data.edus)
        page.data.edus.push({ school: page.data.school, major: page.data.pro, pro: page.data.edu })
        console.log(page.data.edus)
        prevPage.setData({
          education: page.data.edus
        })
        /*wx.redirectTo({url:'../../../pages/teacher/applyCertificate/applyCertificate'});*/
        wx.navigateBack({
          delta: 2
        })
      }, 1000)
    },function(e){
      common.showTip('添加失败')
    })
  }
})