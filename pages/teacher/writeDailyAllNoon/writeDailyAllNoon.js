var fn = require("../../../utils/util.js");
var that;
var lens = [[],[]];
/*var arrsd = [
  {
    xiguan: '行为习惯',
    showXiguanBol: false,
    bodys: [
      {
        idd: 0,
        text: '餐饮习惯',
        showXiguanBol: false,
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
  }

];*/
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
  onLoad: function(options){
    this.setData({
      ids: options.ids, 
      kinds: options.kinds,
      dateText:fn.getNowDate(),
      arrs: arrsd
    })
  },
  subReport:function(){
    var page = this;
    //console.log(page.data.ids.length);
    if(page.data.ids.length > 1){
      var url = 'https://zetongteacher.zetongedu.com/teachr/teacher/dayReportBoth';
    }else{
      var url = 'https://zetongteacher.zetongedu.com/teachr/teacher/dayReportSingle';
    }
    wx.request({
      url: url,
      data: {
        teacherId: wx.getStorageSync('userName'),
        kids: page.data.ids, 
        kinds: page.data.kinds,
        arrs: lens
        
      },
      method: 'POST',
      header: {'content-type': 'application/json'},
      success: function(res){
        console.log('success!')
        if(res.data.errcode==0){
          console.log(res.data.repeat);
          wx.showToast({
              title: res.data.errmsg,
              icon: 'success',
              duration: 1500
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index'            
            })            
          },1000)
        }else{
          wx.showToast({
              title: res.data.errmsg,
              icon: 'success',
              duration: 2000
           })
        }
      },
      fail: function(res) {
        console.log('failed!')
      },
      complete: function(res) {
        // complete
      }
    })
  }
})