// pages/teacher/teacherFile/teacherFile.js
var Api = require('../../../utils/api.js');
var app = getApp(),
  nation = require('../../../utils/publicFn.js');
var arrsd = [
  {
    xiguan: '',
    bodys: [
      {
        have: '4',
        ads: ''
      }
    ]
  }];
//var phonenum='13426856878';
Page({
  data: {
    arrs: arrsd,
    headImg: 'https://zetongteacher.zetongedu.com/static/teacher/Images/apply-header.png',
    name: '',
    city: '',
    average: '90',
    bg_pic:'https://zetongteacher.zetongedu.com/static/teacher/Images/bg9.png',
    imageButtonShow:true,
    certsButtonShow: true

  },
  /* ===点击查看风采大图=== */
  bigImg: function (e) {
    var current = e.target.dataset.src;
    var imageList = [];
    for(var i=0;i<this.data.images.length;i++){
      imageList.push(this.data.images[i].src)
    }
    
    wx.previewImage({
      current: current, //当前显示图片的http链接,可不填
      urls: imageList
    })
  },
  /* ===点击查看证书大图=== */
  bigCert: function (e) {
    var current = e.target.dataset.src;
    var imageList = [];
    for(var i=0;i<this.data.certificate.length;i++){
      imageList.push(this.data.certificate[i].src)
    }

    wx.previewImage({
      current: current, //当前显示图片的http链接,可不填
      urls: imageList
    })
  },
  onLoad: function (options) {
    var tid = wx.getStorageSync('userName');
    console.log('tid=' + tid);
    var page = this;
    var url = Api.Url.teacher_userInfo
    var params={
      teacherId: tid
    }
    Api.request(url,params,function(data){
      arrsd[0].bodys[0].have = data[0].average / 20;
      console.log(data[0])
      page.setData({
        headImg: data[0].headImg,
        name: data[0].name,
        average: data[0].average,
        linkWechat: data[0].linkWechat,
        linkqq: data[0].linkqq,
        phone: data[0].phone,
        education: data[0].education,
        introduction: data[0].introduction,
        idea: data[0].idea,
        images: data[0].images,
        certificate: data[0].certificate,
        hobby: data[0].hobby,
        course: data[0].course,
        bg_pic: data[0].BgImg

      })
    })

    var alllen = arrsd.length;
    for (var i = 0; i < alllen; i++) {
      var midlen = arrsd[i].bodys.length;
      for (var j = 0; j < midlen; j++) {
        var k = arrsd[i].bodys[j].have;
        var tems = [];
        for (var n = 0; n < 5; n++) {
          if (k - 1 >= n) {
            tems.push({ 'src': "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/3.png" });
          } else {
            tems.push({ 'src': "http://dantong.oss-cn-shenzhen.aliyuncs.com/teacher/4.png" });
          }
        }
        console.log('tems: ' + tems)
        arrsd[i].bodys[j].ads = tems;

      }
    }

    this.setData({
      arrs: arrsd
    })
  },
  showimage: function(){
    console.log('len = '+this.data.images.length)
    var obj = this.data.images;
    for(var i=0;i<this.data.images.length;i++){
      obj[i].show = true;
    }
    this.setData({images: obj,imageButtonShow:false})
  },
  showcerts: function(){
    console.log('len = '+this.data.certificate.length)
    var obj = this.data.certificate;
    for(var i=0;i<this.data.certificate.length;i++){
      obj[i].show = true;
    }
    this.setData({certificate: obj,certsButtonShow:false})
  },
  callphone: function () {
    nation.call(this.data.phone);
  },
  changePic: function () {
    var that = this;
    wx.showModal({
      title: '',
      content: '更换相册封面',
      showCancel: true,
      success: function (res) {
        if (confirm) {
          console.log('用户点击确定')
          // 这里是换图片
          
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = tempFilePaths;
              //console.log(tempFilePaths);
              upload(that,tempFilePaths);
            }
          })

        }
      }
    })
  }
})

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: 'https://zetongteacher.zetongedu.com/teachr/teacher/uploadBgImg',
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
            bg_pic: data.imagepath
          })
        } else {
          page.setData({  //上传失败修改显示本地头像路径
            bg_pic: path[0]
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