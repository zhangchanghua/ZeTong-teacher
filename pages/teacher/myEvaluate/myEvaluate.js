// pages/teacher/myEvaluate/myEvaluate.js
var Api = require('../../../utils/api.js');
var star0 = "https://zetongteacher.zetongedu.com/static/teacher/Images/star-active.png";
var star1 = "https://zetongteacher.zetongedu.com/static/teacher/Images/star.png";

var evaluateData = [
  {
    "date": "2016年11月",
    "generalComment": 90,
    "generalStar": [star0, star0, star0, star0, star1],
    'records': [
      {
        'average': '80',
        "name": "程璧1",
        "headImg": "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/evaluate-header-pic.png",
        "stime": "2016-01-02 16:20",
        "starArr1": [star0, star0, star0, star0, star1],
        "professionComment": [
          { "project": "专业水平", "projectStar": [star0, star0, star0, star0, star1] },
          { "project": "敬业程度", "projectStar": [star0, star0, star0, star1, star1] },
          { "project": "爱心等级", "projectStar": [star0, star0, star0, star0, star0] },
        ],
        "content": "陈老师热情，很耐心细致，相当nice。"
      },

      {
        'average': '90',
        "name": "程璧",
        "headImg": "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/evaluate-header-pic.png",
        "stime": "2016-01-02 16:20",
        "starArr1": [star0, star0, star1, star1, star1],
        "professionComment": [
          { "project": "专业水平", "projectStar": [star0, star0, star0, star0, star1] },
          { "project": "敬业程度", "projectStar": [star0, star0, star1, star0, star0] },
          { "project": "爱心等级", "projectStar": [star1, star0, star0, star0, star0] },
        ],
        "content": "陈老师热情，很耐心细致，相当nice。"
      }

    ],
  },
  {
    "date": "2016年10月",
    "generalComment": 90,
    "generalStar": [star0, star0, star0, star0, star1],
    'records': [
      {
        'average': '80',
        "name": "程璧1",
        "headImg": "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/evaluate-header-pic.png",
        "stime": "2016-01-02 16:20",
        "starArr1": [star0, star0, star0, star0, star1],
        "professionComment": [
          { "project": "专业水平", "projectStar": [star0, star0, star0, star0, star1] },
          { "project": "敬业程度", "projectStar": [star0, star0, star0, star1, star1] },
          { "project": "爱心等级", "projectStar": [star0, star0, star0, star0, star0] },
        ],
        "content": "陈老师热情，很耐心细致，相当nice。"
      }
    ],
  }
]
Page({
  data: {
    /*data: evaluateData*/
    data: [],
    loadingHidden: false,
    empty: false
  },
  onLoad: function () {
    var page = this;
    var tid = wx.getStorageSync('userName');
    setTimeout(function () {
      if (getAssess(page, tid)) {
        console.log('true')
        
        
      } else {
        console.log('false')
        
      }
    }, 1500)

    setInterval(function () { getAssess(page, tid); }, 10000)

  },
})

// "date": "2016年10月",
// "generalComment": 90,
// "generalStar":[star0,star0,star0,star0,star0],
// "name":"程璧",
// "headerUrl":"http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/evaluate-header-pic.png",
// "timer":"2016-01-02 16:20",
// "starArr1":[star0,star0,star0,star0,star0],
// "professionComment":[
//     {"project":"专业水平","projectStar":[star0,star0,star0,star0,star0]},
//     {"project":"敬业程度","projectStar":[star0,star0,star0,star0,star0]},
//     {"project":"爱心等级","projectStar":[star0,star0,star0,star0,star0]},
// ],
// "generalCommentTxt":"陈老师热情，很耐心细致，相当nice。",


// "name2":"程璧",
// "headerUrl2":"http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/evaluate-header-pic.png",
// "timer2":"2016-01-02 16:20",
// "starArr2":[star0,star0,star0,star1,star0],
// "professionComment2":[
//     {"project":"专业水平","projectStar":[star0,star0,star0,star0,star0]},
//     {"project":"敬业程度","projectStar":[star0,star0,star0,star0,star0]},
//     {"project":"爱心等级","projectStar":[star0,star0,star0,star0,star0]},
// ],
// "generalCommentTxt2":"陈老师热情，很耐心细致，相当nice。"
function getAssess(page, tid) {
  var url = Api.Url.teacher_showassess
  var params={
    teacherId: tid
  }
  Api.request(url,params,function(data){
    if (data.length != 0) {
      page.setData({ data: data });
      page.setData({
        loadingHidden: true
      });
      page.update();
      return true;
    } else {
      page.setData({
        loadingHidden: true,
        empty: true
      });
      page.update();
      return false;
    }
  })

}