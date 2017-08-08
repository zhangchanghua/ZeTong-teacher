var fn = require("../../../utils/util.js");
var comm = require('../../../utils/publicFn.js');
var Api = require('../../../utils/api.js');
var that;
var lens = [[],[]];
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
  },
  {
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
  },

];
Page({
  data:{
    arrs: arrsd,
    ids:'',
    kinds:'',
    dateText:'2017-05-08'
  },
  onLoad:function(options){
    console.log(options);
    this.setData({
      ids: options.ids, 
      kinds: options.kinds,
      dateText:fn.getNowDate(),
      arrs: arrsd
    })
  },
  zans: function (e) {
    //console.log(e);
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
    //console.log(lens[0].length+'   '+lens[1].length);
  },
  subReport:function(){
    var page = this;
    if(lens[0].length<2){comm.showTip('行为习惯未填写完整');return ;}
    if(lens[1].length<3){comm.showTip('学习习惯未填写完整');return ;}
    var url;
    if(page.data.ids.length > 1){
      url = Api.Url.teacher_dayReportBoth;
    }else{
      url = Api.Url.teacher_dayReportSingle;
    }
    var params={
      teacherId: wx.getStorageSync('userName'),
      kids: page.data.ids,
      kinds: page.data.kinds,
      arrs: lens 
    }
    Api.request(url,params,function(data){
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