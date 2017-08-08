// pages/teacher/applyCertificate/applyCertificate.js
var fn = require('../../../utils/publicFn.js');
var Api = require('../../../utils/api.js');
var honorPic = "https://zetongteacher.zetongedu.com/static/teacher/Images/honor-pic.png";
var showPic = "https://zetongteacher.zetongedu.com/static/teacher/Images/pic1.png";
var name, sex, address, introduce, eduIdea, hobby, shopId;
var contactwx, contactqq, contactmobile, isbelongs;
var subject = [
  { id: 1, text: "钢琴", isSelected: false },
  { id: 2, text: "绘画", isSelected: false },
  { id: 3, text: "数学", isSelected: false },
  { id: 4, text: "语文", isSelected: false },
  { id: 5, text: "英语", isSelected: false },
  { id: 6, text: "体育", isSelected: false },
  { id: 7, text: "舞蹈", isSelected: false },
  { id: 8, text: "唱歌", isSelected: false }
]
var educa = [];
Page({
  data: {
    items: [
      { name: 'man', value: '男', },
      { name: 'woman', value: '女', }
    ],
    headimg: 'https://zetongteacher.zetongedu.com/static/teacher/Images/apply-header.png',
    /*education:[
      {school:"华南理工大学",major:"幼儿教育",pro:"本科"},
      {school:"华中科技大学",major:"细胞生命学",pro:"硕士"}
    ],*/
    education: educa,
    //honorPicUrl: [honorPic,honorPic,honorPic,honorPic],
    //showPicUrl: [showPic,showPic,showPic,showPic],
    honorPicUrl: [],
    showPicUrl: [],
    subjects: subject,
    objectstores: [
      { id: 0, shopname: "暂无门店" }
    ],
    stores: ['暂无门店'],
    provinces: ["北京", "上海", "天津", "重庆", "四川", "贵州", "云南", "西藏", "河南", "湖北", "湖南", "广东", "广西", "陕西", "甘肃", "青海", "宁夏", "新疆", "河北", "山西", "内蒙古", "江苏", "浙江", "安徽", "福建", "江西", "山东", "辽宁", "吉林", "黑龙江", "海南", "台湾", "香港", "澳门", "深圳", "广州", "珠海"],
    citys: ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区'],
    storeIndex: 0,
    provinceIndex: 0,
    cityIndex: 0,
    selectIndex: 0,
    defaultProvince: null,
    defaultCity: null,
    teacherKinds: ["泽童教育", "非泽童教育"]
  },
  onLoad: function (e) {
    var page = this;
    var tid = wx.getStorageSync('userName');
    if (!tid) {
      wx.showToast({
        icon: "loading",
        title: "请先登录"
      })
      fn.re('../../../pages/teacher/mine/mine'); return;
    }
    // ---------------------注意这三个调用先后顺序-----
    var url = Api.Url.teacher_getStores
    var params = {
      teacherId: tid,
    }
    Api.request(url, params, function (data) {

        if (data.stolength != 0) {
          page.setData({
            objectstores: data.objectstores,
            stores: data.stores
          })
        }
        shopId = getshopId(page, page.data.objectstores);
        var url1 = Api.Url.teacher_courses
        var params1 = {
          teacherId: tid,
        }
        Api.request(url1, params1, function (data) {
    
            subject = data.courses;
            page.setData({ 'subjects': subject })
            var url2 = Api.Url.teacher_userInfo
            var params2 = {
              teacherId: tid,
            }
            Api.request(url2, params2, function (data) {
              if (data[0]) {
                educa = data[0].education;
                //获取男女
                for (var i = 0; i < page.data.items.length; i++) {
                  if (page.data.items[i].value == data[0].sex) {
                    page.data.items[i].checked = true;
                  }
                }
                //获取辅导课程
                for (var i = 0; i < subject.length; i++) {
                  for (var j = 0; j < data[0].course.length; j++) {
                    if (subject[i].text == data[0].course[j]) {
                      subject[i].isSelected = true;
                    }
                  }
                }
                console.log(subject)
                if (data[0].shopId) {
                  for (var i = 0; i < page.data.objectstolength; i++) {
                    if (page.data.objectstores[i].id == data[0].shopId) {
                      for (var j = 0; j < page.data.stolength; j++) {
                        if (page.data.stores[j] == page.data.objectstores[i].shopname) {
                          page.setData({ storeIndex: j })
                        }
                      }
                    }
                  }
                }
                var add = data[0].address.split(',');
                //console.log(add)
                page.setData({
                  oldname: data[0].name,
                  items: page.data.items,
                  defaultProvince: add[0],
                  defaultCity: add[1],
                  headimg: data[0].headImg,
                  introduce: data[0].introduction,
                  idea: data[0].idea,
                  subjects: subject,
                  linkWechat: data[0].linkWechat,
                  linkqq: data[0].linkqq,
                  hobby: data[0].hobby,
                  phone: data[0].phone,
                  education: educa
                })
                if (data[0].images[0]) {
                  for (var i = 0; i < data[0].images.length; i++) {
                    page.data.showPicUrl.push(data[0].images[i].src)
                  }
                  page.setData({ showPicUrl: page.data.showPicUrl })
                }
                if (data[0].certificate[0]) {
                  for (var i = 0; i < data[0].certificate.length; i++) {
                    page.data.honorPicUrl.push(data[0].certificate[i].src)
                  }
                  page.setData({ honorPicUrl: page.data.honorPicUrl })
                }
                page.update()
                //为全局变量扶植
                name = data[0].name;
                sex = data[0].sex == '男' ? 'woman' : 'man';
                address = data[0].address;
                introduce = data[0].introduction;
                eduIdea = data[0].idea;
                hobby = data[0].hobby;
                contactwx = data[0].linkWechat;
                contactqq = data[0].linkqq;
                contactmobile = data[0].phone;
                shopId = data[0].shopId;
              }
            })
          
        })
      
    })

  },
  bindPickerChange: function (e) {//选择城市OR选择门店
    var that = this;
    var tid = wx.getStorageSync('userName');
    console.log('picker发送选择改变，携带值为', e.detail.value)
    switch (e.target.dataset.name) {
      case "provinces":
        that.setData({ defaultProvince: null, defaultCity: null })
        console.log('province: ' + e.detail.value);
        getCityByProvince(tid, e.detail.value, that)

        break;
      case "citys":
        that.setData({ defaultCity: null })
        console.log('citys: ' + e.detail.value);
        that.setData({
          cityIndex: e.detail.value
        });
        break;
      case "stores":
        console.log('stores: ' + e.detail.value);
        that.setData({
          storeIndex: e.detail.value
        });
        shopId = getshopId(that, that.data.objectstores);
        //console.log(shopId)
        break;
    }
  },
  /*changeHeader: function(){
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function(res) {
        console.log(tapIndex)
      },
      fail: function(res) {
        console.log(errMsg)
      }
    })
  },*/
  toEducatiaonExperience: function () {
    fn.na("../../../pages/teacher/educationExperience/educationExperience?education=" + JSON.stringify(this.data.education));
  },
  toShowStyle: function () {
    fn.na("../../../pages/teacher/styleShow/styleShow?showPicUrl=" + JSON.stringify(this.data.showPicUrl));
  },
  toCoachProject: function () {
    fn.na("../../../pages/teacher/coachProject/coachProject?courses=" + JSON.stringify(subject));
  },
  tohonorBook: function () {
    fn.na("../../../pages/teacher/honorBook/honorBook?honorPic=" + JSON.stringify(this.data.honorPicUrl));
  },
  getname: function (e) {
    //console.log(e.detail.value);
    name = e.detail.value;
  },
  getsex: function (e) {
    //console.log(e.detail.value);
    sex = e.detail.value;
  },

  // 这里是换图片
  changeimg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  },
  getIntroduce: function (e) {
    console.log(e.detail.value);
    introduce = e.detail.value;
  },
  getEdu: function (e) {
    eduIdea = e.detail.value;
  },
  gethobby: function (e) {
    hobby = e.detail.value;
  },
  choseclass: function (e) {
    console.log('forbidon')
    /*var inx = e.currentTarget.dataset.num;
    var ids = e.currentTarget.dataset.id;
    var chos = subject[inx].isSelected;
    if(chos){
     subject[inx].isSelected=false;
    }else{
     subject[inx].isSelected = true;
    }
    course =subject[e.currentTarget.dataset.num];
    this.setData({
      subjects: subject
    })*/
  },
  getWechat: function (e) {
    //console.log(e.detail.value);
    contactwx = e.detail.value
  },
  getQQ: function (e) {
    //console.log(e.detail.value);
    contactqq = e.detail.value
  },
  getMobile: function (e) {
    //console.log(e.detail.value);
    contactmobile = e.detail.value
  },
  selectKinds: function (e) {
    this.setData({
      selectIndex: e.currentTarget.dataset.num
    })
  },
  submitAuth: function () {
    var page = this;
    address = page.data.provinces[page.data.provinceIndex] + ',' + page.data.citys[page.data.cityIndex];
    /*if (!!name == false) {
      fn.showTip('请填写姓名'); return;
    }
    if (!!introduce == false) {
      fn.showTip('请填写个人介绍'); return;
    }
    if (!!contactwx == false) {
      fn.showTip('请填写微信'); return;
    }
    if (!!contactqq == false) {
      fn.showTip('请填写QQ'); return;
    }
    if (!!contactmobile == false) {
      fn.showTip('请填写手机号'); return;
    }
    if (!!eduIdea == false) {
      fn.showTip('请填写教学理念'); return;
    }
    if(page.data.showPicUrl.length==0){
      fn.showTip('请填写风采展示'); return;
    }
    if(page.data.honorPicUrl.length==0){
      fn.showTip('请上传荣誉证书');return ;
    }*/
    if (!!shopId == false) {
      fn.showTip('暂无门店'); return;
    }

    if (!wx.getStorageSync('userName')) {
      fn.showTip('请先登录'); return;
    }
    var url = Api.Url.teacher_requestAuth
    var params = {
      teacherId: wx.getStorageSync('userName'),
      name: name,
      sex: sex,
      address: address,
      headImg: page.data.headimg,//若是本地路径代表上传失败
      introduction: introduce,
      idea: eduIdea,
      hobby: hobby,
      //course: course,
      linkWechat: contactwx,
      linkqq: contactqq,
      linkMobile: contactmobile,
      belongsTo: isbelongs,
      //storeName: page.data.stores[storeIndex]
      shopId: shopId
    }
    Api.request(url, params, function (data) {

      wx.showToast({
        icon: "loading",
        title: "申请成功"
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../mine/mine'
        })
        /*fn.re('../../../pages/teacher/teacherFile/teacherFile')*/
      }, 1000)
    })
  }
})

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: 'https://zetongteacher.zetongedu.com/teachr/teacher/uploadHeadImg',
      filePath: path[0],
      name: 'image',
      header: { "content-type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('userName')
      },
      success: function (res) {
        console.log(res);
        console.log(statusCode)
        if (statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败A',
            showCancel: false
          })
          return;
        }
        var data = JSON.parse(data);
        console.log(data.errcode);
        if (data.errcode == 0) {
          page.setData({  //上传成功修改显示服务器头像路径
            headimg: data.imagepath
          })
        } else {
          page.setData({  //上传失败修改显示本地头像路径
            headimg: path[0]
          })
        }
      },
      fail: function (e) {
        console.log('failed');
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败B',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
}
function getshopId(page, objectstores) {
  for (var i = 0; i < objectstores.length; i++) {
    if (objectstores[i].shopname == page.data.stores[page.data.storeIndex]) {
      return objectstores[i].id;
    }
  }
}
function getCityByProvince(tid, provinceId, that) {
  var url = Api.Url.teacher_getCity
  var params={
    teacherId: tid, 
    provinceId: provinceId
  }
  Api.request(url,params,function(data){
    that.setData({
      citys: data.cities,
      cityIndex: 0,
      provinceIndex: provinceId
    });
  })
}