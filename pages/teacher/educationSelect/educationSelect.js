// pages/teacher/educationSelect/educationSelect.js
var school;
var edus;
Page({
  data:{
      diplomaList:["初中以及下","高中","中技","中专","大专","本科","硕士","MBA","博士"],
      curIndex: 0
  },
  onLoad:function(options){
    //console.log('onload school:'+options.school);
    school = options.school;edus = options.edus
  },
  bindSelect: function(e){
    // console.log(e);
    var n = e.target.dataset.num;
    this.setData({
      curIndex: n
    });
    wx.redirectTo({
      url: '../../../pages/teacher/addEducationExperience/addEducationExperience?edu='+this.data.diplomaList[n]+'&school='+school+'&edus='+edus
    })
  }
  
})