var fn = require("../../../utils/util.js");
var Api = require('../../../utils/api.js');
// pages/teacher/writeDaily/writeDaily.js
var that;
var lens = [[], []];
var homeworks = [];
var arrsd = [
  {
    xiguan: '行为习惯',
    showXiguanBol: true,
    bodys: [
      {
        idd: 0,
        text: '餐饮习惯',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      },
      {
        idd: 1,
        text: '午睡习惯',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      },
      {
        idd: 2,
        text: '纪律表现',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      }]
  }, {
    xiguan: '学习习惯',
    showXiguanBol: true,
    bodys: [
      {
        idd: 0,
        text: '专注程度',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      },
      {
        idd: 1,
        text: '完成质量',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      },
      {
        idd: 2,
        text: '坐姿情况',
        src1: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png",
        src2: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao2.png",
        ads: [
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"
          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          },
          {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }, {
            src: "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/biao1.png"

          }
        ]
      }]
  }

];
var homeworkArr = [
  {
    id: 0,
    subject: "语文",
    grade: "有待提高知识点",
    points: [
      "知识点1知识点1知识点1知识点1知识点1",
      "知识点2知识点2知识点2知识点2知识点2知识点2"
    ]
  },
  {
    id: 1,
    subject: "数学",
    grade: "有待提高知识点",
    points: [
      "数学知识点1知识点1知识点1知识点1知识点1",
      "知识点2知识点2知识点2知识点2知识点2知识点2"
    ]
  },
  {
    id: 2,
    subject: "英语",
    grade: "有待提高知识点",
    points: [
      "英语知识点1知识点1知识点1知识点1知识点1",
      "知识点2知识点2知识点2知识点2知识点2知识点2"
    ]
  }
];
Page({
  data: {
    arrs: arrsd,
    homeworkArr: homeworkArr,
    homeworkyuwen: '',
    homeworkmath: '',
    homeworkenglish: '',

    ids: '',
    kinds: '',
    dateText: '2017-05',
    des: ''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ids: options.ids,
      kinds: options.kinds,
      dateText: fn.getTime(),
      arrs: arrsd
    })
  },
  zans: function (e) {
    // console.log(e);
    // 点赞
    var ids = e.currentTarget.dataset.index;
    var arids = e.currentTarget.dataset.arrind;
    var allindex = e.currentTarget.dataset.allindex;
    var arrlen = arrsd[allindex].bodys[arids].ads.length;
    for (var i = 0; i < arrlen; i++) {
      var datad = arrsd[allindex].bodys[arids].ads[i],
        datalen = arrsd[allindex].bodys[arids];
      if (i <= ids) {
        datad.src = datalen.src2;
      } else {
        datad.src = datalen.src1;
      }
    }
    this.setData({
      arrs: arrsd
    })
    lens[allindex][arids] = ids;
    console.log(lens);
  },
  getHomework: function (e) {
    homeworks[e.currentTarget.id] = e.detail.value;
    console.log(homeworks)
  },
  bindTextAreaBlur: function (e) {
    this.setData({ des: e.detail.value })
  },
  subMonthReport: function () {
    //console.log(homeworks)
    var page = this;
    var url = Api.Url.teacher_monthReport
    var params = {
      teacherId: wx.getStorageSync('userName'),
      kids: page.data.ids,
      kinds: page.data.kinds,
      arrs: lens,
      homeworkyuwen: homeworks[0],
      homeworkmath: homeworks[1],
      homeworkenglish: homeworks[2],
      des: page.data.des
    }
    Api.request(url, params, function (data) {
      if (data.errcode == 0) {
        wx.showToast({
          title: data.errmsg,
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index'
          })
        }, 1000)
      }
    })
  }
})