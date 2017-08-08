// pages/teacher/index/index.js
var fn = require('../../../utils/publicFn.js');
var common = require('../../../utils/util.js');
var Api = require('../../../utils/api.js');
var kinds = 0;//0午托，1晚托，2全托;
var bol = false;
var newarr = [];//这里默认存放着选中的学生的id，没有为空
var students = [];
var days = [];
Page({
  data: {
    searchLetter: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    nav1Text: ["点到", "写日报", "写月报"],
    nav2Text: ["午托", "晚托", "全托"],
    nav1Indes: 0,
    nav2Indes: 0,
    dateText: "2017-01-05",
    allAmount: 0,
    signAmount: 0,
    btnText: ["全选", "全不选", "接回", "返校", "提交"],
    select: 0,
    selectIndex: 2,
    selectIndex1: 2,
    isStart: true,
    isDaily: false,
    isMonth: false,
    isShowTopNav: true,
    isZiMu: true,
    isUnifyDaily: false,
    isUnifyMonth: false,
    pass: 0,
    stus: [],
    daydata: days,
    allornot: 2
  },
  onLoad: function (options) {
    var page = this;
    var tid = wx.getStorageSync('userName');
    console.log('tid: '+tid);
    var url = Api.Url.teacher_index
    var params={
      username: tid
    }
    Api.request(url,params,function(data){
      days = data.students;
      page.setData({
        daydata: days,
        dateText: common.getNowDate(),
        allAmount: data.allAmount,
        signAmount: data.signAmount
      });
      if (data.errcode) {
        fn.showTip(data.errmsg)
      }
    })

  },
  nav2Click: function (e) {
    var page = this;
    var ind = e.currentTarget.dataset.id;
    kinds = ind; //午托托 or 晚托
    //console.log(kinds);
    page.setData({
      nav2Indes: ind
    });
    var tid = wx.getStorageSync('userName');
    var url = Api.Url.teacher_index
    var params = {
      username: tid,
      kind: ind
    }
    Api.request(url,params,function(data){
      days = data.students;
      page.setData({
        "daydata": days,
        "dateText": data.dateText,
        "allAmount": data.allAmount,
        "signAmount": data.signAmount
      });
    })
  },
  today: function (e) {
    var that = this;
    var idd = e.currentTarget.dataset.id;
    var ind = this.data.nav2Indes;
    if (that.data.isDaily) {
      switch (ind) {
        // 0是午托，1是晚托，2是全托
        case 0: fn.re("../../../pages/teacher/writeDailyNoon/writeDailyNoon?ids=" + idd + "&kinds=" + ind);
          break;
        case 1: fn.re("../../../pages/teacher/writeDailyNight/writeDailyNight?ids=" + idd + "&kinds=" + ind);
          break;
        case 2: fn.re("../../../pages/teacher/writeDailyAllNoon/writeDailyAllNoon?ids=" + idd + "&kinds=" + ind);
          break;

      }
    }

  },
  tomonth: function (e) {
    var that = this;
    var idd = e.currentTarget.dataset.id;
    var ind = this.data.nav2Indes;
    //console.log('childid==' + idd + '  type==' + ind);
    if (that.data.isMonth) {
      switch (ind) {
        // 0是午托，1是晚托，2是全托
        case 0: fn.re("../../../pages/teacher/monthlyNoon/monthlyNoon?ids=" + idd + "&kinds=" + ind);
          break;
        case 1: fn.re("../../../pages/teacher/monthlyNight/monthlyNight?ids=" + idd + "&kinds=" + ind);
          break;
        case 2: fn.re("../../../pages/teacher/monthlyAll/monthlyAll?ids=" + idd + "&kinds=" + ind);
          break;

      }
    }
  },
  chooseimg: function (e) {
    var idw = e.currentTarget.dataset.idw,
      insad = e.currentTarget.dataset.indexs,
      myindex = e.currentTarget.dataset.myindex;
    var chos = days[insad].studata[myindex].chose;
    if (chos == 0) {
      days[insad].studata[myindex].chose = 1;
    } else {
      days[insad].studata[myindex].chose = 0;
    }
    this.setData({
      allornot: 2,
      daydata: days
    });

  },
  qon: function (e) {
    // 是否全选
    var insd = e.currentTarget.dataset.index;
    var sio;
    if (insd == 1) {
      sio = 1;
    } else {
      sio = 0;
    }
    for (var i = 0, ilen = days.length; i < ilen; i++) {
      for (var j = 0, jlen = days[i].studata.length; j < jlen; j++) {
        days[i].studata[j].chose = sio;
      }
    }
    this.setData({
      allornot: insd,
      daydata: days
    })
  },
  btnClick: function (e) {
    var that = this;
    var ind = e.currentTarget.dataset.id;
    var lens = students.length;
    newarr = [];

    if (ind == 1) {
      //全选
      // for (var i = 0; i < lens; i++) {
      //   students[i].chose = 1;
      //   newarr.push(students[i].id);
      // }
      for (var i in days) {
        for (var j in days[i].studata) {
          days[i].studata[j].chose = 1;
          newarr.push(days[i].studata[j].id);
        }
      }
      if (bol == true) {
        that.setData({
          pass: 1
        })
      } else {
        that.setData({
          pass: 0
        })
      }

    } else {
      //  全不选
      newarr = [];
      // for (var i = 0; i < lens; i++) {
      //   students[i].chose = 0;
      // }
      for (var i in days) {
        for (var j in days[i].studata) {
          days[i].studata[j].chose = '';
        }
      }
      console.log(newarr);
      that.setData({
        pass: 0
      })
    }
    that.setData({
      selectIndex: ind,
      daydata: days,
    })

  },
  tosurea: function (e) {
    console.log(e);
    //统一确定
    var that = this;
    var ind = this.data.nav2Indes;//午托OR晚托
    var nes = [];//保存选择的人的id
    for (var i = 0, ilen = days.length; i < ilen; i++) {
      for (var j = 0, jlen = days[i].studata.length; j < jlen; j++) {
        var sdw = days[i].studata[j];
        if (sdw.chose == 1) {
          nes.push(sdw.id);
        }
      }
    }
    if (that.data.isUnifyDaily && nes.length > 0) {
      switch (ind) {
        // 0是午托，1是晚托，2是全托
        case 0: fn.na("../../../pages/teacher/writeDailyNoon/writeDailyNoon?ids=" + nes + "&kinds=" + ind);
          break;
        case 1: fn.na("../../../pages/teacher/writeDailyNight/writeDailyNight?ids=" + nes + "&kinds=" + ind);
          break;
        case 2: fn.na("../../../pages/teacher/writeDailyAllNoon/writeDailyAllNoon?ids=" + nes + "&kinds=" + ind);
          break;

      }
    } else if (that.data.isUnifyMonth && nes.length > 0) {
      switch (ind) {
        // 0是午托，1是晚托，2是全托
        case 0: fn.na("../../../pages/teacher/monthlyNoon/monthlyNoon?ids=" + nes + "&kinds=" + ind);
          break;
        case 1: fn.na("../../../pages/teacher/monthlyNight/monthlyNight?ids=" + nes + "&kinds=" + ind);
          break;
        case 2: fn.na("../../../pages/teacher/monthlyAll/monthlyAll?ids=" + nes + "&kinds=" + ind);
          break;
      }
    }
  },
  kindClick: function (e) {
    var that = this;
    var ind1 = e.currentTarget.dataset.id;
    bol = true;
    if (newarr.length <= 0) {
      that.setData({
        selectIndex1: ind1,
        pass: 0
      })
    } else {
      this.setData({
        selectIndex1: ind1,
        pass: 1
      })
    }


  },
  choosel: function (e) {
    console.log(e.currentTarget.dataset);
    var that = this;
    var indexs = e.currentTarget.dataset.index,
      naindexs = e.currentTarget.dataset.naindex,
      naid = e.currentTarget.dataset.id,
      choses = days[indexs].studata[naindexs].chose,
      sel1 = this.data.selectIndex1;
    var nad = days[indexs].studata[naindexs];//当前项
    newarr = [];
    if (choses == '') {
      nad.chose = 1;
    } else {
      nad.chose = '';
    }
    for (var i in days) {
      for (var j in days[i].studata) {
        if (days[i].studata[j].chose == 1) {
          newarr.push(days[i].studata[j].id);
        }
      }
    }
    if (newarr.length <= 0 || sel1 == 2) {
      that.setData({
        pass: 0
      })
    } else {
      that.setData({
        pass: 1
      })
    }
    console.log(newarr.length);
    that.setData({
      selectIndex: 2,
      daydata: days,
    })
  },
  submil: function () {
    console.log('len : ' + newarr.length);
    var that = this;
    var pas = this.data.pass, teacherId = wx.getStorageSync('userName'),
      sel1 = this.data.selectIndex1;//接回 OR 返校
    if (newarr.length > 0 && pas == 1) {
      // 选中人物，而且选择了接回或者返校
      // kind:0午托，1晚托，2全托；newarr:已选中的学生的id;sel:1:接回，2：返校
      console.log('sel1: ' + sel1);
      console.log('kinkd: ' + kinds);
      console.log(that.data.selectIndex1)
      var cont = (that.data.selectIndex1==0)?'返校':'接回';
      console.log(cont)
      wx.showModal({
        title: '提示',
        content: '确定' +cont+'?',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var url = Api.Url.teacher_signed
            var params={
              'teacherId': teacherId,
              'type': sel1,//接回 OR 返校
              'kind': kinds,//午托托OR晚托(0,1,2)
              'kids': newarr
            }
            Api.request(url,params,function(data){
              if (data.errcode == 0) {
                console.log(data.repeat)
                if (data.repeat.length > 0) {
                  for (var i = 0; i < data.repeat.length; i++) {
                    wx.showToast({
                      title: data.repeat[i] + ' 今天已签到',
                      icon: 'success',
                      duration: 800
                    })
                  }
                } else {
                  wx.showToast({
                    title: '签到成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                that.setData({ "signAmount": data.signAmount })
              }
            })           
          }
        }
      })

    } else {
      //title文案自己写
      wx.showToast({
        title: '至少选择一个人跟行为',
        icon: 'success',
        duration: 2000
      })
    }

  },
  toWriteDaily: function () {
    //fn.na("../../../pages/teacher/monthlyAll/monthlyAll");
  },
  tabChange: function (e) {
    var that = this;
    console.log(e)
    switch (e.currentTarget.dataset.id) {
      case 0:
        that.setData({
          isStart: true,
          isDaily: false,
          isMonth: false,
          isShowTopNav: true,
          isZiMu: true,
          isUnifyDaily: false,
          isUnifyMonth: false
        });
        break;

      case 1:    //写日报
        that.setData({
          isStart: false,
          isDaily: true,
          isMonth: false,
          isShowTopNav: true,
          isZiMu: true,
          isUnifyDaily: false,
          isUnifyMonth: false
        });
        break;

      case 2:  //写月报
        that.setData({
          isStart: false,
          isDaily: false,
          isMonth: true,
          isShowTopNav: true,
          isZiMu: true,
          isUnifyDaily: false,
          isUnifyMonth: false
        });
        break;
    }
    that.setData({
      nav1Indes: e.currentTarget.dataset.id
    })
  },
  unifyWrite: function () {
    this.setData({
      isDaily: false,
      isUnifyDaily: true,
      isUnifyMonth: false
    })
  },
  unifyMonthWrite: function () {
    this.setData({
      isMonth: false,
      isDaily: false,
      isUnifyDaily: false,
      isUnifyMonth: true
    })
  },
  clickFirst: function (e) {
    console.log(e.currentTarget.dataset.content)
  }

})
