// pages/teacher/educationExperience/educationExperience.js
var fn = require("../../../utils/publicFn.js");
var Api = require('../../../utils/api.js');
/*var bianjiData = [
  { text: "华南理工大学", iconUrl: "https://zetongteacher.zetongedu.com/static/teacher/Images/right-arr.png" },
  { text: "中山大学", iconUrl: "https://zetongteacher.zetongedu.com/static/teacher/Images/right-arr.png" },

];*/
var bianjiData = [];
/*var overData = [
  { text: "中山大学", iconUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/delete-icon.png" },
  { text: "华南理工大学", iconUrl: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/delete-icon.png" },
];*/
var overData = [];
Page({
  data: {
    status: bianjiData,
    btnText: "编辑",
    changeStatusBol: false,
    isBianji: false
  },
  onLoad: function (option) {
    if (option.education) {
      bianjiData = JSON.parse(option.education)
      for (var i = 0; i < bianjiData.length; i++) {
        bianjiData[i].text = bianjiData[i].school;
        bianjiData[i].iconUrl = "https://zetongteacher.zetongedu.com/static/teacher/Images/right-arr.png";
      }
      overData = JSON.parse(option.education);
      for (var i = 0; i < overData.length; i++) {
        overData[i].text = overData[i].school;
        overData[i].iconUrl = "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/delete-icon.png";
      }
      this.setData({ status: bianjiData })
    }
  },
  changeStatus: function () {
    var that = this;
    if (!this.data.changeStatusBol) {
      this.setData({
        // 编辑状态
        status: overData,
        btnText: "完成",
        changeStatusBol: true,
        isBianji: true
      })
    } else {
      // 完成状态
      this.setData({
        status: bianjiData,
        btnText: "编辑",
        changeStatusBol: false,
        isBianji: false
      })
    }
  },
  deleteSchool: function (e) {
    var that = this;
    if (this.data.isBianji) {
      //编辑状态可以删除一条记录
      var n = e.target.dataset.ind;
      console.log(n);
      var url = Api.Url.teacher_deleteEducation
      var params={
        teacherId: wx.getStorageSync('userName'),
        eduindex: n
      }
      Api.request(url,params,function(data){
        if (data.errcode == 0) {
          bianjiData.splice(n, 1);
          overData.splice(n, 1);
          console.log(bianjiData)
          console.log(overData)
          //-----------------------------------------
          setTimeout(function () {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];//当前页面
            var prevPage = pages[pages.length - 2]; //上一个
            //console.log(page.data.edus)

            prevPage.setData({
              education: res.data.errData
            })

          }, 0)
          //-----------------------------------------
          that.data.status.splice(n, 1)
          that.setData({
            status: that.data.status
          });
        }
      })
    }
  },
  toAddEducation: function () {
    fn.na("../../../pages/teacher/addEducationExperience/addEducationExperience?edus=" + JSON.stringify(bianjiData));
  }

})